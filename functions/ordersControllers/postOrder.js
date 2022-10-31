const { db, admin } = require("../config/firebase.js");

//admin.database.ServerValue.TIMESTAMP

module.exports = async function postOrder(id, cart) {
  const order = {
    state: "Pending",
    userID: id,
    date: admin.firestore.FieldValue.serverTimestamp(),
    cart: cart,
  };
  const previosOrder = await db
    .collection("orders")
    .where("userID", "==", id)
    .where("state", "==", "Pending")
    .get();
  let reference;
  let array = [];
  previosOrder.forEach((doc) => array.push(doc.id));
  console.log(array);
  if (array.length > 0)
    await db.collection("orders").doc(array[0]).update(order);
  else reference = await db.collection("orders").add(order);

  return await db
    .collection("orders")
    .doc(reference?.id || array[0])
    .get();
};
