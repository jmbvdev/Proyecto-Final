import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Dashboard = () => {
const dispatch = useDispatch();
const user = useSelector(state => state.usersReducer.currentUser);

React.useEffect(() => {
    dispatch(setCurrentUser(auth));
    console.log(auth)
    console.log(user)
}, [])

return (
    <div>
        <h2>{user.email}</h2>
    </div>
)
};

export default Dashboard;