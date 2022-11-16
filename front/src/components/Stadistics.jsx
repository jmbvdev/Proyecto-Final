import React from "react";
import axios from "axios";
import { LineChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function Stadistics() {
  const navigate = useNavigate();

  const [sales, setSales] = React.useState(null);
  const [totalAmounts, setTotalAmounts] = React.useState(null);

  React.useEffect(() => {
    if (!sales) {
      axios
        .get(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/all"
        )
        .then((res) => {
          let amount = {};
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data[i].state !== "Pending" &&
              res.data[i].date >= "2022-11-01" &&
              res.data[i].date < "2022-11-08"
            ) {
              let date = new Date(res.data[i].date).toDateString();

              let total = 0;
              res.data[i].cart.forEach((e) => {
                total = total + e.count * e.price;
              });
              if (amount.hasOwnProperty(date)) {
                console.log(res.data[i]);
                console.log(total);
                amount[date] = amount[date] + total;
              } else {
                console.log(res.data[i]);
                console.log(total);
                amount[date] = total;
              }
            }
          }
          setTotalAmounts(amount);
        });
    }
  }, [sales]);

  return (
    <>
    <button onClick={() => {
      navigate('/dashboard')
      window.scrollTo(0, {behavior: 'smooth'})
    }}>
      <IoIosArrowBack />
    </button>
    <div>
      <button onClick={() => navigate("newUsers")}>New Users</button>
      <button onClick={() => navigate("salesCount")}>Sales Count</button>
      <button onClick={() => navigate("salesAmount")}>Sales Amount</button>
      <button onClick={() => navigate("bestProducts")}>Best products</button>
    </div>
    </>
  );
}

export default Stadistics;

/* 

cart
: 
[{…}]
date
: 
"2022-11-03T06:56:05.751Z"
orderId
: 
"JHEw4QBpMSlcjvBGk1Pw"
state
: 
"Order approved"
userID
: 
"iNbHP9GNlhOqcMIMSCpJJEv5HXU2"

*/

/* 
customClaims
: 
{role: Array(1)}
disabled
: 
false
displayName
: 
"Cristian Muruas"
email
: 
"cristianmurua1994@gmail.com"
emailVerified
: 
false
metadata
: 
{lastSignInTime: 'Mon, 07 Nov 2022 17:43:51 GMT', creationTime: 'Fri, 28 Oct 2022 04:29:06 GMT'}
passwordHash
: 
"S7K7LblMiidp0v_Gq6fvZ9hGPcgNCyFHWaRhrhM37qCoMPvlIxci2ZyfYKpqTAN26cCo1uy09ekbf9xP1BmUSg=="
passwordSalt
: 
"PFNXk0oFZmHUvA=="
providerData
: 
[{…}]
tokensValidAfterTime
: 
"Fri, 28 Oct 2022 04:29:06 GMT"
uid
: 
"5u9Bwr7iWmW1F2NH5vKVEwvB9bA3"

*/
