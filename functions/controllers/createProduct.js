const { db } = require("../config/firebase.js");

module.exports = async function createNewProduct(product, uid) {
  return await db.collection("products").doc(uid).set(product);
};
