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

/* import { getAuth, updateProfile } from "firebase/auth";
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg",
})
  .then(() => {
    // Profile updated!
    // ...
  })
  .catch((error) => {
    // An error occurred
    // ...
  });
 */

export default function Register() {
  const initialState = {
    displayName: "",
    email: "",
    password: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [password2, setPassword2] = React.useState("");
  const [error, setError] = React.useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    setInput((prev) => ({ ...prev, [input.name]: input.value }));
  }, [input.name, input.value]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      input.displayName !== null &&
      input.email !== null &&
      input.password !== null &&
      password2 !== null &&
      input.password === password2
    ) {
      createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: input.displayName,
          })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                signOut(auth).then(() => {
                  dispatch(setCurrentUser(null));
                  alert("User succesfully created!");
                  navigate("/");
                });
              });
            })
            .catch((err) => {
              window.alert(err.message);
            });
        })
        .catch((err) => {
          window.alert(err.message);
        });
      setInput(initialState);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setError(validate({...input, [e.target.name] : e.target.value}))
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
            { error.displayName && (<p className={s.danger}>{error.displayName}</p>)}
            </div>
            <div className={s.input_container}>
              <input
                className={s.input_text}
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Email"
              />
              { error.email && (<p className={s.danger}>{error.email}</p>)}
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
              { error.password && (<p className={s.danger}>{error.password}</p>)}
              <input
                className={s.input_text}
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Repeat your password"
                type={"password"}
              />
              { error.password2 && (<p className={s.danger}>{error.password2}</p>)}
            </div>
            <div>
              <button
                disabled={
                  !input.displayName ||
                  !input.email ||
                  !input.password ||
                  input.password !== password2 ||
                  error.length>0
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
};

const validate = input => {
  let error = {};
  if(!/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(input.displayName))  error.displayName = "Name invalid! (Ex : Juan Lopez)";
  if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input.email))  error.email = "Email invalid! (Ex : juanlopez12@mail.com)";
  if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(input.password)) error.password = "Password invalid! (8-15 char., Cap. letter, at least 1 digit, No blanks, 1 special char)";
  return error
}
