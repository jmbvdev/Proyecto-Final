import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from "../styles/cardHome.module.css"

const CardHome = ({plant}) => {
    const navigate= useNavigate()
    return (
        <div className={s.container_card}>
                    <div className={s.card}>
                    <div className={s.card_overlay}>
                            <button onClick={()=>navigate(`/plants/details/${plant.id}`)}>more details</button>
                        </div>
                        <img src={plant.data.image} alt="" />
                        <div className={s.specs}>
                            <p>{plant.data.name}</p>
                            <b>$ {plant.data.price}</b>
                        </div>
                    </div>
                </div>
    );
};

export default CardHome;