const { Router } = require("express");
const countryController = require("../controllers/countries");

const countryRouter = Router();

countryRouter.get("/", countryController.index);
countryRouter.get("/:name", countryController.show);
countryRouter.post("/", countryController.create);
countryRouter.delete("/:name", countryController.destroy);
countryRouter.patch("/:name", countryController.update);

module.exports = countryRouter;
