import React from 'react';
import s from "../styles/cardComment.module.css"
import { AiFillStar } from "react-icons/ai"

const CardComment = ({ image, name, quote, rate, borrar, edit }) => {

    return (
        <div className={s.container} >

            <img src={image} alt="" />
            <div className={s.specs}>
                <h4>{name}</h4>
                <p className={s.quote}> “{quote}”</p>
                <div className={s.review}>
                    <AiFillStar className={s.star} />
                    <span>{rate}</span>
                </div>
            </div>
                <span >{borrar}</span>
                <span>{edit}</span>


        </div>
    );
};

export default CardComment;