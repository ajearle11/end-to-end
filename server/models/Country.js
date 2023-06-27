const db = require("../db/connect.js");

class Country {
  constructor({
    name,
    country_id,
    capital,
    population,
    languages,
    fun_fact,
    map_image_url,
  }) {
    this.name = name;
    this.country_id = country_id;
    this.capital = capital;
    this.population = population;
    this.languages = languages;
    this.fun_fact = fun_fact;
    this.map_image_url = map_image_url;
  }

  static async getAllCountries() {
    const response = await db.query("SELECT * FROM country;");
    if (response.rows.length === 0) {
      throw new Error("No countries available");
    }
    return response.rows.map((c) => new Country(c));
  }

  static async getOneByCountryName(countryName) {
    const response = await db.query(
      "SELECT * FROM country WHERE LOWER(name) = $1;",
      [countryName]
    );
    if (response.rows.length === 0) {
      throw new Error("Unable to locate country");
    }

    return new Country(response.rows[0]);
  }

  static async createCountry(data) {
    const { name, capital, population, languages } = data;
    const response = await db.query(
      "INSERT INTO country(name, capital, population, languages) VALUES($1, $2, $3, $4) RETURNING name",
      [name, capital, population, languages]
    );

    if (response.rows.length === 0) {
      throw new Error("Unable to add country");
    }
    console.log(response.rows[0].name);
    const newCountry = await Country.getOneByCountryName(response.rows[0].name);
    return new Country(newCountry);
  }

  async deleteCountry() {
    const response = await db.query(
      "DELETE FROM country WHERE LOWER(name) = $1 RETURNING name;",
      [this.name.toLowerCase()]
    );

    return new Country(response.rows[0]);
  }

  async updateCountry(data, originalName) {
    const update = data;
    const {
      name = this.name,
      capital = this.capital,
      population = this.population,
      languages = this.languages,
      fun_fact = this.fun_fact,
      map_image_url = this.map_image_url,
    } = update;

    console.log(
      name,
      capital,
      population,
      languages,
      fun_fact,
      map_image_url,
      originalName
    );

    const response = await db.query(
      "UPDATE country SET name = $1, capital = $2, population= $3, languages=$4, fun_fact=$5, map_image_url=$6 WHERE LOWER(name) = $7 RETURNING *",
      [
        name,
        capital,
        population,
        languages,
        fun_fact,
        map_image_url,
        originalName,
      ]
    );
    console.log(response);
    return new Country(response);
  }
}

module.exports = Country;
