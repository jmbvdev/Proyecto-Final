const { Router } = require("express");
const productsRoute = require("./productsRoute");
const usersRoute = require("./usersRoute.js");

const router = Router();

router.use("/products", productsRoute);
router.use("/users", usersRoute);

module.exports = router;
