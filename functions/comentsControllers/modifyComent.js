const { db } = require("../config/firebase.js");

module.exports = async function modifyComent(req, res, next) {
  try {
    const { coment } = req.body;
    const { id } = req.params;
    await db.collection("coments").doc(id).update(coment);
    const comentres = db.collection("coments").doc(id).get();
    res.status(200).send({ comentid: id, data: comentres.data() });
  } catch (err) {
    next(err);
  }
};
