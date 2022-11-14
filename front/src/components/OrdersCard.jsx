import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveCart, updateCart } from '../Redux/actions/shopCart'
import Swal from "sweetalert2";
import s from "../styles/ordersUser.module.css"

const OrdersCard = (props) => {

    const auxCart = [...props.data]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.usersReducer.currentUser);
    const cart = useSelector((state) => state.shopCartReducer.products);
    const allProducts = useSelector((state) => state.productsReducer.allProducts)

    const handleCreateSimilarOrder = () => {
        Swal.fire({
            title: 'Add order to cart?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Add',
            denyButtonText: `Do not add`,
            allowOutsideClick: false,
        }).then((result) => {

            if (result.isConfirmed) {
                let aux = []
                cart.forEach((product) => {
                    auxCart.forEach(item => {
                        if (product.id === item.id) {
                            aux.push({
                                ...product,
                                count: product.count + item.count
                            })
                        }
                    })
                })

                let auxId = []
                aux.forEach((item) => {
                    auxId.push(item.id)
                })
                cart.forEach(item => {
                    if (!auxId.includes(item.id)) {
                        aux.push(item)
                    }
                })

                let aux2 = []
                aux.forEach((item) => {
                    aux2.push(item.id)
                })
                auxCart.forEach(item => {
                    if (!aux2.includes(item.id)) {
                        aux.push(item)
                    }
                })

                let a = []
                let b = []

                aux.forEach((item) => {
                    allProducts.forEach((item2) => {
                        if (item.id == item2.id) {
                            if (item.count > item2.data.stock) {
                                a.push({
                                    ...item,
                                    count: item2.data.stock
                                })
                                b.push({
                                    name: item.name,
                                    count: item2.data.stock
                                })
                            } else {
                                a.push(item);
                            }
                        }
                    });
                });
                if (b.length > 0) {
                    dispatch(saveCart(
                        a,
                        currentUser.uid))
                    props.updateOriginal(a)

                    Swal.fire({
                        icon: 'info',
                        text: `We do not have the required quantities of the following plants. We load the stock in existence to the cart: ${b.map(item => { return ` ${item.name}: ${item.count} ` })}`,
                    })

                } else {

                    dispatch(saveCart(
                        a,
                        currentUser.uid))
                    props.updateOriginal(a)

                    Swal.fire({
                        icon: 'info',
                        text: `Order added to cart`,
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')

            }
        })
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
                                props.state === "Order approved" ? <button onClick={handleCreateSimilarOrder}>Order repeat</button> : null
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