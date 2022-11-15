const {config} = require("dotenv");

config();

const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;
const DOMAIN = "https://api-plants-b6153/us-central1/app/coinbase";

module.exports = {
    COINBASE_API_KEY,
    COINBASE_WEBHOOK_SECRET,
    DOMAIN
};
