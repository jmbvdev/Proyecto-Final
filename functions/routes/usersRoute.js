const { Router } = require("express");
const createUser = require("../userControllers/createUser");
const loginUser = require("../userControllers/loginUser");

const usersRoute = Router();

usersRoute
    .post("/register", async(req, res) => {
        try {
            const {email, username, password} = req.body;
            const user = await createUser(username, password, email)
            console.log(user);
            res.status(201).redirect('/');
        }
        catch(err){
            res.status(404).send(err)
        }
    })
    .post("/login", async(req, res) => {
        try{
            const {email, password} = req.body;
            const user = await loginUser(email, password);
            res.status(201).redirect('/');
        } catch(err){
            res.status(404).send(err);
        }
    })
    .delete("/:id", async (req, res) => {
        try{
            const {id} = req.params;
            const deleted = await deleteAccount(id)
            res.status(200).send(`user ${id} has been succesfully removed`)

        }catch(err){
            res.status(400).send({err: 'something went wrong'})
        }
    })

module.exports = usersRoute;
