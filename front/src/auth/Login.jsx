import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from  "react-router-dom";
import s from "../styles/login.module.css"
import diferent from "../images/diferent.webp"



export default function Login({setAuthState, setUser}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = () => {
        if(email !== null && password !== null) {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUser(email)
                setAuthState('logged')
                history("/")
            })
            .catch((err) => alert(err));
        }
    }

    const provider = new GoogleAuthProvider();

    const handleGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user= result.user;
            history("/");
        }).catch((err) => alert(err)) 
    }



    return (
        <div className={s.container}>
            <div className={s.wraper}>
            <div className={s.login}>
            <div className={s.specs} >
        <h2 className={s.login_title}>Welcome Back</h2>
        <p>Please enter your details.</p>
        <div>
            <div className={s.input_container}>
               
                <input  className={s.input_text}
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
                    placeholder="password" type={"password"}/>
            </div>
            <div>
                <div className={s.check}>
                    <input className={s.check_input} type="checkbox" id='remember'/>
                    <label className={s.check_label}  for="remember">Remember for 30 days</label>
                </div>
                <button className={s.forgot_btn}>Forgot password</button>
            </div>
            <div className={s.sign_btn_container}>
                <button onClick={handleLogin} className={s.sign_login}>SIGN IN</button>
                <button onClick={handleGoogle} className={s.login_google} >
                        Sign in with Google
                </button>
            </div>
            <div className={s.register}>
                <p>Don't have an account?</p>
                <button onClick={() => setAuthState('register')}>SIGN UP</button>
            </div>

            </div>
        </div>
            </div>
            <div className={s.image}>
                <img src={diferent} alt="img"  />

            </div>
            </div>
    </div>
    )
}