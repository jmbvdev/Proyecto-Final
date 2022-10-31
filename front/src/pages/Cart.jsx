import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  deleteProduct,
  deleteAll,
  saveCart,
  purchase,
} from "../Redux/actions/shopCart";
import s from "../styles/cart.module.css";
import MercadoPago from "../mercadopago/mercadopago";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [pago, setPago] = useState(false);
  const plants = useSelector((state) => state.shopCartReducer.products);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleDeleteAll() {
    dispatch(deleteAll(plants[0]?.orderID, currentUser?.uid));
  }

  function handleQuantity(id, value) {
    setQuantity((q) => q + value);

    dispatch(changeQuantity(id, value));
  }

  function handleOnPurchase(e) {
    e.preventDefault();
    if (!currentUser) navigate("/sign-in");
    else setPago(true);
  }

  function handleDeletePlant(id) {
    plants.filter((p) => p.id === id);
    dispatch(deleteProduct(id));
    if (currentUser) {
      dispatch(
        saveCart(
          plants.filter((p) => p.id !== id),
          currentUser.uid
        )
      );
    }
  }
  let sum = 0;
  for (let i = 0; i < plants.length; i++) {
    sum += plants[i].count * plants[i].price;
  }

  return (
    <div className={s.cart_container}>
      <div className={s.product}>
        <h3 className={s.title}>Your cart</h3>
        <button onClick={handleDeleteAll}>Clear All</button>
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
      </div>
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
        <button onClick={handleOnPurchase} className={s.checkout}>
          CHECKOUT NOW
        </button>
        {pago ? <MercadoPago items={plants} totalAmount={sum} /> : null}
      </div>
    </div>
  );
};

export default Cart;
