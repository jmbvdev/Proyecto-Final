import React from 'react';
import s from "../styles/cardComment.module.css"
const CardComment = ({image, name, quote, rate}) => {
    return (
        <div className={s.container} >
          
            <img src={image} alt="" />
            <div className={s.specs}>
            <h4>{name}</h4>
            <p> {quote}</p>   
            <span>{rate}stars</span>

            

         </div>

            
        </div>
    );
};

export default CardComment;