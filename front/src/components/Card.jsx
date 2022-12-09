import React from "react";
import { useNavigate } from "react-router-dom";
import s from "../styles/card.module.css";

const Card = ({ plant, id }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`details/${id}`);
    window.scrollTo(0, {
      behavior: 'smooth'
    })
  }
  if (!plant.logicalDeletion) {
    return (
      <div className={s.container_card}>
        {plant.stock === 0 ? <div className={s.card_overstock}><p>Out of stock</p></div> : null}
        <div className={s.card}>
          <div className={s.card_overlay}>
            <button onClick={handleClick}>more details</button>
          </div>
          <img src={plant.image} alt="" />
          <div className={s.specs}>
            <p>{plant.name}</p>
            <b>$ {plant.price}</b>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default Card;
