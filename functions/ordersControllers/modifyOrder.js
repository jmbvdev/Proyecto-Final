const { db, admin } = require("../config/firebase.js");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  auth: {
    user: "apikey",
    pass: "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",
  },
});

module.exports = async function postOrder(orderid, cart, state, extras, email) {
  const order = {
    state: state,
    date: admin.firestore.FieldValue.serverTimestamp(),
    cart: cart,
  };

  if (state === "Order approved" || state === "Order pending") {
    let array = cart.map((p) => {
      return {
        id: p.id,
        count: p.count,
      };
    });
    let promises = array.map((prod) => {
      return db
        .collection("products")
        .doc(prod.id)
        .update({
          stock: admin.firestore.FieldValue.increment(-prod.count),
        });
    });
    await Promise.all(promises);

    const mailOptions = {
      from: "Calathea Markets <tom_cremoso@hotmail.com>",
      to: email,
      subject: "Thank you so much",
      html: `<p style="font-size: 16px;">Your order at Calathea Market was aprobed</p>
                <br />
                <img src=${cart[0].image} />
            `,
    };

    await transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        console.log(erro);
      }
    });
  }

  const reference = db.collection("orders").doc(orderid);
  await reference.update(order);
  return await reference.get();
};
