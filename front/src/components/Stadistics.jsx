import React from "react";
import axios from "axios";
import { LineChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";

function Stadistics() {
  const [users, setUsers] = React.useState(null);
  const [sales, setSales] = React.useState(null);

  React.useEffect(() => {
    if (!users) {
      axios
        .get(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/all"
        )
        .then((res) => setUsers(res.data));
    }
    if (!sales) {
      axios
        .get(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/all"
        )
        .then((res) => res.data);
    }
  }, [users, sales]);

  return <div>Stadistics</div>;
}

export default Stadistics;
