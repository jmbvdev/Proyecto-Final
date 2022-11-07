const { db } = require("../config/firebase.js");

module.exports = async function getOrdersAll() {
  const array = await db
    .collection("orders")
    .get();

  const orders = []
  array.forEach((doc)=>{
    orders.push({
      orderId: doc.id,
      state: doc.data().state,
      date: (new Date(doc.data().date?._seconds*1000 + doc.data().date?._nanoseconds/1000000)),   
      cart: doc.data().cart,
      userID: doc.data().userID,
    })
  })

  return orders
};






