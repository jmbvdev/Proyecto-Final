import React from "react";
import video from "../video/plants.mp4";
import s from "../styles/carousel.module.css";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll"
const Carousel = ({ isSearch }) => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <video src={video} autoPlay loop muted />
      <ScrollAnimation animateIn="fadeIn"   animateOnce={true} delay={600}  className={isSearch ? s.content_hyde : s.content}>
      <h1>Welcome</h1>
        <p>hope you enjoy your visit and find the right plant for you</p>
        <button className={s.shop_btn} onClick={() => navigate("/plants")}>
          SHOP NOW
        </button>
          </ScrollAnimation>
     
    </div>
  );
};

export default Carousel;
