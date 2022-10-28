const { db } = require("../config/firebase.js");

module.exports = async function postOrder(orderid, cart, state) {
  const order = {
    state: state,
    date: "miercoles",
    cart: cart,
  };

  await db.collection("orders").doc(orderid).set(order, { merge: true });
  return;
};
