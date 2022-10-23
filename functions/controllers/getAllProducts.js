const { db } = require("../config/firebase.js");

module.exports = async function getAllProducts() {
  const productsSnapshot = await db.collection("products").get();
  const products = [];
  productsSnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return products;
};
