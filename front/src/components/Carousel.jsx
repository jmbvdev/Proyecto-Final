import React from "react";
import video from "../video/plants.mp4";
import s from "../styles/Carousel.module.css";

const Carousel = () => {
  return (
    <div className={s.container}>
      <video src={video} autoPlay loop muted />

      <div className={s.content}>
        <h1>Welcome</h1>
        <p>hope you enjoy your visit and find the right plant for you</p>
        <button className={s.shop_btn}>SHOP NOW</button>
      </div>
    </div>
  );
};

export default Carousel;
