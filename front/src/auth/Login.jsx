import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from  "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userOnline } from '../Redux/actions/users/index';





export default function Login({setAuthState, setUser}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();
    const dispatch = useDispatch();
    const online = useSelector(state => state.usersReducer.online)

    const handleLogin = () => {
        if(email !== null && password !== null) {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUser(email)
                dispatch(userOnline())
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
            dispatch(userOnline())
            history("/");
        }).catch((err) => alert(err)) 
    }



    return (
        <div>
        <h1>Welcome Back</h1>
        <p>Please enter your details.</p>
        <div>
            <div>
                <label>Email</label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"/>
            </div>
            <div>
                <label>Password</label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your email" type={"password"}/>
            </div>
            <div>
                <div>
                    <input  type="checkbox" id='remember'/>
                    <label for="remember">Remember for 30 days</label>
                </div>
                <button>Forgot password</button>
            </div>
            <div>
                <button onClick={handleLogin}>Sign in</button>
                <button onClick={handleGoogle}>
                        Sign in with Google
                </button>
            </div>
            <div>
                <p>Don't have an account?</p>
                <button onClick={() => setAuthState('register')}>Sign up</button>
            </div>
        </div>
    </div>
    )
}