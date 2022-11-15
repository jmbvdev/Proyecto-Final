import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveCart, updateCart } from '../Redux/actions/shopCart'
import Swal from "sweetalert2";
import s from "../styles/ordersUser.module.css"

const OrdersCard = (props) => {

    const auxCart = [...props.data]
    console.log("auxCart", auxCart)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.usersReducer.currentUser);
    const cart = useSelector((state) => state.shopCartReducer.products);
    const allProducts = useSelector((state) => state.productsReducer.allProducts)
    console.log("cart", cart)
    const handleCreateSimilarOrder = () => {
        Swal.fire({
            title: 'Add order to cart?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Add',
            denyButtonText: `Do not add`,
            allowOutsideClick: false,
        }).then((result) => {

            if (result.isConfirmed) {
                let a = []
                let b = []
                // console.log("cart", cart);
                // console.log("auxCart", auxCart)

                if (cart.length === 0) {
                    let result = []
                    auxCart.forEach((item) => {
                        allProducts.forEach((product) => {
                            if (item.id === product.id) {
                                if (item.count > product.data.stock) {
                                    result.push({
                                        ...item,
                                        stock: product.data.stock,
                                        count: product.data.stock,
                                    })
                                    b.push({
                                        name: item.name,
                                        count: product.data.stock
                                    })
                                } else {
                                    result.push({
                                        ...item,
                                        stock: product.data.stock,
                                    });
                                }
                            }
                        })
                    })
                    a = [...result]
                    a[0] = {
                        count: result[0].count,
                        id: result[0].id,
                        image: result[0].image,
                        name: result[0].name,
                        price: result[0].price,
                        stock: result[0].stock,
                    }
                } else {
                    let result = []
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

                    aux.forEach((item) => {
                        allProducts.forEach((product) => {
                            if (item.id === product.id) {
                                if (item.count > product.data.stock) {
                                    result.push({
                                        ...item,
                                        count: product.data.stock,
                                        stock: product.data.stock,
                                    })
                                    b.push({
                                        name: item.name,
                                        count: product.data.stock
                                    })
                                } else {
                                    result.push({
                                        ...item,
                                        stock: product.data.stock,
                                    });
                                }
                            }
                        })
                    })
                    a = [...result]
                    a[0] = {
                        count: result[0].count,
                        id: result[0].id,
                        image: result[0].image,
                        name: result[0].name,
                        price: result[0].price,
                        stock: result[0].stock,
                    }
                }

                console.log("a", a)

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
                                props.state === "Order approved" ? <button onClick={handleCreateSimilarOrder} className={s.edit}>Order repeat</button> : null
                            }
                            <div className={s.date_container}>
                                <p>Date</p>
                                <div>
                                    <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleDateString()}</span>
                                    <span>{(new Date(props.date?._seconds * 1000 + props.date._nanoseconds / 1000000)).toLocaleTimeString()}</span>
                                </div>

                            </div>
                            <div className={s.card_list}>

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