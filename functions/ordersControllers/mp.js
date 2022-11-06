const { mercadopago } = require("../config/mercadopago.js");

module.exports = async (req, res, next) => {
  try {
    const { cart, totalAmount } = req.body;
    let items = cart.map((product) => {
      return {
        picture_url: product.image,
        title: product.name,
        unit_price: parseInt(product.price),
        quantity: parseInt(product.count),
        description: product.id,
      };
    });
    let preference = {
      transaction_amount: parseInt(totalAmount),
      items: items,
      back_urls: {
        success: "http://localhost:3000/success", //dsps cambiar por la que va
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
    };

    mercadopago.preferences.create(preference).then((response) => {
      res.status(203).send({ global: response.body.id });
    });
  } catch (err) {
    next(err);
  }
};
