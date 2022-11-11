import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  signOut,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import s from "../styles/register.module.css";
import { setCurrentUser } from "../Redux/actions/users";
import plans from "../images/plans.webp";
import Swal from "sweetalert2";

export default function Register() {
  const initialState = {
    displayName: "",
    email: "",
    password: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [password2, setPassword2] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input.displayName && input.email && input.password && password2) {
      if (input.password !== password2) {
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
            title: `The password doesn't match!`,
          })
        );
        return;
      }
      (async () => {
        try {
          await createUserWithEmailAndPassword(
            auth,
            input.email,
            input.password
          );
          await updateProfile(auth.currentUser, {
            displayName: input.displayName,
          });
          await sendEmailVerification(auth.currentUser);
          await signOut(auth);
          dispatch(setCurrentUser(null));
          const Toast = Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: false,
          });
          Promise.resolve(
            Toast.fire({
              icon: "success",
              title: `User succesfully created. Please check your email to verify!`,
            })
          );
          navigate("/");
          setInput(initialState);
          return;
        } catch (err) {
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
              title: `${err.message}. Try again!`,
            })
          );
          return;
        }
      })();
    } else {
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
          title: `Something is missing!`,
        })
      );
      return;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className={s.container}>
      <div className={s.wraper}>
        <div className={s.image}>
          <img src={plans} alt="" />
        </div>
        <div className={s.register}>
          <h1 className={s.title}>Register</h1>
          <p className={s.welcome}>Create an account.</p>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="displayName"
                value={input.displayName}
                onChange={handleChange}
                placeholder="Complete name"
              />
            </div>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Password"
                type={"password"}
              />
              <input
                className={s.input_text}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Repeat your password"
                type={"password"}
              />
            </div>
            <div>
              <button
                disabled={!input.email || !input.password}
                className={s.register_btn}
                type="submit"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
