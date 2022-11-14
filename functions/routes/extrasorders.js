const { Router } = require("express");
const { db } = require("../config/firebase.js");

const extrasOrdersRoute = Router();

extrasOrdersRoute.put("/:id", async (req, res, next) => {
  const { extras } = req.body;
  const { id } = req.params;
  try {
    const order = {
      extras: extras,
    };

    const reference = db.collection("orders").doc(id);
    await reference.update(order);
    return res.status(203).send("Order extras added");
  } catch (err) {
    next(err);
  }
});

module.exports = extrasOrdersRoute;
