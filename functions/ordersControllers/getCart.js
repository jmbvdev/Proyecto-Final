const { db } = require("../config/firebase.js");

module.exports = async function getCart(userID) {
  const cart = await db
    .collection("orders")
    .where("userID", "==", userID)
    .where("state", "==", "Pending")
    .get();

  return {
    id: cart.id,
    data: cart.data(),
  };
};
