const { Router } = require("express");
const productsRoute = require("./productsRoute");
const usersRoute = require("./usersRoute.js");
const ordersRoute = require("./ordersRoute.js");

const router = Router();

router.use("/products", productsRoute);
router.use("/users", usersRoute);
router.use("/orders", ordersRoute);

module.exports = router;
