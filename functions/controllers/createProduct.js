const { db } = require("../config/firebase.js");

module.exports = async function createNewProduct(product, uid) {
  const reference = await db.collection("products").doc(uid).set(product);
  const Product = await reference.get();
  return {
    id: Product.id,
    data: Product.data(),
  };
};
