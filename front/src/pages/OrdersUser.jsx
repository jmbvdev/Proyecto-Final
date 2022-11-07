import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import OrdersCard from '../components/OrdersCard';

import axios from 'axios';

const OrdersUser = () => {
    const currentUser = useSelector((state) => state.usersReducer.currentUser);
    const [state, setState] = useState([])
    const [aux, setAux] = useState([])
    const [original, setOriginal] = useState([])
    const [name, setName] = useState("")
    const [orden, setOrden] = useState("")

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
            let result = a.data.map((item) => {
                return {
                    state: item.data.state,
                    userID: item.data.userID,
                    orderid: item.orderid,
                    date: item.data.date,
                    data: item.data.cart
                }
            })
            setState(result)
            setAux(result)
            setOriginal([...result])
        }
        return dataState
    }

    const handleSearchName = async (e) => {
        if (name === "") {
            alert("Enter name")
        } else if (name) {
            let result = aux.map((item) => {
                return {
                    state: item.state,
                    userID: item.userID,
                    orderid: item.orderid,
                    date: item.date,
                    data: item.data
                        .filter((item) => item.name.toLowerCase().includes(name.toLowerCase())),
                }
            })
            setState(result)
            setName("")
        }
    }

    const handleOrderByDate = (e) => {
        let orderDate = e.target.value === "des" ?
            state.sort((a, b) => {
                if (a.date._seconds > b.date._seconds) {
                    return 1
                }
                if (a.date._seconds < b.date._seconds) {
                    return -1
                }
                return 0
            }) :
            state.sort((a, b) => {
                if (a.date._seconds > b.date._seconds) {
                    return -1
                }
                if (a.date._seconds < b.date._seconds) {
                    return 1
                }
                return 0
            })
        setState(orderDate)
        setOrden(`${e.target.value}`)
    }
    
    return (

        <div>
            <div>
                <input type="text" value={name} placeholder="Enter name..." onChange={e => handleUserInput(e)} />
                <button type="submit" onClick={e => handleSearchName(e)}>Search</button>
            </div>

            <div>
                <select onChange={e => handleOrderByDate(e)}>
                    <option value="">Order date</option>
                    <option value="asc">asc</option>
                    <option value="des">des</option>
                </select>
                <div>
                    <button onClick={() => setState([...original])}>Reset</button>
                </div>
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
        </div >
    )
}

export default OrdersUser