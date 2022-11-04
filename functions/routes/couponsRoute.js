const { Router } = require("express");
const getCoupon = require("../couponsControllers/getCoupon.js");
const createCoupon = require("../couponsControllers/createCoupon.js");
const deleteCoupon = require("../couponsControllers/deleteCoupon.js");
const couponsRoute = Router();

couponsRoute
  .get("/:name", getCoupon)
  .post("/:name", createCoupon)
  .delete("/:name", deleteCoupon);

module.exports = couponsRoute;
