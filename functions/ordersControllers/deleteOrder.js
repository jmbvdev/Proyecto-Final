const { db } = require("../config/firebase.js");

module.exports = async function deleteOrer(orderID) {
  const array = await db.collection("orders").doc(orderID).delete();
};
