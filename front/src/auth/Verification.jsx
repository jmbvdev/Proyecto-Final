import React from "react";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, sendEmailVerification } from "firebase/auth";
import { setCurrentUser } from "../Redux/actions/users";
import Swal from "sweetalert2"

function Verification() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        sendEmailVerification(auth.currentUser).then( () => {
                Swal.fire({
                  title:"Account verification required!",
                  text:"Verification sended! Check your email box",
                  icon:"warning",
                  showDenyButton:false,
                  denyButtonText:"No",
                  denyButtonColor:"#FF5733",
                  confirmButtonText:"OK",
                  confirmButtonColor:"#72CE65"
                }).then(res=>{
                  if (res.isConfirmed) {
                      signOut(auth).then(() => {
                      dispatch(setCurrentUser(null))
                      navigate('/sign-in');
                  });
                  }
                })
              });
    }, [])


    return (
        <div>
        </div>
    )
}

export default Verification;
