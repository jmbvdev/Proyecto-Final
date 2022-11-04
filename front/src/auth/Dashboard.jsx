import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import AdminNav from "./AdminNav";
import s from "../styles/dashboard.module.css"
import image from "../images/profile.webp"


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

        
const navigate= useNavigate()


return (
    <div className={s.container}>
        <div className={s.profile}>
            <img src={image} alt="" className={s.calatea} />
            <div className={s.specs}>
                <img src={user?.photoURL} alt={user?.displayName} className={s.profile_pic}/>
                <h2>{user?.displayName}</h2>
                <div className={s.text_specs}>
                    <p><strong>Email: </strong>{user?.email}</p>
                    <button onClick={()=>navigate("/dashboard/edit")} className={s.edit_btn}>CLICK TO EDIT</button>
                </div>

            </div>

        </div>
                    {role === "admin" ? <AdminNav /> : <p>USER #{user?.uid}</p>}


    </div>
)
};

export default Dashboard;