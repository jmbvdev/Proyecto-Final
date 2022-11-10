import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

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
        window.alert("Reset email sent!");
      })
      .catch((error) => {
        window.alert(error.message);
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
