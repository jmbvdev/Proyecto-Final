const { db } = require("../config/firebase.js");

module.exports = async function getCoupon(req, res, next) {
  try {
    const { name } = req.params;
    const coupon = await db.collection("coupons").doc(name).get();
    res.status(200).send(coupon.data());
  } catch (err) {
    next(err);
  }
};
