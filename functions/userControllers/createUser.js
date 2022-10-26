const {admin} = require("../config/firebase.js");

module.exports =  async function createAccount(displayName, password, email, photoURL) {
        
        const user = await admin.auth().createUser({
            displayName,
            password,
            email,
            emailVerified: false,
            photoURL,
            disabled:false,


        })
        //await admin.auth().setCustomUserClaims(user.uid, {role})

        


         return user;


        // const auth = getAuth();

        // await createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //     // Signed in
        //     const user = userCredential.user;
        //     const curr = auth.currentUser;
        //     setCustomUserClaims(curr.uid, {role})
    
        // })
        // .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        
        // });

 }