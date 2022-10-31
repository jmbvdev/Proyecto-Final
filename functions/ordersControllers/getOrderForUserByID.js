const { db } = require("../config/firebase.js");

module.exports = async function getOrderForUserByID(userID) {
  const ordersSnapshot = await db
    .collection("orders")
    .where("userID", "==", userID)
    .get();

  const orders = [];
  ordersSnapshot.forEach((order) => {
    orders.push({
      orderid: order.id,
      data: order.data(),
    });
  });

  return orders;
};
