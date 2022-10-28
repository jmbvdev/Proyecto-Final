const { Router } = require("express");
const getOrderForUserByID = require("../ordersControllers/getOrderForUserByID.js");
const getCart = require("../ordersControllers/getCart.js");
const modifyOrder = require("../ordersControllers/modifyOrder.js");

const ordersRoute = Router();

ordersRoute
  .get("/orders/cart/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      let cart = await getCart(id);
      return res.status(200).send(cart);
    } catch (err) {
      return next(err);
    }
  })
  .get("/orders/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      let orders = await getOrderForUserByID(id);
      return res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  })
  .post("/orders/:id", async (req, res, next) => {
    //ruta a la que le pega cada vez que inicia secion por primera vez, o si no tiene nada guardado como cart y empieza a guardar cosas.
    try {
      const { id } = req.params;
      const { cart } = req.body;
      await postOrder(id, cart);
      res.status(203).send("Order Accepted");
    } catch (err) {
      next(err);
    }
  })
  .put("/orders/:id", async (req, res, next) => {
    try {
      //este id no es del usuario sino de la orden
      const { id } = req.params;
      const { cart, state } = req.body;
      await modifyOrder(id, cart, state);
    } catch (err) {
      next(err);
    }
  });

module.exports = ordersRoute;
