const express = require("express");
const cors = require("cors");
const countryRouter = require("./routers/countries");
const cityRouter = require("./routers/cities");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/countries", countryRouter);
app.use("/cities", cityRouter);

module.exports = app;
