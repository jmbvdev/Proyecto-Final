const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: private_key.replace(/\\n/g, "\n"),
    projectId: project_id,
    clientEmail: clientemail,
  }),
  databaseURL: "https://api-plants-b6153.firebaseio.com",
});

const db = admin.firestore();
module.exports = { admin, db };
