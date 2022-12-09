const { db } = require("../config/firebase.js");

module.exports = async function deleteComent(req, res, next) {
  try {
    const { id } = req.params;
    await db.collection("coments").doc(id).delete();
    res.status(203).send(`The comment with id: ${id} has been delete`);
  } catch (err) {
    next(err);
  }
};
