require("dotenv").config();
const fs = require("fs");
const db = require("./connect");

const sql = fs.readFileSync("./server/db/countries.sql").toString();

db.query(sql)
  .then((data) => console.log("setup complete"))
  .catch((error) => console.log(error));
