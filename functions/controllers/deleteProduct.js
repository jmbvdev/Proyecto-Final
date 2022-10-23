const { db } = require("../config/firebase.js");

module.exports = async function deleteProduct(id) {
  await db.collection("products").doc(id).delete();
  return;
};
