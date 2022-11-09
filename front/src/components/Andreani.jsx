import axios from "axios";
import React from "react";

function Andreani() {
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
      .then((res) => setAmount(parseInt(res.data.tarifaConIva.total) / 100));
  };

  return (
    <div>
      <input type="text" placeholder="CP" value={CP} onChange={handleChange} />
      <button onClick={shipingAmount}>Ok!</button>
      {amount ? <h4>{amount}</h4> : null}
    </div>
  );
}

export default Andreani;

// precio envio andreani siguiente get:
//https://apisqa.andreani.com/v1/tarifas?cpDestino=2000&contrato=300006611&cliente=CL0003750&sucursalOrigen=BAR&bultos[0][valorDeclarado]=1200&bultos[0][volumen]=10&bultos[0][kilos]=0.3&bultos[0][altoCm]=10&bultos[0][largoCm]=10&bultos[0][anchoCm]=10

//cpDestino le llega por input de envio, volumen es por cantidad de paquetes, si es small que valga 10 en bultos y 0.3kg en peso, 10cm en alto 10 en largo y 10 en ancho.
//si es medium que sume 15 en butlos 0.5 en peso 15 en alto 15 en largo y 15 en ancho
//si es large que sume 20 en bultos 0.8 en peso 20 en alto 20 en largo y 20 en alto
//si es mini que sume 5 en bultos 0.2 en kg 5cm 5cm 5cm
//todo dividido 10

//renderizar el resultado de los inputs.
//mostrar sucursales cercanas a la ciudad elegida.
//mostrar direccion de envio o ubic actual.
