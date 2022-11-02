const { db } = require("../config/firebase.js");

module.exports = async function postComent(req, res, next) {
  try {
    const { coment } = req.body;
    const comentRef = await db.collection("coments").add(coment);
    res.status(200).send({ id: comentRef.id, data: comentRef.data() });
  } catch (err) {
    next(err);
  }
};
