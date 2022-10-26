
const { db } = require("../config/firebase.js");

module.exports = async function createNewProduct(product, uid) {
  return await db.collection("productos").doc(uid).set(product);
};


