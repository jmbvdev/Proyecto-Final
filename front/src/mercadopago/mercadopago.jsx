import axios from "axios";
import React from "react";
import { useEffect } from "react";

const FORM_ID = "payment-form";

export default function MercadoPago({ items, totalAmount }) {
  useEffect(() => {
    console.log("entro dos veces");
    (async () => {
      const res = await axios.post(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/orders/purchase`,
        {
          cart: items,
          totalAmount: totalAmount,
        }
      );

      function addCheckout() {
        const mp = new window.MercadoPago(
          "TEST-99220b26-4db5-4afa-9b2b-5615cf628e08",
          {
            locale: "es-AR",
          }
        );
        const checkout = mp.checkout({
          preference: {
            id: res.data.global,
          },
          render: {
            container: `#${FORM_ID}`, // Indica el nombre de la clase donde se mostrará el botón de pago
            label: "Confirm Payment", // Cambia el texto del botón de pago (opcional)
          },
        });
      }
      if (res.data.global) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://sdk.mercadopago.com/js/v2";
        script.addEventListener("load", addCheckout);
        document.body.appendChild(script);
      }
    })();
    localStorage.clear();
  }, []);

  return <div id={FORM_ID} method="GET" />;
}
