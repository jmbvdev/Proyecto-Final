import React from "react";
import axios from "axios";
import { PieChart } from "react-chartkick";
import "chartkick/chart.js";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

function SalesCount() {
  const navigate = useNavigate();
  const [sales, setSales] = React.useState(null);
  const [period, setPeriod] = React.useState(null);

  React.useEffect(() => {
    if (!sales) {
      axios
        .get(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/all"
        )
        .then((res) => {
          setSales(res.data);
          let data = {};
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data[i].state !== "Pending" &&
              res.data[i].date >= "2022-10-30" &&
              res.data[i].date <= "2022-11-06"
            ) {
              let date = new Date(res.data[i].date).toDateString();
              if (data.hasOwnProperty(date)) {
                data[date] = data[date] + 1;
              } else data[date] = 1;
            }
          }
          setPeriod(data);
        });
    }
  }, [sales]);

  const handleOnPeriod = (e) => {
    e.preventDefault();
    let data = {};
    for (let i = 0; i < sales.length; i++) {
      if (
        sales[i].state !== "Pending" &&
        sales[i].date >= e.target.value.split(",")[0] &&
        sales[i].date <= e.target.value.split(",")[1]
      ) {
        let date = new Date(sales[i].date).toDateString();

        if (data.hasOwnProperty(date)) {
          data[date] = data[date] + 1;
        } else data[date] = 1;
      }
    }
    setPeriod(data);
  };

  if (!sales) return <Loading />;
  return (
    <div>
      <button onClick={() => navigate("/stadistics")}>Back</button>
      <button onClick={() => navigate("/stadistics/salesAmount")}>
        Go to Sales Amount
      </button>
      <h3>SALES COUNT</h3>
      <select onChange={handleOnPeriod}>
        <option value="2022-09-10,2022-09-16">09/10 - 15/10</option>
        <option value="2022-10-16,2022-10-23">16/10 - 22/10</option>
        <option value="2022-10-23,2022-10-30">23/10 - 29/10</option>
        <option value="2022-10-30,2022-11-07">30/10 - 06/11</option>
        <option value="2022-11-07,2022-11-14">07/11 - 13/11</option>
        <option value="2022-11-14,2022-11-20">14/11 - 20/11</option>
      </select>
      <PieChart data={period} empty="No sales for the stipulated period" />
    </div>
  );
}

export default SalesCount;
