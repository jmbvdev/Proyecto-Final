import axios from "axios";
import React from "react";
import s from "../styles/formPost.module.css";

function Andreani({ totalproducts, totalAmount }) {
  const [CP, setCP] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const handleChange = (e) => {
    e.preventDefault();
    setCP(e.target.value);
  };

  const shipingAmount = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://apis.andreani.com/v1/tarifas?cpDestino=${CP}&contrato=300006611&cliente=CL0003750&sucursalOrigen=BAR&bultos[0][valorDeclarado]=1200&bultos[0][volumen]=10&bultos[0][kilos]=0.3&bultos[0][altoCm]=10&bultos[0][largoCm]=10&bultos[0][anchoCm]=10`
      )
      .then((res) =>
        setAmount(
          (
            (parseInt(res.data.tarifaConIva.total) / 100) *
            totalproducts
          ).toFixed(2)
        )
      );
  };

  return (
    <div className={s.andreani_input}>
      <input type="text" placeholder="CP" value={CP} onChange={handleChange} />
      <button onClick={shipingAmount} className={s.andreani_ok}>
        OK
      </button>
      {amount && totalAmount < 1100 ? (
        <h4 className={s.andreani_result}>You pay in destiny: ${amount}</h4>
      ) : null}
      {totalAmount >= 1100 ? (
        <h4 className={s.andreani_result}>Free Shiping!</h4>
      ) : null}
    </div>
  );
}

export default Andreani;
