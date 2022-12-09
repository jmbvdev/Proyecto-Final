const { db } = require("../config/firebase.js");

module.exports = async function updateProduct(id, data) {
  await db.collection("products").doc(id).set(data, { merge: true });
  const Product = await db.collection("products").doc(id).get();
  return {
    id: Product.id,
    data: Product.data(),
  };
};
