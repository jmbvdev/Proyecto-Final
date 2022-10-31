import React from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userOnline } from "../Redux/actions/users/index";
import { loadCart } from "../Redux/actions/shopCart/index.js";
import Loading from "../components/Loading";

function Auth() {
  const currentUser= useSelector(state=>state.usersReducer.currentUser)
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState("login");
  const dispatch = useDispatch();


  
  if (currentUser !== null)  return <Loading/>;
 else{
   if (authState === "login")
     return <Login setAuthState={setAuthState} setUser={setUser} />;
     if (authState === "register")
       return <Register setAuthState={setAuthState} setUser={setUser} />;

 }
 
}

export default Auth;
