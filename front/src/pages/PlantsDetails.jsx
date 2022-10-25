import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector}from "react-redux"
import { useParams } from 'react-router-dom';
import { GetProductDetails } from '../Redux/actions/products';

const PlantsDetails = () => {
    const dispatch= useDispatch()
    // const plant= useSelector((state)=>state.productsReducer.productDetails)
    // console.log(plant)

    const id= useParams()
  
    // useEffect(()=>{
    //     dispatch(GetProductDetails(id))

    // },[])
    return (
        <div>
        
        </div>
    );
};

export default PlantsDetails;