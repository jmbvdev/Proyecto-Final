const { db } = require("../config/firebase.js");

module.exports = async function getProductById(id) {
  const product = await db.collection("products").doc(id).get();
  return {
    id: product.id,
    data: product.data(),
  };
};
