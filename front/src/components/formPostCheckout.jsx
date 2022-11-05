import React from "react";
import MercadoPago from "../mercadopago/mercadopago";
import s from "../styles/formPost.module.css";
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

  const handleCheckbox1 = (e) => {
    setChecked1(true);
    setChecked2(false);
  };

  const handleCheckbox2 = (e) => {
    setChecked1(false);
    setChecked2(true);
  };

  const closeModal = (e) => {
    if (e.currentTarget != e.target) return;
    setPago(false);
  };
  console.log(items, totalAmount);
  return (
    <div
      className={s.modalBackground}
      value="closeModal"
      name="closeModal"
      onClick={closeModal}
    >
      <div className={s.modalContainer}>
        <div className={s.optionsContainer}>
          <form className={s.modalForm}>
            <input
              type="text"
              autoComplete="off"
              placeholder="City Name"
              value={city}
            />
            <input
              type="text"
              autoComplete="off"
              placeholder="Adress"
              value={adress}
            />
            <input
              type="text"
              autoComplete="off"
              placeholder="How is receiving"
              value={name}
            />
            <input
              type="text"
              autoComplete="off"
              placeholder="DNI"
              value={DNI}
            />
          </form>
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
          <div className={s.buttonMP}>
            <MercadoPago items={items} totalAmount={totalAmount} />
          </div>
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
