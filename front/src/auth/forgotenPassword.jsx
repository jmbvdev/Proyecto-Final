import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Swal from "sweetalert2";

function ForgotenPassword({ close }) {
  const [email, setEmail] = React.useState("");

  function handleOnChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
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
    <div>
      <button
        onClick={() => {
          close(false);
        }}
      >
        X
      </button>
      <input
        type="email"
        onChange={handleOnChange}
        placeholder="Your email..."
        value={email}
      />
      <button disabled={!email} onClick={handleOnClick}>
        Send password reset
      </button>
    </div>
  );
}

export default ForgotenPassword;
