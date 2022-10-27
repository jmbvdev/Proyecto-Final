import React from 'react';
import s from "../styles/loading.module.css"
import logo from "../images/logo-sinfondo.png"

const Loading = () => {
    return (
        <div className={s.loading}>
           <img src={logo} className={s.monstera} alt="" />
            <img className={s.loader} src="https://i.pinimg.com/originals/49/23/29/492329d446c422b0483677d0318ab4fa.gif" alt="" />
        </div>
    );
};

export default Loading;