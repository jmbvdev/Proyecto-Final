import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  function handleOnClick(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div>
      <h3>Sorry, we dont found what you were looking for</h3>
      <button onClick={handleOnClick}>Go Back Home</button>
    </div>
  );
}
