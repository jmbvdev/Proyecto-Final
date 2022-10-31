import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../images/404.webp"
import s from "../styles/error.module.css"

export default function NotFound() {
  const navigate = useNavigate();
  function handleOnClick(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className={s.container}>
      <img src={image} alt="" />
      <h2>Sorry, we dont found what you were looking for</h2>
      <button onClick={handleOnClick}>GO BACK HOME</button>
    </div>
  );
}
