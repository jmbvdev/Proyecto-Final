const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth")

module.exports =  async function createUser(displayName, password, email) {
        // const user = await admin.auth().createUser({
        //     displayName,
        //     password,
        //     email
        // })
        // await admin.auth().setCustomUserClaims(uid, { role })

        // return user;
        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
    
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        });

 }