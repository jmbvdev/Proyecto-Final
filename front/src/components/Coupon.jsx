import React from "react";
import { useState } from "react";
import axios from "axios";

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
        } else window.alert("The coupon is invalid");
      });
  }

  function handleOnChange(e) {
    e.preventDefault();
    setCoup(e.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Do you have a discount code?"
        autoComplete="off"
        value={coup}
        onChange={handleOnChange}
      />
      <button onClick={handleCoupon}>Apply</button>
    </div>
  );
}

export default Coupon;
