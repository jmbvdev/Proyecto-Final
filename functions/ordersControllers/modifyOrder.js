const { db, admin } = require("../config/firebase.js");

module.exports = async function postOrder(orderid, cart, state, extras) {
  const order = {
    state: state,
    date: admin.firestore.FieldValue.serverTimestamp(),
    cart: cart,
  };

  if (state === "Order approved" || state === "Order pending") {
    let array = cart.map((p) => {
      return {
        id: p.id,
        count: p.count,
      };
    });
    let promises = array.map((prod) => {
      return db
        .collection("products")
        .doc(prod.id)
        .update({
          stock: admin.firestore.FieldValue.increment(-1 * prod.count),
        });
    });
    await Promise.all(promises);
  }

  const reference = db.collection("orders").doc(orderid);
  await reference.update(order);
  return await reference.get();
};
