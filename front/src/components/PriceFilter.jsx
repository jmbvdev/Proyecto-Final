import React from 'react';
import { useState } from 'react';
import {MdOutlineAttachMoney} from "react-icons/md"
import {FaLongArrowAltDown,FaLongArrowAltUp} from "react-icons/fa"
import s from"../styles/priceFilter.module.css"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FilterBy, OrderBy } from '../Redux/actions/products';

const PriceFilter = () => {
   
    const[orderPrice, setOrderPrice]= useState(false)
    const [filters, setFilters]= useState(["all", "all", "all", "all"])

   
    const dispatch= useDispatch()

    useEffect(() => {
      dispatch(FilterBy(filters));
    }, [filters, dispatch]);
    
  
    function handleOrder() {
        if (orderPrice===true) {
           return "asc"
        }else{
            return "desc"
        }
    }

    function handleClick() {
        setOrderPrice(!orderPrice)
        dispatch(OrderBy(order))
     
        
    }
const order= handleOrder()

function handleSize(e) {
  let arr = [...filters];
  arr[1] = e.target.value;
  setFilters(arr);
}


    return (
      <div className={s.container}>
            <div className={s.size_container}>
                <select onChange={(e)=>handleSize(e)} name="" id="" className={s.select}>
                    <option value="all">all sizes</option>
                    <option value="mini">mini</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                


                </select>
               
             </div>
               <div className={s.price} onClick={()=>handleClick()}>
                <MdOutlineAttachMoney className={s.price_icon}/>
               {
                orderPrice? <FaLongArrowAltUp  className={s.direction_icon}/>:< FaLongArrowAltDown  className={s.direction_icon}/>
               }
                

               </div>
      </div>
    );
};

export default PriceFilter;