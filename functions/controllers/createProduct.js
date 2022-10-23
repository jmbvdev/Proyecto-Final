const { db } = require("../config/firebase.js");

module.exports = async function createProduct(
  categories,
  details,
  image,
  name,
  price,
  size,
  stock,
  type
) {
  const product = {
    categories,
    details,
    image,
    name,
    price,
    size,
    stock,
    type,
  };
  return await db.collection("products").add(product);
};
