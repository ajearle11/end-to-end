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
}

module.exports = City;
