const { db, admin } = require("../config/firebase.js");

module.exports = async function postOrder(orderid, cart, state) {
  const order = {
    state: state,
    date: admin.firestore.FieldValue.serverTimestamp(),
    cart: cart,
  };

  const reference = await db.collection("orders").doc(orderid).update(order);
  return await reference.get();
};
