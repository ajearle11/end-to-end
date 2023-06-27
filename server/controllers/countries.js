const Country = require("../models/Country");

const index = async (req, res) => {
  try {
    const countries = await Country.getAllCountries();
    res.status(200).send(countries);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const show = async (req, res) => {
  try {
    const countryName = req.params.name.toLowerCase();
    const country = await Country.getOneByCountryName(countryName);
    res.status(200).send(country);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const newCountry = await Country.createCountry(data);
    console.log(newCountry);
    res.status(201).send(newCountry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    let countryToDelete = req.params.name.toLowerCase();
    const country = await Country.getOneByCountryName(countryToDelete);
    const deleteCountry = await country.deleteCountry();
    res.status(204).end();
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    let countryName = req.params.name.toLowerCase();
    let updatedMaterial = req.body;
    const country = await Country.getOneByCountryName(countryName);
    const updatedCountry = await country.updateCountry(
      updatedMaterial,
      countryName
    );
    res.status(202).send(updatedCountry);
  } catch (err) {
    res.status(500).send({ error: "server error" });
  }
};

module.exports = { index, show, create, destroy, update };
