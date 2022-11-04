import React from 'react';
import s from "../styles/discount.module.css"

const Discount = () => {
    return (
        <div className={s.container}>
            <p>USE THE COUPON CODE: <strong>WELCOME</strong>  TO GET A 25% DISCOUNT</p>
        </div>
    );
};

export default Discount;