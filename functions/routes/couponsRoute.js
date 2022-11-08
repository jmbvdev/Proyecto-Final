const { Router } = require("express");
const getCoupon = require("../couponsControllers/getCoupon.js");
const createCoupon = require("../couponsControllers/createCoupon.js");
const deleteCoupon = require("../couponsControllers/deleteCoupon.js");
const getAllCoupons = require("../couponsControllers/getAllCoupons.js");
const couponsRoute = Router();

couponsRoute
  .get("/all", getAllCoupons)
  .get("/:name", getCoupon)
  .post("/create", createCoupon)
  .delete("/:name", deleteCoupon);

module.exports = couponsRoute;
