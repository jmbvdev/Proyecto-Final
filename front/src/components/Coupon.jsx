import React from "react";
import { useState } from "react";
import axios from "axios";
import s from "../styles/cart.module.css";
import { FaTicketAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function Coupon({ setDiscount }) {
  const [coup, setCoup] = useState("");

  function handleCoupon(e) {
    e.preventDefault();
    axios
      .get(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/coupons/${coup}`
      )
      .then((res) => {
        if (res.data?.discount) {
          setDiscount(res.data.discount);
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            iconColor: "white",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
          Promise.resolve(
            Toast.fire({
              icon: "error",
              title: `The coupon is invalid!`,
            })
          );
        }
      });
  }

  function handleOnChange(e) {
    e.preventDefault();
    setCoup(e.target.value);
  }

  return (
    <div className={s.coupon}>
      <input
        type="text"
        placeholder="DISCOUNT CODE"
        autoComplete="off"
        value={coup}
        onChange={handleOnChange}
      />
      <button onClick={handleCoupon}>Apply</button>
    </div>
  );
}

export default Coupon;
