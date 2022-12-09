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
  console.log(state)
  const order = {
    state: state,
    date: admin.firestore.FieldValue.serverTimestamp(),
    cart: cart,
  };

  if (state === "Order approved" || state === "Order in_proccess") {
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
      html: `<p style="font-size: 25px;">Your order at Calathea Market was ${state}</p>
                <br />
                <img style="weight: 400px; height: 300px;" src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2021_08/1679356/indoor-plant-jc-210224.jpg" alt="" />
                <p style="font-size: 20px;">Your order id is ${orderid}</p>
                <p style="font-size: 16px;">We are preparing your package, in the next 24 hours it would be ok to send or retire.</p>
                <br />
                <br />
                <p style="font-size: 16px;">Please, feel free to let a feedback about the products you get, so other people can know more about us.</p>
                <br />
                <br />
                <p style="font-size: 16px;">Lots of love, Calathea Team.</p>
                
            `,
    };

    await transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        console.log(erro);
      }
    });
  }


  if (state === "Order preparing" || state === "Order shipped" || state === "Order ready to pick up") {
    
    const mailOptions = {
      from: "Calathea Markets <tom_cremoso@hotmail.com>",
      to: email,
      subject: "Thank you so much",
      html: `<p style="font-size: 25px;">Your order at Calathea Market was ${state}</p>
                <br />
                <img style="weight: 400px; height: 300px;" src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2021_08/1679356/indoor-plant-jc-210224.jpg" alt="" />
                <p style="font-size: 20px;">Your order id is ${orderid}</p>
                <p style="font-size: 16px;">For more information contact us!</p>
                <br />
                <p style="font-size: 16px;">Please, let's us know your experience about our product you get, so other people can know more about us.</p>
                <br />
                <p style="font-size: 16px;">Lots of love, Calathea Team.</p>
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
