const { db } = require("../config/firebase.js");

module.exports = async function deleteFavourite(req, res, next) {
  try {
    const { id } = req.params; //favDocumentID
    await db.collection("favourites").doc(id).delete();
    res
      .status(200)
      .send("The product has been removed for your favourites section");
  } catch (err) {
    next(err);
  }
};
