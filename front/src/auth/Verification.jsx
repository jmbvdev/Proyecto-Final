import React from "react";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, sendEmailVerification } from "firebase/auth";
import { setCurrentUser } from "../Redux/actions/users";

function Verification() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerify = (e) => {
        e.preventDefault();
        
            sendEmailVerification(auth.currentUser).then( () => {
               signOut(auth).then(() => {
                dispatch(setCurrentUser(null));
                navigate("/login");
              }
              )
            });
    
}


    return (
        <div>
            <h3>Your account is not verify!</h3>
            <p>To proceed click the following button!</p>
            <button onClick={handleVerify}>send verification link</button>
        </div>
    )
}

export default Verification;
