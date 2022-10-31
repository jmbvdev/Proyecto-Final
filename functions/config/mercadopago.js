const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-5706551307813693-103100-262b2217ab8a1f405b6952d45c9df157-209498569",
});

module.exports = {
  mercadopago,
};
