const { db } = require("../config/firebase.js");

module.exports = async function getAllCoupons(req, res, next) {
    try {
        const couponsRef = await db.collection("coupons").get();
        const coupons = [];
        couponsRef.forEach((doc) => {
          coupons.push({
            data: doc.data(),
          });
        });      
        res.status(200).send(coupons);
      } catch (err) {
        next(err);
      }
};