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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                            </svg>
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