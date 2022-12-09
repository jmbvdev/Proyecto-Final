const { db, admin } = require("../config/firebase.js");

module.exports = async function deleteFavourite(req, res, next) {
  try {
    const { id, user } = req.params;
    console.log(id, user);
    let ref = db.collection("favourites").doc(id);
    await ref.update({
      [user]: admin.firestore.FieldValue.delete(),
    });
    res
      .status(200)
      .send("The product has been removed for your favourites section");
  } catch (err) {
    next(err);
  }
};
