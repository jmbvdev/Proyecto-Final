import React from "react";
import image from "../images/calatea.webp";
import s from "../styles/foundPlants.module.css";
import { useDispatch } from "react-redux";
import { GetAllProducts } from "../Redux/actions/products/index.js";

const EmptyPlant = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.container}>
      <img src={image} alt="" />
      <h2>{message}</h2>
      <button
        onClick={() => {
          dispatch(GetAllProducts());
        }}
      >
        Click To Reset Filters
      </button>
    </div>
  );
};

export default EmptyPlant;
