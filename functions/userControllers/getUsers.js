const {admin} = require("../config/firebase.js");

module.exports = async function getAllUsers(){
    const allUsers = await admin.auth().listUsers();
    const userArray = allUsers.users.map(u => {
        return u.toJSON();
    })

    return userArray
    
}