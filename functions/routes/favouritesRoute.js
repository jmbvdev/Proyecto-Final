const { Router } = require("express");
const getFavouritesForUser = require("../favouritesControllers/getFavouritesForUser");
const deleteFavourite = require("../favouritesControllers/deleteFavourite.js");
const addFavourite = require("../favouritesControllers/addFavourite.js");

const favouritesRoute = Router();

favouritesRoute
  .get("/:id", getFavouritesForUser)
  .delete("/:id", deleteFavourite)
  .post("/:id", addFavourite);

module.exports = favouritesRoute;
