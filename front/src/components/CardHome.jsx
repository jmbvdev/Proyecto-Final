import React from 'react';
import s from "../styles/cardHome.module.css"

const CardHome = ({plant}) => {
    return (
        <div className={s.container_card}>
                    <div className={s.card}>
                    <div className={s.card_overlay}>
                            <button>more details</button>
                        </div>
                        <img src={plant.image} alt="" />
                        <div className={s.specs}>
                            <p>{plant.name}</p>
                            <b>$65</b>
                      
                    
                        </div>
                    </div>
                </div>
    );
};

export default CardHome;