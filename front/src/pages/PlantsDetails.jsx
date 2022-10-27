import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector}from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
import { GetProductDetails } from '../Redux/actions/products';
import {GiTable} from "react-icons/gi"
import {TbPlant2} from "react-icons/tb"
import {FaDog} from "react-icons/fa"
import s from "../styles/details.module.css"
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { addProduct } from '../Redux/actions/shopCart';
import Loading from '../components/Loading';


const PlantsDetails = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const plant= useSelector((state)=>state.productsReducer.productDetails.data)
    const [isLoading, setIsLoading]= useState(true)
    
     const id= useParams().id
  
const [quantity, setQuantity]= useState(1)
    useEffect(()=>{
    
        dispatch(GetProductDetails(id))
        .then(()=>{setIsLoading(false)})
 
    },[dispatch,id])

 


function handleCart() {
   dispatch(addProduct({id, image: plant.image, price: plant.price, name: plant.name, stock: plant.stock}))
    
}
        


    return (
        <>
        {
            isLoading?<Loading/>:
            <div className={s.container}>
            <img src={plant?.image} alt="" />
            <div className={s.details}>
             <h1>{plant?.name} </h1>
             <div>
                 <h4>Description</h4>
                 <p>{plant?.details}</p>
             </div>
             <div className={s.categories}>
                     {
                         plant.categories.map(p=>{
                             return (
                             
                             <div className={s.categories_container}>
                             {p.includes("tabletop")?<GiTable className={s.table}/>:p.includes("pet friendly")?<FaDog className={s.table}/>:p.includes("easy care")&&<TbPlant2 className={s.table}/>}
                             <span>{p.includes("tabletop")?"TABLETOP":p.includes("pet friendly")?"PET FRIENDLY": p.includes("easy care")&&"EASY CARE"}</span>                      
                               </div>
                         );
                        })
                     }
                     
             </div>
             <div className={s.price}>
                 <div>
                     <h4>Price</h4>
                     <h3>$ {plant?.price}</h3>
                 </div>
                 <div className={s.quantity}>
                     <button onClick={()=>setQuantity(quantity-1)}>-</button>
                     <p>{quantity<1?0:quantity}</p>
                     <button onClick={()=>setQuantity(quantity+1)}>+</button>
                 </div>
 
             </div>
             <div className={s.favorites}>
                 <h4>Add to favorites</h4>
                 <button><AiFillHeart className={s.hearth}/></button>
             </div>
 
 
 
            <button onClick={handleCart} className={s.cart}>Add to Cart</button>
            </div>
         
         </div>
       
        }
        </>
      
           
        
    );
};

export default PlantsDetails;