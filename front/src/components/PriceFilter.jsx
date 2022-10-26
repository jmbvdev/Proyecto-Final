import React from 'react';
import { useState } from 'react';
import {MdOutlineAttachMoney} from "react-icons/md"
import {FaLongArrowAltDown,FaLongArrowAltUp} from "react-icons/fa"
import s from"../styles/priceFilter.module.css"

const PriceFilter = () => {
   
    const[orderPrice, setOrderPrice]= useState(false)
    const[activeSizeMini, setActiveSizeMini]= useState(false)
    const[activeSizeMedium, setActiveSizeMedium]= useState(false)
    const[activeSizeSmall, setActiveSizeSmall]= useState(false)
    const[activeSizeLarge, setActiveSizeLarge]= useState(false)
  
    function handleOrder() {
        if (orderPrice===true) {
           return "asc"
        }else{
            return "desc"
        }
    }

    function handleClick() {
        setOrderPrice(!orderPrice)
    }
const order= handleOrder()
function handleSizeMini() {
setActiveSizeMini(!activeSizeMini)
}
function handleSizeMedium() {
    setActiveSizeMedium(!activeSizeMedium)
}
function handleSizeSmall() {
    setActiveSizeSmall(!activeSizeSmall)
}
function handleSizeLarge() {
    setActiveSizeLarge(!activeSizeLarge)
}

    return (
      <div className={s.container}>
            <div className={s.size_container}>
                <p className={s.size_title}>size</p>
                <div className={s.size}>
                    <button className={activeSizeMini?s.active_mini:s.size_btn} onClick={()=>handleSizeMini()}>mini</button>
                    <button className={activeSizeMedium?s.active_medium:s.size_btn} onClick={()=>handleSizeMedium()}>medium</button>
                    <button className={activeSizeSmall?s.active_small:s.size_btn} onClick={()=>handleSizeSmall()}>small</button>
                    <button className={activeSizeLarge?s.active_large:s.size_btn} onClick={()=>handleSizeLarge()}>large</button>
                </div>
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