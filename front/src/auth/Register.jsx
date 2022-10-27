import React from 'react';

import { auth } from '../firebase/firebase';


export default function Register() {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');


    const handleOnSubmit = (e) => {
        if(email !== null && password1 !== null && password2 !== null && password1 === password2) {
            e.preventDefault();

        }
    }

    return (
        <div>
        <h1>Register</h1>
        <p>Welcome! Please create your account.</p>
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <div>
                <label>Display Name</label>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your complete Name"/>
            </div>
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
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="Enter your password" 
                    type={"password"}/>
                <input 
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Repeat your password" 
                    type={"password"}/>
            </div>
            <div>
                <button type='submit'>Register</button>
            </div>
        </form>
    </div>
    )
}