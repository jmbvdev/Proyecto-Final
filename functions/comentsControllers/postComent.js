const { db } = require("../config/firebase.js");

module.exports = async function postComent(req, res, next) {
  try {
    const { star, comentspositive, plantsUID, userUID, userName, userImg } =
      req.body;

    const comentRef = await db.collection("coments").add({
      star: star,
      comentspositive: comentspositive,
      plantsUID: plantsUID,
      userUID: userUID,
      userName: userName,
      userImg: userImg,
    });
    const comentarios = await comentRef.get();
    res
      .status(200)
      .send({ comentid: comentarios.id, data: comentarios.data() });
  } catch (err) {
    next(err);
  }
};
