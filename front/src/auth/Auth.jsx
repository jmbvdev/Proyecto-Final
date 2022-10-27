import React from 'react';
import Login from "./Login";
import Register from "./Register";
import Nav from '../components/Nav';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function Auth() {
    const [user, setUser] = React.useState(null);
    const [authState, setAuthState] = React.useState(null)
  
    React.useEffect(() => {
      const unSubscribeAuth = onAuthStateChanged(auth,
        async authenticatedUser => {
          if(authenticatedUser) {
            setUser(authenticatedUser.email)
            setAuthState('logged');
          } else {
            setUser(null);
            setAuthState('login')
          }
        })
  
        return unSubscribeAuth;
    }, [user])
  
    if(authState === null) return <div>loading...</div>
    if(authState === 'login') return <Login setAuthState={setAuthState} setUser={setUser}/>
    if(authState === 'register') return <Register setAuthState={setAuthState} setUser={setUser}/> 
    if(user) return <Nav setAuthState={setAuthState} setUser={setUser} user={user} authState={authState}/>
  
  }
  
  export default Auth;
  