const { Router } = require("express");
const getOrderForUserByID = require("../ordersControllers/getOrderForUserByID.js");
const getCart = require("../ordersControllers/getCart.js");
const modifyOrder = require("../ordersControllers/modifyOrder.js");
const postOrder = require("../ordersControllers/postOrder.js");
const deleteOrder = require("../ordersControllers/deleteOrder.js");
const pagarProducto = require("../ordersControllers/mp.js");
const ordersRoute = Router();

ordersRoute
  .post("/purchase", pagarProducto)
  .get("/cart/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      let cart = await getCart(id);
      return res.status(200).send(cart);
    } catch (err) {
      return next(err);
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      let orders = await getOrderForUserByID(id);
      return res.status(200).send(orders);
    } catch (err) {
      next(err);
    }
  })
  .post("/:id", async (req, res, next) => {
    //ruta a la que le pega cada vez que inicia secion por primera vez, o si no tiene nada guardado como cart y empieza a guardar cosas.
    try {
      const { id } = req.params;
      const { cart } = req.body;
      const order = await postOrder(id, cart);
      res.status(203).send({ orderid: order.id });
    } catch (err) {
      next(err);
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      //este id no es del usuario sino de la orden
      const { id } = req.params;
      const { cart, state, extras, email } = req.body;
      const reference = await modifyOrder(id, cart, state, extras, email);
      res.status(203).send(`The ${reference.id} has been modified`);
    } catch (err) {
      next(err);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      //este id no es del usuario sino de la orden
      const { id } = req.params;
      await deleteOrder(id);
      res.status(203).send(`The ${id} order has been deleted`);
    } catch (err) {
      next(err);
    }
  });

module.exports = ordersRoute;
