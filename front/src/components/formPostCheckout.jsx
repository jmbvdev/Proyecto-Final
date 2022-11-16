import React from "react";
import MercadoPago from "../mercadopago/mercadopago";
import s from "../styles/formPost.module.css";
import Andreani from "./Andreani";
import GoogleMaps from "./GoogleMaps";
import { valLet, valN } from "../utils/validateformmp.js";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";
import {IoIosArrowBack} from "react-icons/io"
import Coinbase from "./Coinbase/Coinbase";
import girl from "../images/plantgirl.webp"
import andreani from "../images/andreani.webp"

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
  const user = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();

  const handleValid = (e) => {
    e.preventDefault();
    if (
      adressNumber !== inputs.adressNumber ||
      city !== inputs.city ||
      adress !== inputs.adress
    ) {
      Swal.fire({
        title: "Hey!",
        text:
          "This information is new, do you want to actualize your profile data?",
        icon: "success",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#72CE65",
        confirmButtonText: "Yes",
        confirmButtonColor: "#FF5733",
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .put(
              `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${user.uid}`,
              {
                role: user.role || ["user"],
                adress: inputs.adress,
                adressNumber: inputs.adressNumber,
                city: inputs.city,
              }
            )
            .then((res) => {
              dispatch(
                setCurrentUser({ ...res.data, ...res.data.customClaims })
              );
            });
        }
      });
    }
    setValid(true);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (!checked1 && !checked2) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center-center",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
      });
      Promise.resolve(
        Toast.fire({
          icon: "error",
          title: `You have to choose one option!`,
        })
      );
    } else {
      setFinish(true);
      axios.put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/extrasorder/${items[0].orderID}`,
        {
          extras: {
            adress: inputs.adress,
            adressNumber: inputs.adressNumber,
            city: inputs.city,
            sendOption:
              (checked1 && "Local retirement") ||
              (checked2 && "Andreani shipping"),
            totalAmount: totalAmount,
          },
        }
      );
    }
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
                name="adressNumber"
                type="text"
                autoComplete="off"
                placeholder="N°"
                value={inputs.adressNumber}
                onChange={handleOnChange}
              />
              {valN(inputs.adressNumber) ? null : <span>Not valid</span>}
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Who is receiving"
                value={inputs.name}
                onChange={handleOnChange}
              />
              {valLet(inputs.name) ? null : <span>Not valid</span>}
              <div className={s.payment_btn}>

              <button
               className={s.payment_icon}
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
                onClick={handleValid}
              >
                Ok
              </button>
              </div>
            </form>
          ) : (
            <div>
              <div className={s.button_container}>

              <button
               className={s.back}
                onClick={() => {
                  setValid(false);
                  setFinish(false);
                }}
              >
                   <IoIosArrowBack/>
              </button>
              </div>
              <div className={s.payment}>

              <div className={s.local}>
                <div className={s.check_container}>
                <input
                  className={s.check}
                  type="radio"
                  name="envio"
                  checked={checked1}
                  onChange={handleCheckbox1}
                />
                  <p className={s.payment_span}>Local pickup</p>
                </div>
                <img src={girl} alt="girl" />
              </div>
              <div className={s.andreani}>
                <div className={s.check_container}>
                <input
                  className={s.check}
                  type="radio"
                  name="envio"
                  checked={checked2}
                  onChange={handleCheckbox2}
                />
                <p className={s.payment_span}>  Shipping with Andreani</p>
              
              </div>
              <img src={andreani} alt="andreani" />

                </div>
              {checked2 ? (
                <Andreani
                  totalAmount={totalAmount}
                  totalproducts={Math.pow(1.1, totalprod)}
                />
              ) : null}
              <button className={s.pay_btn} onClick={handleFinish}>Proceed to payment</button>
              </div>
            </div>
          )}
          {finish ? (
            <>
              <div className={s.buttonMP}>
                <MercadoPago items={items} totalAmount={totalAmount} />
                
                <Coinbase totalAmount={totalAmount} />
              </div>
            </>
          ) : null}
          {
            !valid ?
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
        </div>:null
          }
          
        </div>
        

        <div className={s.maps}>
          <GoogleMaps
            retiro={checked1}
            andreani={checked2}
            city={inputs.city}
          />
        </div>
      </div>
    </div>
  );
}

export default FormPostCheckout;
