const {admin} = require("../config/firebase.js");

module.exports = async function getUserById(uid){
    const user = await admin.auth().getUser(uid);
    return user.toJSON();

}