const City = require("../models/City");

const index = async (req, res) => {
  try {
    const countries = await City.getAllCities();
    res.status(200).send(countries);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const show = async (req, res) => {
  try {
    const cityName = req.params.name.toLowerCase();
    const city = await City.getOneByCityName(cityName);
    res.status(200).send(city);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const newCity = await City.createCity(data);
    res.status(201).send(newCity);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    let cityToDelete = req.params.name.toLowerCase();
    const city = await City.getOneByCityName(cityToDelete);
    const deleteCity = await city.deleteCity();
    res.status(204).end();
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    let cityName = req.params.name.toLowerCase();
    let updatedMaterial = req.body;
    const city = await City.getOneByCityName(cityName);
    const updatedCity = await city.updateCity(updatedMaterial, cityName);
    res.status(202).send(updatedCity);
  } catch (err) {
    res.status(500).send({ error: "server error" });
  }
};

module.exports = { index, show, create, destroy, update };
