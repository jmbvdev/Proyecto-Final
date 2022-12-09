const { Router } = require("express");
const createAccount = require("../userControllers/createUser");
const updateUser = require("../userControllers/updateUser");
const deleteAccount = require("../userControllers/deleteUser");
const getAllUsers = require("../userControllers/getUsers");
const getUserByMail = require("../userControllers/getUserByMail");
const getUserById = require("../userControllers/getUserById");

const usersRoute = Router();

usersRoute
  .get("/all", async (req, res, next) => {
    try {
      const allUsers = await getAllUsers();
      res.status(200).send(allUsers);
    } catch (err) {
      next(err);
    }
  })
  .get("/", async (req, res, next) => {
    try {
      const { email } = req.query;
      const searchedUser = await getUserByMail(email);
      res.status(200).send(searchedUser);
    } catch (err) {
      next(err);
    }
  })
  .get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const searched = await getUserById(id);
      res.status(200).send(searched);
    } catch (err) {
      next(err);
    }
  })
  .post("/register", async (req, res, next) => {
    try {
      const { displayName, password, email, photoURL } = req.body;
      const user = await createAccount(displayName, password, email, photoURL);

      res.status(201).send(user.toJSON());
    } catch (err) {
      next(err);
    }
  })
  .delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      await deleteAccount(id);
      res.status(203).send(`user ${id} has been succesfully removed`);
    } catch (err) {
      next(err);
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const {
        displayName,
        password,
        email,
        phoneNumber,
        photoURL,
        role,
        disabled,
        adress,
        adressNumber,
        city,
      } = req.body;
      const { id } = req.params;
      await updateUser(
        id,
        displayName,
        password,
        email,
        phoneNumber,
        photoURL,
        role,
        disabled,
        adress,
        adressNumber,
        city
      );
      const searched = await getUserById(id);
      res.status(200).send(searched);
    } catch (err) {
      next(err);
    }
  });

module.exports = usersRoute;
