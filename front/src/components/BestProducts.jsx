import React from "react";
import axios from "axios";
import { BarChart } from "react-chartkick";
import "chartkick/chart.js";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

function BestProducts() {
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
                  amount[e.name] = amount[e.name] + 1;
                } else {
                  amount[e.name] = 1;
                }
              });
            }
          }
          let final = {};
          for (let prod in amount) {
            if (amount[prod] > 1) {
              final[prod] = amount[prod];
            }
          }
          setSales(final);
        });
    }
  });

  if (!sales) return <Loading />;
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h4>BEST PRODUCTS</h4>
      <BarChart
        xtitle="Products"
        ytitle="Sales count"
        label="Value"
        min={0}
        max={10}
        id="users-chart"
        width="700px"
        height="500px"
        data={sales}
      />
    </div>
  );
}

export default BestProducts;
