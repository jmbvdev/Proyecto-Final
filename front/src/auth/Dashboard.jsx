import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import AdminNav from "./AdminNav";


const Dashboard = () => {
const dispatch = useDispatch();
const user = useSelector(state => state.usersReducer.currentUser);
const [role, setRole] = React.useState(null);

React.useEffect(() => {
    if(user){
        dispatch(setCurrentUser(auth.currentUser));
        (async () => {
            const userRole = await auth.currentUser.getIdTokenResult();
            console.log(userRole.claims.role)
            setRole(userRole.claims.role[0]);
        })();
    }

}, [role, user]);




return (
    <div>
        <Link to="/dashboard/edit">EDIT</Link>
        <img src={user?.photoURL} alt={user?.displayName}/>
        <h2>{user?.email}</h2>
        <p>{user?.displayName}</p>
        <p>{user?.phoneNumber}</p>
        {role === "admin" ? <AdminNav /> : <p>USER #{user?.uid}</p>}

    </div>
)
};

export default Dashboard;