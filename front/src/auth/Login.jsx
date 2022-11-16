import React from "react";
import { useState } from "react";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import s from "../styles/login.module.css";
import diferent from "../images/diferent.webp";
import ForgotenPassword from "./forgotenPassword";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [open, handleOpen] = useState(false);
  const dispatch = useDispatch();

  const redirectToPasswordReset = (e) => {
    e.preventDefault();
    handleOpen(true);
  };
  const handleVerify = () => {
    const user = auth.currentUser;
    signOut(auth).then(() => {
      dispatch(setCurrentUser(null));
      history("/sign-in");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: true,
        timer: 6000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "info",
        title: `Your account is not verified. Check your email and do the verification proccess. Press Ok if you want to resend the email!`,
      }).then((res) => {
        if (res.isConfirmed) {
          sendEmailVerification(user);
        }
      });
    });
  };

  const handleLogin = () => {
    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          auth.currentUser.emailVerified === false
            ? handleVerify()
            : history("/");
        })
        .catch((err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          });
          Promise.resolve(
            Toast.fire({
              icon: "error",
              title: `${err.message}`,
            })
          );
        });
    }
  };

  const provider = new GoogleAuthProvider();

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        /* dispatch(loadCart(auth.currentUser?.uid)); */
        history("/");
      })
      .catch((err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        });
        Promise.resolve(
          Toast.fire({
            icon: "error",
            title: `${err.message}`,
          })
        );
      });
  };

  return (
    <div className={s.container}>
      <div className={s.wraper}>
        <div className={s.login}>
          <div className={s.specs}>
            <h2 className={s.login_title}>Welcome Back</h2>
            <p>Please enter your details.</p>
            <div>
              <div className={s.input_container}>
                <input
                  className={s.input_text}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
              </div>
              <div className={s.input_container}>
                <input
                  className={s.input_text}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  type={"password"}
                />
              </div>
              <div>
                <div className={s.check}>
                  <input
                    className={s.check_input}
                    type="checkbox"
                    id="remember"
                  />
                  <label className={s.check_label} htmlFor="remember">
                    Remember for 30 days
                  </label>
                </div>
                <button
                  onClick={redirectToPasswordReset}
                  className={s.forgot_btn}
                >
                  Forgot password
                </button>
              </div>
              <div className={s.sign_btn_container}>
                <button onClick={handleLogin} className={s.sign_login}>
                  SIGN IN
                </button>
                <button onClick={handleGoogle} className={s.login_google}>
                  Sign in with Google
                </button>
              </div>
              <div className={s.register}>
                <p>Don't have an account?</p>
                <button>
                  <Link to="/register">SIGN UP</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={s.image}>
          <img src={diferent} alt="img" />
        </div>
      </div>
      {open ? <ForgotenPassword close={handleOpen} /> : null}
    </div>
  );
}
