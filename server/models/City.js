const db = require("../db/connect.js");

class City {
  constructor({ city_id, country_id, name, population }) {
    this.city_id = city_id;
    this.country_id = country_id;
    this.name = name;
    this.population = population;
  }

  static async getAllCities() {
    const response = await db.query("SELECT * FROM other_cities");
    if (response.rows.length === 0) {
      throw new Error("No cities available");
    }
    return response.rows.map((c) => new City(c));
  }

  static async getOneByCityName(cityName) {
    const response = await db.query(
      "SELECT * FROM other_cities WHERE LOWER(name) = $1;",
      [cityName]
    );
    console.log(response);
    if (response.rows.length === 0) {
      throw new Error("Unable to locate city");
    }

    return new City(response.rows[0]);
  }

  static async createCity(data) {
    const { name, country_id, population } = data;
    const response = await db.query(
      "INSERT INTO other_cities(name, country_id, population) VALUES($1, $2, $3) RETURNING name",
      [name, country_id, population]
    );

    if (response.rows.length === 0) {
      throw new Error("Unable to add city");
    }
    const newCity = await City.getOneByCityName(response.rows[0].name);
    return new City(newCity);
  }

  async deleteCity() {
    const response = await db.query(
      "DELETE FROM other_cities WHERE LOWER(name) = $1 RETURNING name;",
      [this.name.toLowerCase()]
    );

    return new City(response.rows[0]);
  }

  async updateCity(data, originalName) {
    const update = data;
    const {
      name = this.name,
      population = this.population,
      country_id = this.country_id,
    } = update;

    const response = await db.query(
      "UPDATE other_cities SET name = $1, country_id = $2, population= $3 WHERE LOWER(name) = $4 RETURNING *",
      [name, country_id, population, originalName]
    );
    return new City(response);
  }
}

module.exports = City;
