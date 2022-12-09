import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from "../styles/cardHome.module.css"

const CardHome = ({plant}) => {
    const navigate= useNavigate()

    const handleScroll = () => {
        navigate(`/plants/details/${plant.id}`)
        window.scrollTo(0, {behavior: 'smooth'})
      }

    return (
        <div className={s.container_card}>
                    <div className={s.card}>
                    <div className={s.card_overlay}>
                            <button onClick={handleScroll}>more details</button>
                        </div>
                        <img src={plant.data.image} alt="" />
               {plant?.data.stock === 0 ? <div className={s.card_overstock}><p>Out of stock</p></div> : null}
                        <div className={s.specs}>
                            <p>{plant.data.name}</p>
                            <b>$ {plant.data.price}</b>
                        </div>
                    </div>
                </div>
    );
};

export default CardHome;