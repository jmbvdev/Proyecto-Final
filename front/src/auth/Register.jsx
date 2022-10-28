import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, userOnline } from '../Redux/actions/users/index';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut, sendEmailVerification } from 'firebase/auth';


export default function Register() {

    const initialState = {
        displayName: '',
        password: '',
        email: '',
    };

    const [input, setInput] = React.useState(initialState);

    const [password2, setPassword2] = React.useState('');
    const online = useSelector(state => state.usersReducer.online)
    const dispatch = useDispatch();
    const history = useNavigate();

    React.useEffect(() => {
        setInput(prev => ({ ...prev, [input.name]: input.value}))
    }, [input.name, input.value])


    const handleOnSubmit = (e) => {
        if(input.displayName !==null && input.email !== null && input.password !== null && password2 !== null && input.password === password2) {
            e.preventDefault();
            dispatch(createUser(input));
            setInput(initialState);
            alert('User succesfully created!');
          
                sendEmailVerification(auth.currentUser)
            
            history("/");
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        //setError(validate({...input, [e.target.name] : e.target.value}))
        setInput({...input, [e.target.name] : e.target.value})
    }

    return (
        <div>
        <h1>Register</h1>
        <p>Welcome! Please create your account.</p>
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <div>
                <label>Display Name</label>
                <input 
                    name= "displayName"
                    value={input.displayName}
                    onChange={handleChange}
                    placeholder="Enter your complete Name"/>
            </div>
            <div>
                <label>Email</label>
                <input 
                    name= "email"
                    value={input.email}
                    onChange={handleChange}
                    placeholder="Enter your email"/>
            </div>
            <div>
                <label>Password</label>
                <input 
                    name= "password"
                    value={input.password}
                    onChange={handleChange}
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