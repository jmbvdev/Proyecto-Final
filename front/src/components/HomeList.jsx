import React from "react";
import s from "../styles/homeList.module.css";
import CardHome from "./CardHome";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts } from "../Redux/actions/products";
import ScrollAnimation from 'react-animate-on-scroll';

const HomeList = () => {
  const allPlants = useSelector(
    (state) => state.productsReducer.productsBackUp
  );
  const plants = allPlants.slice(0, 8);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProducts());
  }, []);

  const handleScroll = () => {
    window.scrollTo(0, {behavior: 'smooth'})
  }

  return (
    <>
       <ScrollAnimation animateIn="fadeInDown" animateOnce={true} >
 
      <h3 className={s.title}>All Plants</h3>
            </ScrollAnimation>
      <div className={s.container}>
        <div className={s.list}>
          {plants.map((plant) => (
             <ScrollAnimation animateIn="fadeInUp" key={plant.id} animateOnce={true} >
 
          
               <CardHome  plant={plant} />
                   </ScrollAnimation>
          ))}
        </div>
      </div>
      <ScrollAnimation animateIn="fadeInDown" animateOnce={true} className={s.show}>
        <Link className={s.show_a} to="/plants"><button onClick={handleScroll}>
          show all <AiOutlineRight className={s.show_arrow} />
          </button>
        </Link>
    

       </ScrollAnimation>
    </>
  );
};

export default HomeList;
