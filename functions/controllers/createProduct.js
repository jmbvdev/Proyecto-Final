const { db } = require("../config/firebase.js");

module.exports = async function createProduct(product) {
  return await db.collection("products").add(product);
};
