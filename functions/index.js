const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")({ origin: true });
const { db } = require("./config/firebase.js");
const app = express();
app.use(cors);

app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.get("/users", async (req, res) => {
  try {
    const userQuerySnapshot = await db.collection("users").get();
    const users = [];
    userQuerySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
// prueba
app.post("/users", async (req, res) => {
  try {
    const user = {
      name: req.body["name"],
      position: req.body["position"],
      goals: req.body["goals"],
    };

    const newDoc = await db.collection("users").add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send(`User should cointain the requested elements!!`);
  }
});

app.delete("/users/:userId", (req, res) => {
  db.collection("users")
    .doc(req.params.userId)
    .delete()
    .then(() => res.status(204).send("User successfully deleted!"))
    .catch(function (error) {
      res.status(500).send(error);
    });
});

app.put("/users/:userId", async (req, res) => {
  await db
    .collection("users")
    .doc(req.params.userId)
    .set(req.body, { merge: true })
    .then(() => res.json({ id: req.params.userId }))
    .catch((error) => res.status(500).send(error));
});

exports.app = functions.https.onRequest(app);
