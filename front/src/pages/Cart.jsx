import React, { useState } from 'react';
import {FaHeart}from "react-icons/fa"
import {MdDeleteForever}from "react-icons/md"
import s from "../styles/cart.module.css"

const Cart = () => {
    const [quantity, setQuantity]= useState(1)
    function handleMinus(quantity) {
        if (quantity<1) {
            setQuantity(0)
        }else{

            setQuantity(quantity-1)
        }
        
    }
    return (
        <div className={s.cart_container}>
            <div className={s.product}>
            <h3 className={s.title}>Your cart</h3>
            <div className={s.list}>
                <div className={s.left}>
                <img src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-burgundy_medium_hyde_olive.jpg?v=1660942048" alt="" />
                <div className={s.specs}>
                    <strong>Ficus Burgundi</strong>
                    <p className={s.price}>$98</p>
                    <div className={s.counter}>
                        <button onClick={handleMinus}>-</button>
                        <p>{quantity}</p>
                        <button onClick={()=>setQuantity(quantity+1)}>+</button>
                    </div>

                </div>
                </div>
                <div className={s.total}>
                    <h3>$98</h3>
                    <div className={s.total_btn}>
                        <button className={s.heart_icon}><FaHeart/></button>
                        <button className={s.delete}><MdDeleteForever/></button>

                    </div>

                </div>


            </div>


            </div>
            <div className={s.check}>

            </div>

          
        </div>
    );
};

export default Cart;