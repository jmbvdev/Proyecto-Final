import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Swal from "sweetalert2";
import s from "../styles/forgottenPass.module.css";

function ForgotenPassword({ close }) {
  const [email, setEmail] = React.useState("");

  function handleOnChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const closeModal = (e) => {
    if (e.currentTarget != e.target) return;
    close(false);
  };

  function handleOnClick(e) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        });
        Promise.resolve(
          Toast.fire({
            icon: "success",
            title: `Check your email!`,
          })
        );
        close(false);
      })
      .catch((error) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        });
        Promise.resolve(
          Toast.fire({
            icon: "error",
            title: `${error.message}`,
          })
        );
      });
  }
  return (
    <div onClick={closeModal} className={s.modalBackground}>
      <div className={s.modalContainer}>
        <button
          onClick={() => {
            close(false);
          }}
        >
          X
        </button>
        <input
          className={s.modalInput}
          type="email"
          onChange={handleOnChange}
          placeholder="Your email..."
          value={email}
        />
        <button
          className={s.register_btn}
          disabled={!email}
          onClick={handleOnClick}
        >
          Send password reset
        </button>
      </div>
    </div>
  );
}

export default ForgotenPassword;
