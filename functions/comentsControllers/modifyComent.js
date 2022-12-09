const { db } = require("../config/firebase.js");

module.exports = async function modifyComent(req, res, next) {
  try {
    const {star,comentspositive } = req.body;
    const { id } = req.params;
    const ref = await db.collection("coments").doc(id);
    const aux = await ref.update({star,comentspositive})
    //const comentres = db.collection("coments").doc(id).get();
    //res.status(200).send({ comentid: id, data: comentres.data() });

    res.status(200).send(aux.id);
  } catch (err) {
    next(err);
  }
};
