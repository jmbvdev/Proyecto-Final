import React from "react";


import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userOnline } from "../Redux/actions/users/index";
import { loadCart } from "../Redux/actions/shopCart/index.js";
import Loading from "../components/Loading";

function Auth() {

}

export default Auth;
