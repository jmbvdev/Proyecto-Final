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
        
    // const plant={
    //     "details": "Take a closer look at the Arrowhead White Butterfly, and you’ll find that its leaves actually feature marbling in a variety of vibrant green shades. You can showcase this unique variegation by training your Syngonium podophyllum to climb trellises and ladder stands in the same way it climbs trees in its native rainforests!",
    //     "type": "plant",
    //     "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F1cjkxqu3hsoGzNtU9bQm.webp?alt=media&token=c4a2dabb-e5af-4a3e-8373-d508a621ea3b",
    //     "price": 78,
    //     "categories": [
    //         "tabletop",
    //         "pet friendly"
    //     ],
    //     "stock": 10,
    //     "planter": "Grant",
    //     "name": "Arrowhead White Butterfly",
    //     "size": [
    //         "small",
    //         "medium",
    //         "large"
    //     ]
    // }
if (isLoading) {
    return <h1>Loading</h1>
}

    return (
        
      
            <div className={s.container}>
           <img src={plant?.image} alt="" />
           <div className={s.details}>
            <h1>{plant?.name} </h1>
            <div>
                <h4>Description</h4>
                <p>{plant?.details}</p>
            </div>
            <div className={s.categories}>
                <div className={s.categories_container}>
                    {plant?.categories[0]==="tabletop"?   <GiTable className={s.table}/>:plant?.categories[0]==="pet friendly"? <FaDog className={s.table}/>:<TbPlant2 className={s.table}/>}
                <span>{plant?.categories[0]==="tabletop"?"TABLETOP":plant?.categories[0]==="pet friendly"? "PET FRIENDLY":"EASY CARE"}</span>
                </div>
                <div className={s.categories_container}>
                    {plant?.categories[1]&&plant?.categories[1]==="tabletop"?   <GiTable className={s.table}/>:plant?.categories[1]&&plant?.categories[1]==="pet friendly"? <FaDog className={s.table}/>:<TbPlant2 className={s.table}/>}
                <span>{plant?.categories[1]&&plant?.categories[1]==="tabletop"?"TABLETOP":plant?.categories[1]&&plant?.categories[1]==="pet friendly"? "PET FRIENDLY":"EASY CARE"}</span>
                </div>
                <div className={s.categories_container}>
                    {plant?.categories[2]&&plant?.categories[2]==="tabletop"?   <GiTable className={s.table}/>:plant?.categories[2]&&plant.categories[2]==="pet friendly"? <FaDog className={s.table}/>:<TbPlant2 className={s.table}/>}
                <span>{plant?.categories[2]&&plant?.categories[2]==="tabletop"?"TABLETOP":plant?.categories[2]&&plant?.categories[2]==="pet friendly"? "PET FRIENDLY":"EASY CARE"}</span>
                </div>
               
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
      
        
    );
};

export default PlantsDetails;