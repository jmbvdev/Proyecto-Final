const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({ origin: true });
const routes = require("./routes/index.js");
const errorMiddleware = require("./Middlewares/error.js");
const app = express();
app.use(cors);

app.use("/", routes);

app.use(errorMiddleware);

exports.app = functions.https.onRequest(app);
