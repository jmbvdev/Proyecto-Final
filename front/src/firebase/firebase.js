
// import firebase from "firebase/compat/app"

import "firebase/compat/storage"
import "firebase/compat/firestore"



//----------------------------------------------------------------------


//@typecheck


// import {
//     getFirestore,
// } from "firebase/firestore";

// import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    "apiKey": "AIzaSyDx0ASASCNyoYi4LxhNfwjLt1gdhriXjDo",
    "authDomain": "api-plants-b6153.firebaseapp.com",
    "projectId": "api-plants-b6153",
    "storageBucket": "api-plants-b6153.appspot.com",
    "messagingSenderId": "438341865795",
    "appId": "1:438341865795:web:1befa5fd5a110690addff6",
    "measurementId": "G-BVDKW0KVL5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
export const storage = getStorage(app);
