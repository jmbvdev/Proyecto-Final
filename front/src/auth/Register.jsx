
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut, sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import s from "../styles/register.module.css";
import { setCurrentUser } from "../Redux/actions/users";
import plans from "../images/plans.webp";




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
      createUserWithEmailAndPassword(auth, input.email, input.password).then(
         () => {
            sendEmailVerification(auth.currentUser).then( () => {
               signOut(auth).then(() => {
                dispatch(setCurrentUser(null))
              }
              )
            });
          
        }
        );
      setInput(initialState);
      alert("User succesfully created!");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    //setError(validate({...input, [e.target.name] : e.target.value}))
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
                disabled={
                  !input.displayName ||
                  !input.email ||
                  !input.password ||
                  input.password !== password2
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
