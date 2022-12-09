const { db } = require("../config/firebase.js");

module.exports = async function createNewProduct(product, uid) {
  const reference = db.collection("products").doc(uid);
  await reference.set(product);
  const Product = await reference.get();
  return {
    id: Product.id,
    data: Product.data(),
  };
};
