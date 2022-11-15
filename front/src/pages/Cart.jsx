import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import empty from "../images/cart.webp";
import Swal from "sweetalert2";
import Coupon from "../components/Coupon";
import FormPostCheckout from "../components/formPostCheckout";
import FavButton from "../components/FavButton";

import {
  changeQuantity,
  deleteProductShop,
  deleteAll,
  saveCart,
  purchase,
} from "../Redux/actions/shopCart";
import s from "../styles/cart.module.css";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  const [pago, setPago] = useState(false);

  const plants = useSelector((state) => state.shopCartReducer.products);
  console.log("plants", plants);
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [discount, setDisc] = useState(0);
  const setDiscount = (discount) => {
    setDisc(discount);
  };
  function handleDeleteAll() {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to remove all the products from the cart?",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "keep in Cart",
      denyButtonColor: "#72CE65",
      confirmButtonText: "Remove",
      confirmButtonColor: "#FF5733",
    }).then((res) => {
      if (res.isConfirmed) {
        console.log("plants[0]?.orderID", plants[0]?.orderID);
        dispatch(deleteAll(plants[0]?.orderID, currentUser?.uid));
      }
    });
  }

  function handleQuantity(id, value) {
    setQuantity((q) => q + value);

    dispatch(changeQuantity(id, value, currentUser?.uid));

    const cart = plants.map((p) => {
      if (p.id === id) {
        return { ...p, count: p.count + value };
      } else return p;
    });
    dispatch(saveCart(cart, currentUser.uid));
  }

  function handleOnPurchase(e) {
    e.preventDefault();
    if (!currentUser) {

      Swal.fire({
        title: "Warning",
        text: "You are not registered! Do you want to sign in?",
        icon: "error",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#FF5733",
        confirmButtonText: "Yes",
        confirmButtonColor: "#72CE65",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/sign-in");
        }
      });
      return;
    }

    if (plants.length === 0) {
      Promise.resolve(
        Swal.fire({
          title: "Warning",
          text:
            "You don't have any plant in your cart to init the payment proccess",
          icon: "error",
          showDenyButton: false,
          denyButtonText: "No",
          denyButtonColor: "#72CE65",
          confirmButtonText: "Ok",
          confirmButtonColor: "#FF5733",
        })
      );
      return;
    }
    setPago(true);
  }

  function handleDeletePlant(id) {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to remove this plant?",
      icon: "error",
      showDenyButton: true,
      denyButtonText: "keep in cart",
      denyButtonColor: "#72CE65",
      confirmButtonText: "Remove",
      confirmButtonColor: "#FF5733",
    }).then((res) => {
      if (res.isConfirmed) {
        plants.filter((p) => p.id === id);
        dispatch(deleteProductShop(id));
        if (currentUser) {
          dispatch(
            saveCart(
              plants.filter((p) => p.id !== id),
              currentUser.uid
            )
          );
        }
      }
    });
  }

  let sum = 0;
  let total = 0;
  for (let i = 0; i < plants.length; i++) {
    sum += plants[i].count * plants[i].price * (1 - discount / 100);
    total += plants[i].count * plants[i].price;
  }

  return (
    <div className={s.cart_container}>
      {sum > 1 ? (
        <div className={s.product}>
          <h3 className={s.title}>Your cart</h3>

          <button onClick={handleDeleteAll} className={s.clear}>
            Clear All
          </button>
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
                      <div className={s.fav}>

                      <FavButton id={p.id} user={currentUser?.uid} className={s.heart_icon}/>
                      <button
                        onClick={() => handleDeletePlant(p.id)}
                        className={s.delete}
                      >
                        <MdDeleteForever />
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <div className={s.empty}>
          <img src={empty} alt="empty" />
          <h4>Your cart is empty</h4>
        </div>
      )}
      <div className={s.check}>
        <h3>ORDER SUMMARY</h3>
        <div className={s.summary}>
          <p>Subtotal</p>
          <span>${total ? total : 0.0}</span>
        </div>
        <div className={s.summary}>
          <p>Discount</p>
          <span>${sum && discount ? (sum * discount) / 100 : 0.0}</span>
        </div>
        <div className={s.total_summary}>
          <p>Estimated total</p>
          <div className={s.discount_container}>
            <span>
              ${sum ? sum : discount ? sum - (sum * discount) / 100 : 0.0}
            </span>
            {discount ? (
              <span className={s.discount}>{discount}% Off</span>
            ) : null}
          </div>
        </div>
        <Coupon setDiscount={setDiscount} />
        <button onClick={handleOnPurchase} className={s.checkout}>
          CHECKOUT NOW
        </button>
        {pago ? (
          <FormPostCheckout
            setPago={setPago}
            items={plants}
            totalAmount={sum}
            adress={currentUser.adress}
            name={currentUser.displayName}
            DNI={currentUser.DNI}
            city={currentUser.city}
            adressNumber={currentUser.adressNumber}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
