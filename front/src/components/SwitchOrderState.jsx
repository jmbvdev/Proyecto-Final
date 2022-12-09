import React, { useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import s from "../styles/switchOrder.module.css"
import { TbSwitch3 } from 'react-icons/tb';
import { FaWindowClose } from 'react-icons/fa';


const stateAll = ["Order preparing", "Order shipped", "Order ready to pick up"]

const SwitchOrderState = ({ order, orders, auxOrders, setOrder, setAuxOrders, close }) => {
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
      close(false)
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
      <div className={s.container}>
         <div className={s.close} onClick={handleDeleteState}>
            <FaWindowClose className={s.close_icon}/>
          </div>
        {current_order ? (
          <div>
            <div className={s.state_wraper}>
            <div>

            <p>
              <strong>SwitchOrderState</strong>
            </p>
            <p>
              <strong>orderId:</strong> {current_order?.orderId}
            </p>
            <p>
              <strong>date: </strong>{" "}
              {new Date(current_order?.date).toLocaleDateString()}
            </p>
            <p>
              <strong>time: </strong>{" "}
              {new Date(current_order?.date).toLocaleTimeString()}
            </p>
            <p>
              <strong>userID: </strong> {current_order?.userID}
            </p>
            <p>
              <strong>User name: </strong> {current_order?.user.displayName}
            </p>
            <p>
              <strong>User email: </strong> {current_order?.user.email}
            </p>
            <p>
              <strong>City:</strong> {current_order?.extras?.city}
            </p>
            <p>
              <strong>Address:</strong> {current_order?.extras?.adress}
            </p>
            <p>
              <strong>Address number:</strong>{" "}
              {current_order?.extras?.adressNumber}
            </p>
            </div>
            <div className={s.state_container}>
                <h3>{current_order?.state}</h3>
            <div className={s.order}>
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
                <div className={s.state}>
                  <button type="button" onClick={handleDeleteState}>
                    x
                  </button>
                  <p>{optionState}</p>
                </div>
              ) : null}
            </div>
            <div className={s.switch} onClick={handleSwitchState}>
             <TbSwitch3 className={s.switch_icon}/>
             <span>STATE</span>
            </div>
           

            </div>
                </div>
            

            <hr></hr>
            <div className={s.wrap}>

            {current_order?.cart.map((order, i) => (
              <div key={i} className={s.specs_container}>
                <div className={s.image}>
                  <img src={order?.image} alt="" height="50" />
                </div>
                <div className={s.specs}>
                  <p>
                    {" "}
                    <strong>Name:</strong> {order?.name}
                  </p>
                  <p>
                    <strong>productId:</strong> {order?.id}
                  </p>
                  <p>
                    <strong>count:</strong> {order?.count}
                  </p>
                  <p>
                    <strong>price:</strong> ${order?.price}
                  </p>
                </div>
          
                
              </div>
            ))}
            </div>
            <h3>Total Amount: ${current_order?.extras?.totalAmount}</h3>
            <hr></hr>
            <h3>sendOption: {current_order?.extras?.sendOption}</h3>
            <hr></hr>
          </div>
        ) : null}
      </div>
    );
}

export default SwitchOrderState