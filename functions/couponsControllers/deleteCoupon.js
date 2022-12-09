const { db } = require("../config/firebase.js");

module.exports = async function deleteCoupon(req, res, next) {
    const {name} = req.params;
    await db.collection("coupons").doc(name).delete();
    return;
};
