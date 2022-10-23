const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({ origin: true });
const { db } = require("./config/firebase.js");
const routes = require("./routes/index.js");
const app = express();
app.use(cors);

app.use("/", routes);

exports.app = functions.https.onRequest(app);
