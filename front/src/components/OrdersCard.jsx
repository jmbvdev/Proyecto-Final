import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import OrdersUser from '../pages/OrdersUser'
import { saveCart } from '../Redux/actions/shopCart'
import s from "../styles/ordersUser.module.css"

const OrdersCard = (props) => {
    // console.log(props.data);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.usersReducer.currentUser);
    const cart = useSelector((state) => state.shopCartReducer.products);

    useEffect(() => {
        console.log("cart", cart)
    }, [cart, dispatch])

    const handleCreateSimilarOrder = async () => {
        try {
            props.data.forEach((product) => {
                dispatch(saveCart(
                    [
                        ...cart,
                        {
                            id: product.id,
                            image: product.image,
                            price: product.price,
                            name: product.name,
                            stock: product.stock,
                            count: product.count,
                        }
                    ],
                    currentUser.uid))
            })
            // return redirect(`/orders/${currentUser.uid}`)
            setInterval("location.reload()",10);
        } catch (error) {

        }

    }


    return (
        <div >
            {
                props.data.length === 0 ? null :

                    <div>
                        <div className={s.date}>

                            <h3 className={s.state}> <strong>Order State:</strong> {props.state}</h3>
                            {
                                props.state === "Pending" ? <button onClick={() => navigate(`/cart`)} className={s.edit}>Edit</button> : null
                            }
                            {
                                props.state === "Order approved" ? <button onClick={handleCreateSimilarOrder}> Crear orden similar</button> : null

                            }
                            <div className={s.date_container}>
                                <p>Date</p>
                                <div>
                                    <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleDateString()}</span>
                                    <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleTimeString()}</span>
                                </div>

                                {
                                    props.data.length > 0 && props.data.map(items => (
                                        <div className={s.card} key={items.id}>
                                            <img src={items.image} alt="" className={s.order_image} />
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