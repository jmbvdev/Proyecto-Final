import React, { useState, useEffect } from "react";

import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import empty from "../images/cart.webp"
import Swal from "sweetalert2"

import {
  changeQuantity,
  deleteProduct,
  deleteAll,
  saveCart,
} from "../Redux/actions/shopCart";
import s from "../styles/cart.module.css";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const plants = useSelector((state) => state.shopCartReducer.products);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();

  function handleDeleteAll() {
    Swal.fire({
      title:"Warning",
      text:"Are you sure you want to remove all the products from the cart?",
      icon:"error",
      showDenyButton:true,
      denyButtonText:"No",
      confirmButtonText:"Yes",
      confirmButtonColor:"green"
    }).then(res=>{
      if (res.isConfirmed) {
        dispatch(deleteAll());
      }
    })
  
  }

  function handleQuantity(id, value) {
    setQuantity((q) => q + value);

    dispatch(changeQuantity(id, value));
  }
  function handleDeletePlant(id) {
    Swal.fire({
      title:"Warning",
      text:"Are you sure you want to remove this plant?",
      icon:"error",
      showDenyButton:true,
      denyButtonText:"No",
      confirmButtonText:"Yes",
      confirmButtonColor:"green"
    }).then(res=>{
      if (res.isConfirmed) {
        plants.filter((p) => p.id === id);
        dispatch(deleteProduct(id));
      }
    })

  }
  let sum = 0;
  for (let i = 0; i < plants.length; i++) {
    sum += plants[i].count * plants[i].price;
  }

  return (
    <div className={s.cart_container}>
      {
       sum>1?
        <div className={s.product}>
        <h3 className={s.title}>Your cart</h3>

        <button onClick={handleDeleteAll} className={s.clear}>Clear All</button>
        {plants?.map((p) => {


          return (
            <>
              <div className={s.list}>
           
                <div className={s.left}>
                  <img src={p.image} alt="" />
                  <div className={s.specs}>
                    <strong>{p.name}</strong>
                    <p className={s.price}>${p.price}</p>
                    <div className={s.counter}>
                      <button
                        disabled={p.count === 1}
                        onClick={() => handleQuantity(p.id, -1)}
                      >
                        -
                      </button>
                      <p>{p.count}</p>
                      <button
                        disabled={p.count === p.stock}
                        onClick={() => handleQuantity(p.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className={s.total}>
                  <h3>${p.price * p.count}</h3>
                  <div className={s.total_btn}>
                    <button className={s.heart_icon}>
                      <FaHeart />
                    </button>
                    <button
                      onClick={() => handleDeletePlant(p.id)}
                      className={s.delete}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div > :
         <div className={s.empty}>
          <img src={empty} alt="empty" />
          <h4>Your cart is empty</h4>
        


         </div>
      }
      <div className={s.check}>
        <h3>ORDER SUMMARY</h3>
        <div className={s.summary}>
          <p>Subtotal</p>
          <span>${sum ? sum : 0.0}</span>
        </div>
        <div className={s.summary}>
          <p>Estimated shipping</p>
          <span>$0.00</span>
        </div>
        <div className={s.total_summary}>
          <p>Estimated total</p>
          <span>${sum ? sum : 0.0}</span>
        </div>
        <button className={s.checkout}>CHECKOUT NOW</button>
      </div>
    </div>
  );
};

export default Cart;
