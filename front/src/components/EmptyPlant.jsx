import React from 'react';
import image from "../images/calatea.webp"
import s from "../styles/foundPlants.module.css"

const EmptyPlant = ({message}) => {
    return (
        <div className={s.container}>
            <img src={image} alt="" />
            <h2>{message}</h2>
            
        </div>
    );
};

export default EmptyPlant;