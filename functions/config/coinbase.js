const { config } = require("dotenv");

config();

const COINBASE_API_KEY = "9e2be15f-933c-444a-9957-ecec646113b3";
const COINBASE_WEBHOOK_SECRET = "ad968b70-e411-458a-9d67-b5406236e21c";
const DOMAIN = "https://api-plants-b6153/us-central1/app/coinbase";

module.exports = {
  COINBASE_API_KEY,
  COINBASE_WEBHOOK_SECRET,
  DOMAIN,
};
