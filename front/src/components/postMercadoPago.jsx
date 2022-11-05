import React, { useReducer } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { purchase } from "../Redux/actions/shopCart";
import success from "../images/success.webp"
import pending from "../images/pending.webp"
import s from "../styles/postMercado.module.css"

export default function PostMercadoPago() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const payment_id = searchParams.get("payment_id");
  const payment_type = searchParams.get("payment_type");
  const cart = useSelector((state) => state.shopCartReducer.products);
  const user = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      cart.length > 0 &&
      user &&
      (status === "approved" || status === "in_process")
    ) {
      dispatch(purchase(cart[0].orderID, cart, status, user.email));
    }
  }, [cart, dispatch, status, user]);

  const goHome = (e) => {
    e.preventDefault();

    navigate("/");
  };
  if (status === "approved" || status === "in_process") {
  return (
    <div className={s.container}>
      <div className={s.wraper}>
       
          {status === "aproved" ? (
             <div className={s.image}>
            <img src={success} alt="" />
            </div>
          ) : (
            <div className={s.image}>
            <img src={pending} alt="" />
            </div>
          )}
   
        <div className={s.specs}>
          <h4 >YOUR PURCHASE ARE {status}.</h4>
          <p>
            The payment id is {payment_id}.
          </p>
          <p> The payment method was:
            {payment_type}</p>
          <p>Total Amount: </p>
          <div className={s.back}>

          <button onClick={goHome} >GO BACK TO HOME</button>
          </div>
        </div>
      </div>
    </div>
  );
}  else {
  return (
    <div>
      <p>FAILURE</p>
      <h1>Thank you so much for buying at Calathea.</h1>
      <h3>YOUR PURCHASE WAS {status}</h3>
      <p>
        We are sorry but it has failed for some reason. Meanwhile, we save
        your cart so you can try to purchase it in another ocasion.
      </p>
      <button onClick={goHome}>GO BACK TO HOME</button>
    </div>
  );
}
}

