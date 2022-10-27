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
    const[activeSizeMini, setActiveSizeMini]= useState(false)
    const[activeSizeMedium, setActiveSizeMedium]= useState(false)
    const[activeSizeSmall, setActiveSizeSmall]= useState(false)
    const[activeSizeLarge, setActiveSizeLarge]= useState(false)
    const [filters, setFilters]= useState(["all", "all", "all", "all"])

   
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(FilterBy(filters))
      



    },[filters, dispatch])
    
  
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

function handleSizeMini() {
setActiveSizeMini(!activeSizeMini)
let arr=[...filters]
arr[1]="mini"
setFilters(arr)


}
function handleSizeMedium() {
    setActiveSizeMedium(!activeSizeMedium)
    let arr=[...filters]
arr[1]="medium"
setFilters(arr)
}
function handleSizeSmall() {
    setActiveSizeSmall(!activeSizeSmall)
    let arr=[...filters]
arr[1]="small"
setFilters(arr)

}
function handleSizeLarge() {
    setActiveSizeLarge(!activeSizeLarge)
    let arr=[...filters]
    arr[1]="large"
    setFilters(arr)
    
}

    return (
      <div className={s.container}>
            <div className={s.size_container}>
                <select name="" id="" className={s.select}>
                    <option value="">all sizes</option>
                    <option value="">mini</option>
                    <option value="">small</option>
                    <option value="">medium</option>
                    <option value="">large</option>
                


                </select>
                {/* <p className={s.size_title}>size</p>
                <div className={s.size}>
                    <button className={activeSizeMini?s.active_mini:s.size_btn} onClick={()=>handleSizeMini()}>mini</button>
                    <button className={activeSizeMedium?s.active_medium:s.size_btn} onClick={()=>handleSizeMedium()}>medium</button>
                    <button className={activeSizeSmall?s.active_small:s.size_btn} onClick={()=>handleSizeSmall()}>small</button>
                    <button className={activeSizeLarge?s.active_large:s.size_btn} onClick={()=>handleSizeLarge()}>large</button>
                </div> */}
               
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