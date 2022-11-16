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
import { IoIosArrowBack } from "react-icons/io";

export default function Register() {
  const initialState = {
    displayName: "",
    email: "",
    password: "",
    password2: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [error, setError] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (input.displayName && input.email && input.password && input.password2) {
      if (input.password !== input.password2) {
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
          dispatch(setCurrentUser(null));
          await sendEmailVerification(auth.currentUser);
          await signOut(auth);
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
          console.log(err);
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

    setError(validate({ ...input, [e.target.name]: e.target.value }));
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className={s.container}>
        <div className={s.button_container}>
            <button onClick={()=>navigate(-1)} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
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
              {error.displayName && (
                <p className={s.danger}>{error.displayName}</p>
              )}
            </div>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {error.email && <p className={s.danger}>{error.email}</p>}
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
              {error.password && <p className={s.danger}>{error.password}</p>}
              <input
                className={s.input_text}
                name="password2"
                value={input.password2}
                onChange={handleChange}
                placeholder="Repeat your password"
                type={"password"}
              />
              {error.password2 && <p className={s.danger}>{error.password2}</p>}
            </div>
            <div>
              <button

                disabled={
                  !input.email ||
                  !input.password ||
                  !input.displayName ||
                  input.password !== input.password2 ||
                  error.lenght > 0
                }

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

const validate = (input) => {
  let error = {};

  if(!/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(input.displayName))  error.displayName = "Name invalid! (Ex : Juan Lopez)";
  if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input.email))  error.email = "Email invalid! (Ex : juanlopez12@mail.com)";
  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(input.password)) error.password = "Password invalid! (8-15 char., Cap. letter, at least 1 digit, No blanks)";
  if(input.password !== input.password2) error.password2 = 'Both password must be equal';
  return error
}

