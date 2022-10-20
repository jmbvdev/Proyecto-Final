import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Componentprueba() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    fetch("https://us-central1-api-plants-b6153.cloudfunctions.net/app/users")
      .then((res) => res.json())
      .then((data) => {
        setJugadores(data);
      });
  }, []);

  return (
    <div>
      {!jugadores[0] ? (
        "Loading... "
      ) : (
        <div>
          {jugadores.map((doc) => {
            return (
              <div>
                <h2>{doc.data.name}</h2>
                <h4>{doc.data.position || doc.data.posicion}</h4>
                <h4>{doc.data.goles}</h4>
                <h4>{doc.data.goals}</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
