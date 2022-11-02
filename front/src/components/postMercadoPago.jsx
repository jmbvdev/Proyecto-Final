import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { purchase } from "../Redux/actions/shopCart";

export default function PostMercadoPago() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const payment_id = searchParams.get("payment_id");
  const payment_type = searchParams.get("payment_type");
  const cart = useSelector((state) => state.shopCartReducer.products);
  const dispatch = useDispatch();
  useEffect(() => {
    //sendEMAIL NOTIFICATION
    if (cart.length > 0) {
      dispatch(purchase(cart[0].orderID, cart, status));
    }
  }, [cart]);

  const goHome = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div>
      <p>
        Juanma inserta una imagen dependiendo de si el estado es aproved o
        pending
      </p>
      <h1>Thank you so much for buying at Calathea.</h1>
      <h3>YOUR PURCHASE ARE {status}</h3>
      <p>
        The payment id is {payment_id}. The payment method was: {payment_type}
      </p>
      <p>Total Amount: todavia nada pero ya voy a ver como se lo mando</p>
      <button onClick={goHome}>GO BACK TO HOME</button>
    </div>
  );
}
