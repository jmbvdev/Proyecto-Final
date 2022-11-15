import React from "react";
import s from "../styles/plants.module.css";
import logo from "../images/logo-sinfondo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAllProducts } from "../Redux/actions/products";
import Card from "../components/Card";
import Loading from "../components/Loading";
import FiltersComponents from "../components/FiltersComponents";
import EmptyPlant from "../components/EmptyPlant";
import ScrollAnimation from 'react-animate-on-scroll';


const Plants = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plants = useSelector((state) => state.productsReducer.allProducts);

  useEffect(() => {
    if (!plants[0]) {
      dispatch(GetAllProducts());
      window.scrollTo(0, {
        behavior: 'smooth'
      })
    }
  }, [plants, dispatch]);

  return (
    <>
      {plants?.length ? (
        plants[0].hasOwnProperty("message") ? (
          <EmptyPlant message={plants[0].message}/>
        ) : (
          <div className={s.plants}>
            
            <div className={s.banner}>
            <ScrollAnimation animateIn="fadeIn" animateOnce={true} className={s.banner}>
              
              <img src={logo} loading="lazy" alt="" />
              <button
                className={s.contact}
                onClick={() => navigate("/contact")}
              >
                CONTACT US
              </button>
              </ScrollAnimation>
            </div>
            <div className={s.list_container}>
              <div className={s.list_title}>
              <ScrollAnimation animateIn="fadeInUp" animateOnce={true} animateOut="fadeOut" className={s.filters_container}>
                  <FiltersComponents />
              

              </ScrollAnimation>
                <h3 className={s.title}>All Plants</h3>
                <div className={s.list}>
                  {plants.map((plant) => (
                     <ScrollAnimation animateIn="fadeInUp" animateOnce={true} key={plant.id} >
 
                 
                       <Card  id={plant.id} plant={plant.data} />
                           </ScrollAnimation>
                  ))}
                </div>
              </div>
            </div>
           
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Plants;
