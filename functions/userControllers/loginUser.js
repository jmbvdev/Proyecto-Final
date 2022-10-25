const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")

module.exports = async function loginUser(email, password){
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    });
} 