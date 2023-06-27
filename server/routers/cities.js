const { Router } = require("express");
const cityController = require("../controllers/cities");

const cityRouter = Router();

cityRouter.get("/", cityController.index);
cityRouter.get("/:name", cityController.show);
cityRouter.post("/", cityController.create);
cityRouter.delete("/:name", cityController.destroy);
cityRouter.patch("/:name", cityController.update);

module.exports = cityRouter;
