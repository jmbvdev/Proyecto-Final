const { Router } = require("express");
const {COINBASE_API_KEY, COINBASE_WEBHOOK_SECRET} = require('../config/coinbase.js');
const {Client, resources, Webhook} = require('coinbase-commerce-node');


const coinbaseRoute = Router();
Client.init(COINBASE_API_KEY);
const {Charge} = resources
const randomPaymentId = Math.random()*1000;

coinbaseRoute
  .get("/create-charge/:amount", async (req, res, next) => {
    console.log(req.params)
    try{
        const chargeData = {
            name: 'Calathea Market Order',
            description: 'Various products',
            local_price: {
                amount: req.params["amount"],
                currency: 'USD'
            },
            pricing_type: 'fixed_price',
            redirect_url: `https://api-plants-b6153.web.app/success?status=approved&payment_id=${randomPaymentId}&payment_type=coinbase`,
            cancel_url: "https://api-plants-b6153.web.app/failure"
        }
        const charge = await Charge.create(chargeData);
        res.status(200).send(charge);
    }catch(err) {
        next(err)
    }
})
 .post("/payment-handler", (req, res, next) => {
     const rawBody = req.rawBody;
     const signature = req.headers['x-cc-webhook-signature'];
     const webHookSecret = COINBASE_WEBHOOK_SECRET;

     try {
         let event = Webhook.verifyEventBody(rawBody, signature, webHookSecret)
         if(event.type === 'charge:pending') console.log('Charge pending')
         if(event.type === 'charge:confirmed') console.log('Charge confirmed')
         if(event.type === 'charge:failed') console.log('Charge failed')

         return res.status(200).send(event.id);
     }catch(err) {
         next(err)
     }
 })
  

module.exports = coinbaseRoute;