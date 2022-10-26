const {admin} = require("../config/firebase.js");

module.exports = async function deleteAccount(id){
    const auth = admin.auth();


    await auth.deleteUser(id);
    return
}