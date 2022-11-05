import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import OrdersCard from '../components/OrdersCard';

import axios from 'axios';

const OrdersUser = () => {
    const currentUser = useSelector((state) => state.usersReducer.currentUser);
    const [state, setState] = useState([])
    const [aux, setAux] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
        dataState()
    }, [currentUser])

    const handleUserInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const dataState = async () => {
        if (currentUser) {
            let a = await axios.get(`https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${currentUser.uid}`)
            // console.log("ayuda",a);
            let result = a.data.map((item) => {
                return {
                    state: item.data.state,
                    userID: item.data.userID,
                    orderid: item.orderid,
                    date: item.data.date,
                    data: item.data.cart
                    // .map((item) => item.name)
                    // .filter((item) => item.name.toLowerCase().includes(name.toLowerCase())),
                }
            })
            // console.log("ayuda",result);
            // .then((res) => {
            //     setState(res.data)
            // })
            setState(result)
        }
        return dataState
    }

    const handleSearchName = async (e) => {
        if (name === "") {
            alert("Ingrese busqueda")
        } else if (name) {
            let a = await axios.get(`https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${currentUser.uid}`)
            let result = a.data.map((item) => {
                return {
                    state: item.data.state,
                    userID: item.data.userID,
                    orderid: item.orderid,
                    date: item.data.date,
                    data: item.data.cart
                        .filter((item) => item.name.toLowerCase().includes(name.toLowerCase())),
                }
            })
            // console.log("search", result);
            setState(result)
            setName("")
        }
    }
    // Pink Anthurium
    
    return (

        <div>
            <div>
                <input type="text" value={name} placeholder="Ingrese nombre..." onChange={e => handleUserInput(e)} />
                <button type="submit" onClick={e => handleSearchName(e)}>buscar</button>
            </div>

            {
                state.map(ord => (
                    <OrdersCard
                        orderid={ord.orderid}
                        state={ord.state}
                        userID={ord.userID}
                        date={ord.date}
                        data={ord.data}
                    />
                    ))
                }
        </div>

    )
}

export default OrdersUser