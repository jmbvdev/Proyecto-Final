const { db, admin } = require("../config/firebase.js");

//admin.database.ServerValue.TIMESTAMP

module.exports = async function postOrder(id, cart) {
  const order = {
    state: "Pending",
    userID: id,
    date: admin.firestore.FieldValue.serverTimestamp(),
    cart: cart,
  };

  const reference = await db.collection("orders").add(order);

  return await reference.get();
};
