const { db } = require("../config/firebase.js");

module.exports = async function postOrder(id, cart) {
  const order = {
    state: "Pending",
    userID: id,
    date: "miercoles",
    cart: cart,
  };

  await db.collection("orders").add(order);
  return;
};
