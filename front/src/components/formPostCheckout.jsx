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
            <input type="text" placeholder="City Name" value={city} />
            <input type="text" placeholder="Adress" value={adress} />
            <input type="text" placeholder="How is receiving" value={name} />
            <input type="text" placeholder="DNI" value={DNI} />
          </form>
          <label>
            <input
              className={s.check}
              type="radio"
              name="envio"
              value="Retiro por local"
            />
            Retiro por local
          </label>
          <label>
            <input
              className={s.check}
              type="radio"
              name="envio"
              value="Envio con Andreani"
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
          <GoogleMaps />
        </div>
      </div>
    </div>
  );
}

export default FormPostCheckout;
