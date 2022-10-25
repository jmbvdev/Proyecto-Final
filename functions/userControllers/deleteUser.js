const { getAuth, deleteUser } = require("firebase/auth")

module.exports = async function deleteAccount(id){
    const auth = getAuth(id);
    const user = auth.currentUser;

    deleteUser(user).then(()=> {
        alert('the user has been deleted!')
    }).catch((error)=> {
        alert('An error ocurred')
    })
}