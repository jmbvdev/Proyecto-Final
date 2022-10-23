const { db } = require("../config/firebase.js");

module.exports = async function updateProduct(id, data) {
  const productRef = await db
    .collection("products")
    .doc(id)
    .set(data, { merge: true });
  return productRef;
};
