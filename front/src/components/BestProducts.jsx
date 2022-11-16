import React from "react";
import axios from "axios";
import { BarChart } from "react-chartkick";
import "chartkick/chart.js";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";
import s from "../styles/stadisticstables.module.css";
import { IoIosArrowBack } from "react-icons/io";

function BestProducts() {
  const [backup, setBackup] = React.useState(null);
  const [sales, setSales] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!sales) {
      axios
        .get(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/all"
        )
        .then((res) => {
          let amount = {};
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].state !== "Pending") {
              res.data[i].cart.forEach((e) => {
                if (amount.hasOwnProperty(e.name)) {
                  amount[e.name] = amount[e.name] + e.count;
                } else {
                  amount[e.name] = e.count;
                }
              });
            }
          }
          let final = {};
          for (let prod in amount) {
            if (amount[prod] >= 1) {
              final[prod] = amount[prod];
            }
          }
          setSales(final);
          setBackup(amount);
        });
    }
  });

  const handleOnPeriod = (e) => {
    e.preventDefault();
    let final = {};
    for (let prod in backup) {
      if (backup[prod] >= e.target.value) {
        final[prod] = backup[prod];
      }
    }
    setSales(final);
  };

  if (!sales) return <Loading />;
  return (
    <div className={s.Container}>
      <div className={s.button_container}>
      <button className={s.back} onClick={() => {
          navigate("/stadistics")
          window.scrollTo(0, {behavior: 'smooth'})
          }}>
          <IoIosArrowBack />
        </button>
      </div>
      <div className={s.order}>

      <h4>BEST PRODUCTS</h4>
      <select onChange={handleOnPeriod}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>
      </div>
      <BarChart
        xtitle="Sales count"
        ytitle="Products"
        label="Value"
        min={0}
        max={25}
        id="users-chart"
        width="700px"
        height="500px"
        data={sales}
      />
    </div>
  );
}

export default BestProducts;
