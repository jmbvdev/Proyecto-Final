const { db } = require("../config/firebase.js");

module.exports = async function createCoupon(req, res, next) {
    try {
        const { name, count, discount } = req.body;
        const ref = db.collection("coupons").doc(name);
        await ref.set(req.body);
        const newCoupon = await ref.get();
        res.status(200).send(newCoupon.data());
        return newCoupon;
    } catch(err) {
        next(err)
    }
};
