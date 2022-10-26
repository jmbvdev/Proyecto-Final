const { db } = require("../config/firebase.js");

module.exports = async function getAllProductsByType(type) {
  const productsSnapshot = await db.collection("products").where(type).get();
  const products = [];
  productsSnapshot.forEach((doc) => {
    products.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return products;
};
