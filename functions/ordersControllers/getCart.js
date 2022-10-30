const { db } = require("../config/firebase.js");

module.exports = async function getCart(userID) {
  const array = await db
    .collection("orders")
    .where("userID", "==", userID)
    .where("state", "==", "Pending")
    .get();

  let cart = {};
  array.forEach((doc) => {
    (cart.orderid = doc.id), (cart.data = doc.data().cart);
  });
  return cart;
};
