const { db } = require("../config/firebase.js");

module.exports = async function createNewProduct(product, uid) {
  await db.collection("products").doc(uid).set(product);
  const Product = await db.collection("products").doc(uid).get();
  return {
    id: Product.id,
    data: Product.data(),
  };
};