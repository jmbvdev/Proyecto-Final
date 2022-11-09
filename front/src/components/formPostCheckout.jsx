import React from "react";
import MercadoPago from "../mercadopago/mercadopago";
import s from "../styles/formPost.module.css";
import Andreani from "./Andreani";
import GoogleMaps from "./GoogleMaps";
import { valLet, valN } from "../utils/validateformmp.js";

function FormPostCheckout({
  items,
  totalAmount,
  adress,
  name,
  adressNumber,
  city,
  setPago,
}) {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    adress,
    name,
    adressNumber,
    city,
  });
  const [valid, setValid] = React.useState(false);
  const [finish, setFinish] = React.useState(false);

  const handleFinish = (e) => {
    e.preventDefault();
    if (!adressNumber || !adress || !city) {
      window.alert("do you want to save your shipping data as default?");
      //swet alert que si confirma le pegue al back y actualize sus datos de envio.
      //si no confirma que siga nomas
      //dentro del mismo .then del swet alert que haga el axios y dsps el set Finish
    }
    setFinish(true);
  };

  let totalprod = 0;
  items.forEach((p) => {
    totalprod = totalprod + p.count;
  });
  const handleCheckbox1 = (e) => {
    setChecked1(true);
    setChecked2(false);
  };

  const handleCheckbox2 = (e) => {
    setChecked1(false);
    setChecked2(true);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const closeModal = (e) => {
    if (e.currentTarget != e.target) return;
    setPago(false);
  };
  return (
    <div
      className={s.modalBackground}
      value="closeModal"
      name="closeModal"
      onClick={closeModal}
    >
      <div className={s.modalContainer}>
        <div className={s.optionsContainer}>
          {!valid ? (
            <form className={s.modalForm}>
              <input
                type="text"
                autoComplete="off"
                name="city"
                placeholder="City Name"
                value={inputs.city}
                onChange={handleOnChange}
              />
              {valLet(inputs.city) ? null : <span>Not valid</span>}

              <input
                type="text"
                name="adress"
                autoComplete="off"
                placeholder="Adress"
                value={inputs.adress}
                onChange={handleOnChange}
              />
              {valLet(inputs.adress) ? null : <span>Not valid</span>}
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Who is receiving"
                value={inputs.name}
                onChange={handleOnChange}
              />
              {valLet(inputs.name) ? null : <span>Not valid</span>}
              <input
                name="adressNumber"
                type="text"
                autoComplete="off"
                placeholder="N°"
                value={inputs.adressNumber}
                onChange={handleOnChange}
              />
              {valN(inputs.adressNumber) ? null : <span>Not valid</span>}
              <button
                type="button"
                disabled={
                  !inputs.name ||
                  !inputs.adressNumber ||
                  !inputs.city ||
                  !inputs.adress ||
                  !valLet(inputs.name) ||
                  !valLet(inputs.city) ||
                  !valLet(inputs.adress) ||
                  !valN(inputs.adressNumber)
                }
                onClick={() => {
                  setValid(true);
                }}
              >
                Ok
              </button>
            </form>
          ) : (
            <div>
              <button
                onClick={() => {
                  setValid(false);
                  setFinish(false);
                }}
              >
                Back
              </button>
              <label>
                <input
                  className={s.check}
                  type="radio"
                  name="envio"
                  checked={checked1}
                  onChange={handleCheckbox1}
                />
                Retiro por local
              </label>
              <label>
                <input
                  className={s.check}
                  type="radio"
                  name="envio"
                  checked={checked2}
                  onChange={handleCheckbox2}
                />
                Envio con Andreani
              </label>
              {checked2 ? (
                <Andreani
                  totalAmount={totalAmount}
                  totalproducts={Math.pow(1.1, totalprod)}
                />
              ) : null}
              <button onClick={handleFinish}>Proceed to payment</button>
            </div>
          )}
          {finish ? (
            <div className={s.buttonMP}>
              <MercadoPago items={items} totalAmount={totalAmount} />
            </div>
          ) : null}
        </div>
        <div className={s.resumeCart}>
          {items.map((plant) => {
            return (
              <div className={s.divResume}>
                <img className={s.imageResume} src={plant.image} alt="" />
                <div className={s.divResumeInside}>
                  <h3>
                    X {plant.count} - {plant.name}
                  </h3>
                  <p>$ {plant.price * plant.count}</p>
                </div>
              </div>
            );
          })}
          <h4 className={s.totalAmount}>Total: ${totalAmount}</h4>
        </div>

        <div className={s.maps}>
          <GoogleMaps retiro={checked1} andreani={checked2} />
        </div>
      </div>
    </div>
  );
}

export default FormPostCheckout;
