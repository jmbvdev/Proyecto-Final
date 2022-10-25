const {admin} = require("../config/firebase.js");

module.exports = async function updateUser(uid, displayName, password, email, phoneNumber, photoURL, role){
    const auth = admin.auth();

    const user = await auth.updateUser(uid, {
        displayName,
        password,
        email,
        phoneNumber,
        photoURL,
    })
    await admin.auth().setCustomUserClaims(user.uid, {role})
    return user;
}


