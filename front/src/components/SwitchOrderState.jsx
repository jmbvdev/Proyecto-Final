import React, { useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";


const stateAll = ["Order preparing", "Order shipped", "Order ready to pick up"]

const SwitchOrderState = ({ order, orders, auxOrders, setOrder, setAuxOrders }) => {
    // "order" it is orderId
    const current_order = orders.find(item => item.orderId == order)
    const [optionState, setOptionState] = useState('')

    const handleState = (e) => {
        if (e.target.value !== "select") {
            setOptionState(e.target.value);
        }
    };
    const handleDeleteState = () => {
        setOptionState("");
    };

    const handleSwitchState = () => {
        if (optionState === "") {
            Swal.fire('I did not choose any status option', '', 'success')
        } else {

            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
                allowOutsideClick: false,

            }).then((result) => {

                if (result.isConfirmed) {
                    Swal.fire('Wait a moment it is processing', '', 'success')
                    axios
                        .put(
                            //id order
                            `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${order}`,
                            {
                                cart: current_order.cart,
                                state: optionState,
                                extras: "",
                                email: current_order.user.email,
                            }
                        )
                        .then((res) => {
                            let aux = [];
                            auxOrders.forEach((order) => {
                                if (order.orderId == current_order.orderId) {
                                    aux.push({
                                        ...order,
                                        state: optionState,
                                    });
                                } else {
                                    aux.push(order);
                                }
                            });
                            console.log(aux);
                            setAuxOrders(aux);
                            setOptionState("");
                            Swal.fire(`${res.data}`, "", "success");
                            // setOrder('')
                        });

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')

                }
            })
        }
    }

    const handleCancel = () => {
        setOptionState("")
        setOrder('')
    }

    return (

        <div>
            {
                current_order ? (
                    <div>
                        <h3>SwitchOrderState</h3>
                        <h3>orderId:  {current_order?.orderId}</h3>
                        <h3>date:  {(new Date(current_order?.date)).toLocaleDateString()}</h3>
                        <h3>time:  {(new Date(current_order?.date)).toLocaleTimeString()}</h3>
                        <h3>userID:  {current_order?.userID}</h3>
                        <h3>User name:  {current_order?.user.displayName}</h3>
                        <h3>User email:  {current_order?.user.email}</h3>
                        <h3>City: {current_order?.extras?.city}</h3>
                        <h3>Address: {current_order?.extras?.adress}</h3>
                        <h3>Address number: {current_order?.extras?.adressNumber}</h3>
                       
                        <hr></hr>
                        {
                            current_order?.cart.map((order, i) => (
                                <div key={i}>
                                    <h3>Name: {order?.name}</h3>
                                    <img src={order?.image} alt="" height="50" />
                                    <h3>productId: {order?.id}</h3>
                                    <h3>count: {order?.count}</h3>
                                    <h3>price: ${order?.price}</h3>
                                    <hr></hr>
                                </div>
                            ))
                        }
                        <h3>Total Amount: {current_order?.extras?.totalAmount}</h3>
                        <hr></hr>
                        <h3>sendOption: {current_order?.extras?.sendOption}</h3>
                        <hr></hr>
                        <h3>{current_order?.state}</h3>
                        <div>
                            <select onChange={handleState}>
                                <option value="select">state</option>
                                {stateAll.map((el, i) => (
                                    <option key={i} value={el}>
                                        {el}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            {optionState ? (
                                <div>
                                    <button type="button" onClick={handleDeleteState}>
                                        x
                                    </button>
                                    <p>{optionState}</p>
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <button type="button" onClick={handleSwitchState}>
                                Switch State
                            </button>
                        </div>
                        <div>
                            <button type="button" onClick={handleCancel}>
                                {optionState == '' ? 'Cancel' : 'Finalize'}
                            </button>
                            <br></br>
                        </div>
                    </div>
                ) : (null)
            }
        </div>
    )
}

export default SwitchOrderState