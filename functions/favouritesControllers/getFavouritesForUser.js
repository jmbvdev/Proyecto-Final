const { db } = require("../config/firebase.js");

module.exports = async function getFavouritesForUser(req, res, next) {
  try {
    const { id } = req.params; //userID
    const favouritesSnapshot = await db
      .collection("favourites")
      .where(id, "==", id)
      .get();
    const favs = [];
    favouritesSnapshot.forEach((f) => {
      favs.push({ id: f.id, data: f.data() });
    });
    res.status(200).send(favs);
  } catch (err) {
    next(err);
  }
};
