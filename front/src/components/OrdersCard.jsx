import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrdersCard = (props) => {
 
    const navigate = useNavigate()

    return (
        <div>
          

            <h1>State</h1>
            <h3>{props.state}</h3>
            {
                props.state === "Pending" ? <button onClick={() => navigate(`/cart`)}>Edit</button> : null
            }
            <h1>Date</h1>
            <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleDateString()}</span>
            <br />
            <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleTimeString()}</span>


            <h2>Order</h2>
            {
                props.data.length > 0 && props.data.map(items => (
                    <div>
                        <h2>name: {items.name}</h2>
                        <h2>count: {items.count}</h2>
                        <h2>price: {items.price}</h2>
                        <img src={items.image} alt="" width="200" />
                    </div>
                ))
            }
        </div>
    )
}

export default OrdersCard