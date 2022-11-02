const { Router } = require("express");
const getComentsForProduct = require("../comentsControllers/getComentsForProduct.js");

const comentsRoute = Router();

comentsRoute
  .get("/:id", getComentsForProduct)
  .post("/coment", postComent)
  .put("/:id", modifyComent)
  .delete("/:id", deleteComent);

module.exports = comentsRoute;
