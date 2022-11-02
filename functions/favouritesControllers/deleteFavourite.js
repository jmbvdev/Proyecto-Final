const { db, admin } = require("../config/firebase.js");

module.exports = async function deleteFavourite(req, res, next) {
  try {
    const { id } = req.params;
    const { userID } = req.body;
    let ref = db.collection("favourites").doc(id);
    await ref.update({
      [userID]: admin.firestore.FieldValue.delete(),
    });
    res
      .status(200)
      .send("The product has been removed for your favourites section");
  } catch (err) {
    next(err);
  }
};
