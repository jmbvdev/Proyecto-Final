import React from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userOnline } from "../Redux/actions/users/index";

function Auth() {
  const [user, setUser] = React.useState(null);
  const [authState, setAuthState] = React.useState(null);
  const dispatch = useDispatch();
  const online = useSelector((state) => state.usersReducer.online);

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
          dispatch(userOnline());
        } else {
          setUser(null);
          setAuthState("login");
        }
      }
    );

    return unSubscribeAuth;
  }, [user]);

  if (authState === null) return <div>loading...</div>;
  if (authState === "login")
    return <Login setAuthState={setAuthState} setUser={setUser} />;
  if (authState === "register")
    return <Register setAuthState={setAuthState} setUser={setUser} />;
  if (user) return <Dashboard user={user} authState={authState} />;
}

export default Auth;
