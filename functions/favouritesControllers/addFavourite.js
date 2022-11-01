const { db } = require("../config/firebase.js");

module.exports = async function addFavourite(req, res, next) {
  try {
    const { id } = req.params; //favID
    const { userID } = req.body; //productID
    await db.collection("favourites").add({ userID: userID, favID: id });
    res.status(200).send("The product has been added");
  } catch (err) {
    next(err);
  }
};
