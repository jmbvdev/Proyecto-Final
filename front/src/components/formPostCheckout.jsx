import React from "react";
import MercadoPago from "../mercadopago/mercadopago";
import s from "../styles/formPost.module.css";
import Andreani from "./Andreani";
import GoogleMaps from "./GoogleMaps";

function FormPostCheckout({
  items,
  totalAmount,
  adress,
  name,
  DNI,
  city,
  setPago,
}) {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    adress,
    name,
    DNI,
    city,
  });
  const [valid, setValid] = React.useState(false);
  const [finish, setFinish] = React.useState(false);

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
              <input
                type="text"
                name="adress"
                autoComplete="off"
                placeholder="Adress"
                value={inputs.adress}
                onChange={handleOnChange}
              />
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Who is receiving"
                value={inputs.name}
                onChange={handleOnChange}
              />
              <input
                name="DNI"
                type="text"
                autoComplete="off"
                placeholder="DNI"
                value={inputs.DNI}
                onChange={handleOnChange}
              />
              <button
                type="button"
                disabled={
                  !inputs.name || !inputs.DNI || !inputs.city || !inputs.adress
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
              {checked2 ? <Andreani /> : null}
              <button onClick={() => setFinish(true)}>
                Proceed to payment
              </button>
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
