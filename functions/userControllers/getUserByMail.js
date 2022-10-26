const {admin} = require("../config/firebase.js");

module.exports = async function getUserByMail(email){
    const user = await admin.auth().getUserByEmail(email);
    return user.toJSON();

}