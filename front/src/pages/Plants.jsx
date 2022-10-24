import React from 'react';
import s from "../styles/plants.module.css"
import logo from "../images/logo-max.png"
import {useNavigate} from "react-router-dom"
const Plants = () => {
    const navigate= useNavigate()

    return (
        <div className={s.plants}>
            <div className={s.banner}>
               <img src={logo} alt="" />
                <button onClick={()=>navigate("/contact")}>CONTACT US</button>
           

            </div>
           
        </div>
    );
};

export default Plants;