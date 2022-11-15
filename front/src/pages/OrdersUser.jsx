import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersCard from "../components/OrdersCard";
import s from "../styles/ordersUser.module.css";
import image from "../images/designplant.webp";

import axios from "axios";
import { BiReset } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { updateCart } from "../Redux/actions/shopCart";

const OrdersUser = () => {
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const [state, setState] = useState([]);
  const [aux, setAux] = useState([]);
  const [original, setOriginal] = useState([]);
  const [name, setName] = useState("");
  const [orden, setOrden] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const dataState = async () => {
      try {
        if (!currentUser) {
          throw "no existe usuario"
        }
        let a = await axios.get(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/${currentUser.uid}`
        );
        let result = a.data.map((item) => {
          return {
            state: item.data?.state,
            userID: item.data?.userID,
            orderid: item?.orderid,
            date: item.data?.date,
            data: item.data?.cart,
          };
        });
        setState(result);
        setAux(result);
        setOriginal([...result]);
      } catch (error) {
        console.error(error)
      }

    };
    dataState()
  }, [currentUser]);

  const handleUserInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };


  const handleSearchName = async (e) => {
    if (name === "") {
      alert("Enter name");
    } else if (name) {
      let result = aux.map((item) => {
        return {
          state: item.state,
          userID: item.userID,
          orderid: item.orderid,
          date: item.date,
          data: item.data.filter((item) =>
            item.name.toLowerCase().includes(name.toLowerCase())
          ),
        };
      });
      setState(result);
      setName("");
    }
  };

  const handleOrderByDate = (e) => {
    let orderDate =
      e.target.value === "des"
        ? state.sort((a, b) => {
          if (a.date._seconds > b.date._seconds) {
            return 1;
          }
          if (a.date._seconds < b.date._seconds) {
            return -1;
          }
          return 0;
        })
        : state.sort((a, b) => {
          if (a.date._seconds > b.date._seconds) {
            return -1;
          }
          if (a.date._seconds < b.date._seconds) {
            return 1;
          }
          return 0;
        });
    setState(orderDate);
    setOrden(`${e.target.value}`);
  };

  const updateOriginal = (newproducts) => {

    const auxiliar = original.map(item => {
      if (item.state === "Pending") {
        return {
          ...item,
          data: newproducts
        }
      } else {
        return item
      }
    })
    dispatch(updateCart(newproducts))
    setOriginal([...auxiliar])
    setState([...auxiliar])
  }

  // console.log("state", state)

  return (
    <div className={s.main}>
      <div className={s.favorites}>
        <div
          className={s.left}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className={s.right}>
          <div className={s.input_container}>
            <div className={s.search}>
              <input
                type="text"
                value={name}
                placeholder="Enter name..."
                onChange={(e) => handleUserInput(e)}
              />
              <button type="submit" onClick={(e) => handleSearchName(e)}>
                {" "}
                <RiSearchLine />
              </button>
            </div>

            <div className={s.order}>
              <select onChange={(e) => handleOrderByDate(e)}>
                <option value="">Order date</option>
                <option value="asc">asc</option>
                <option value="des">des</option>
              </select>
            </div>
            <BiReset
              onClick={() => setState([...original])}
              className={s.reset}
            />
          </div>
          <div className={s.favorite_list} >
            {state.map((ord, i) => (
              <OrdersCard
                orderid={ord?.orderid}
                state={ord?.state}
                userID={ord?.userID}
                date={ord?.date}
                data={ord?.data}
                updateOriginal={updateOriginal}
                key={i}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrdersUser;
