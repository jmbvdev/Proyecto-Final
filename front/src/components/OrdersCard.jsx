import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveCart, updateCart } from '../Redux/actions/shopCart'
import Swal from "sweetalert2";
import s from "../styles/ordersUser.module.css"

const OrdersCard = (props) => {
    // console.log("props.data", props.data);
    const auxCart = [...props.data]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.usersReducer.currentUser);
    const cart = useSelector((state) => state.shopCartReducer.products);
    const allProducts = useSelector((state) => state.productsReducer.allProducts)
    // console.log(allProducts);
    // console.log("auxCart", auxCart);
    // console.log("cart", cart);

    const handleCreateSimilarOrder = () => {

        Swal.fire({
            title: 'Agregar la orden al carrito?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            denyButtonText: `No agregar`,
            allowOutsideClick: false,
            // allowEscapeKey: false
        }).then((result) => {

            if (result.isConfirmed) {
                console.log("paso1")
                // console.log("cart", cart)
                // console.log("auxCart", auxCart)
                let aux = []
                // console.log("aux",aux)
                cart.forEach((product) => {
                    // console.log("product.id", product.id)
                    auxCart.forEach(item => {
                        // console.log("item.id", item.id)
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
                console.log("paso2")
                let a = []
                let b = []

                // console.log("aux", aux);
                aux.forEach((item) => {
                    // console.log("iteracion", item.id)
                    allProducts.forEach((item2) => {
                        // console.log("iteracion2", item2.id)
                        if (item.id == item2.id) {
                            // console.log("item", item.id);
                            // console.log("item2", item2.id);
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
                console.log("paso3")
                // console.log("a", a)
                if (b.length > 0) {
                    console.log("paso5")


                    // const cartDef = [...a]
                    // console.log("cartDef", cartDef)
                    dispatch(saveCart(
                        a,
                        currentUser.uid))

                    props.updateOriginal(a)

                    Swal.fire({
                        icon: 'info',
                        text: `No contamos con las cantidades requeridas de las siguientes plantas, cargamos al carrito el stock en existencia: ${b.map(item => { return ` ${item.name}: ${item.count} ` })}`,
                    })

                } else {
                    console.log("paso4")


                    // const cartDef = [...a]
                    // console.log("cartDef", cartDef)
                    dispatch(saveCart(
                        a,
                        currentUser.uid))

                    props.updateOriginal(a)

                    Swal.fire({
                        icon: 'info',
                        text: `Orden agregada al carrito`,
                    })
                }

                // console.log("a", a);
                // console.log("b", b);

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