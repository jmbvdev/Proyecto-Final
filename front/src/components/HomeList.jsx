import React from 'react';
import s from "../styles/homeList.module.css"
import CardHome from './CardHome';
import { AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts } from '../Redux/actions/products';

const HomeList = () => {
  
  const allPlants = useSelector(state=>state.productsReducer.allProducts)
  const plants= allPlants.slice(0,8)
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(GetAllProducts())
  },[])

  
    return (
      <>
        <h3 className={s.title}>All Plants</h3>
        <div className={s.container}>
          <div className={s.list}>
            {plants.map((plant) => (
              <CardHome key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
        <div className={s.show}>
          <Link className={s.show_a} to="/plants">
            show all <AiOutlineRight className={s.show_arrow} />
          </Link>
        </div>
      </>
    );
};

export default HomeList;