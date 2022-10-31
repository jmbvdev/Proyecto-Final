const { db } = require("../config/firebase.js");

module.exports = async function getComentsForProduct(req, res, next) {
  try {
    const { id } = req.params;
    const coments = await db
      .collection("coments")
      .where("productID", "==", `${id}`)
      .get();
    let arrayofcoments = [];
    coments.forEach((c) => {
      arrayofcoments.push({ comentid: c.id, data: c.data() });
    });
    res.status(200).send(arrayofcoments);
  } catch (err) {
    next(err);
  }
};
