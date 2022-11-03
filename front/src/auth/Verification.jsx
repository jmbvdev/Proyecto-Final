import React from "react";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, sendEmailVerification } from "firebase/auth";
import { setCurrentUser } from "../Redux/actions/users";
import Swal from "sweetalert2"
import s from "../styles/verification.module.css"
import warning from "../images/warning.webp"
import send from "../images/send.webp"

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

     
      <div className={s.container}>
        <div className={s.wraper}>
          <img src={warning} alt="" />
          <div className={s.right}>
            <h3>Your account is not verify!</h3>
            <p>To proceed click the following button!</p>
            <div onClick={handleVerify} className={s.send}>
                <img src={send} alt="" />
                <p>send verification link</p>
            </div>
          </div>

        </div>
      </div>
    );
}

export default Verification;
