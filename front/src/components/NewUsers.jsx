import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";
import Loading from "./Loading.jsx";

function NewUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState(null);
  const [period, setPeriod] = React.useState("2022-01-01,2022-12-31");
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (!users) {
      axios
        .get(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/all"
        )
        .then((res) => {
          let data = {};
          for (let i = 0; i < res.data.length; i++) {
            let date = new Date(
              res.data[i].metadata.creationTime
            ).toDateString();
            if (data.hasOwnProperty(date)) {
              data[date] = data[date] + 1;
            } else data[date] = 1;
          }
          setUsers(data);
          setTotal(res.data.length);
        });
    }
  }, [users]);

  const handleOnPeriod = (e) => {
    e.preventDefault();
    setPeriod(e.target.value);
  };

  if (!users) return <Loading />;
  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h3>NEW USERS</h3>
      <h4>{`Total users now: ${total}`}</h4>
      <select onChange={handleOnPeriod}>
        <option value="2022-01-01,2022-12-31">All year</option>
        <option value="2022-01-01,2022-01-31">January</option>
        <option value="2022-02-01,2022-02-28">February</option>
        <option value="2022-03-01,2022-03-31">March</option>
        <option value="2022-04-01,2022-04-30">April</option>
        <option value="2022-05-01,2022-05-31">May</option>
        <option value="2022-06-01,2022-06-30">June</option>
        <option value="2022-07-01,2022-07-31">July</option>
        <option value="2022-08-01,2022-08-31">August</option>
        <option value="2022-09-01,2022-09-30">September</option>
        <option value="2022-10-01,2022-10-31">October</option>
        <option value="2022-11-01,2022-11-30">November</option>
        <option value="2022-12-01,2022-12-31">December</option>
      </select>
      <LineChart
        xtitle="Days"
        ytitle="New Users"
        label="Value"
        xmin={period.split(",")[0]}
        xmax={period.split(",")[1]}
        min={0}
        max={10}
        id="users-chart"
        width="700px"
        height="500px"
        data={users}
      />
    </div>
  );
}

export default NewUsers;
