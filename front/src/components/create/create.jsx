import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Create() {
  const [jugador, setJugador] = useState({
    name: "",
    goals: 0,
    position: "",
  });

  function handleOnSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "https://us-central1-api-plants-b6153.cloudfunctions.net/app/users",
        {
          name: jugador.name,
          position: jugador.position,
          goals: jugador.goals,
        }
      )
      .then((data) => window.alert(data.data));
  }

  function handleOnChange(e) {
    e.preventDefault();
    setJugador({ ...jugador, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="name" onChange={handleOnChange} />
        <input
          step="1"
          type="range"
          name="goals"
          min="0"
          max="1000"
          onChange={handleOnChange}
        />
        <span>{jugador.goals}</span>
        <input type="text" name="position" onChange={handleOnChange} />
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}
