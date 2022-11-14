const { Router } = require("express");

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
    const ord = reference.get();
    return res.status(200).send(ord);
  } catch (err) {
    next(err);
  }
});

module.exports = extrasOrdersRoute;
