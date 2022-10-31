import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import img from "../images/popular.webp"
import { GetAllProducts } from '../Redux/actions/products';
import s from "../styles/popularPlants.module.css"


const PopularPlants = () => {
    const navigate= useNavigate()
    const allPlants = useSelector(
        (state) => state.productsReducer.productsBackUp
      );
      const plants = allPlants.slice(26, 29);
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(GetAllProducts());
      }, []);
    
    return (
      <div className={s.popular}>
        <img src={img} className={s.image} alt="plant" />
        <h3 className={s.title}>Most Popular</h3>
        <div className={s.list}>
          {plants.map((plant) => {
            return (
              <div className={s.container_card}>
                <div className={s.card}>
                  <div className={s.card_overlay}>
                    <button
                      onClick={() =>
                        navigate(`/plants/details/${plant.id}`)
                      }
                    >
                      more details
                    </button>
                  </div>
                  <img
                    src={plant.data?.image}
                    alt="img"
                  />
                  <div className={s.specs}>
                    <p>{plant.data?.name}</p>
                    <b>${plant.data?.price}</b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default PopularPlants;