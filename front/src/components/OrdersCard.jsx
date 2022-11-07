import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from "../styles/ordersUser.module.css"

const OrdersCard = (props) => {
    // console.log(props.date);
    const navigate = useNavigate()

    return (
        <div >
            {
                props.data.length === 0 ? null :
                
                    <div  >
                        <div className={s.date}>

                        <h3 className={s.state}> <strong>Order State:</strong> {props.state}</h3>
                        {
                            props.state === "Pending" ? <button onClick={() => navigate(`/cart`)} className={s.edit}>Edit</button> : null
                        }
                        <div className={s.date_container}>
                        <p>Date</p>
                            <div>
                            <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleDateString()}</span>
                        <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleTimeString()}</span>

                            </div>

                       
                        {
                            props.data.length > 0 && props.data.map(items => (
                                <div className={s.card}>
                                    <img src={items.image} alt="" className={s.order_image}/>
                                    <div className={s.specs}>

                                    <p>{items.name}</p>
                                    <p>count: {items.count}</p>
                                    <p>price: {items.price}</p>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                        </div>

                    </div >
            }
        </div >
    )
}

export default OrdersCard