const { db } = require("../config/firebase.js");

module.exports = async function addFavourite(req, res, next) {
  try {
    const { id } = req.params;
    const { userID } = req.body;
    await db
      .collection("favourites")
      .doc(id)
      .set({ [userID]: userID }, { merge: true });
    res.status(200).send("The product has been added");
  } catch (err) {
    next(err);
  }
};
