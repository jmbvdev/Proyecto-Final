import React from "react";
import { AiFillHeart } from "react-icons/ai";
import s from "../styles/favsbutton.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FavButton({ id, user, iamInFavPage }) {
  const navigate = useNavigate();
  function handleFav(e) {
    e.preventDefault();
    if (!user) {
      //ventanita sweet alert que avisa q para usar los favs se tiene q registrar
      return navigate("/sign-in");
    }
    if (iamInFavPage) {
      return axios
        .delete(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${id}`,
          { userID: user }
        )
        .then((res) => {
          window.alert(res.data);
        });
    }
    axios
      .post(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${id}`,
        { userID: user }
      )
      .then((res) => {
        window.alert(res.data);
      });
  }

  return (
    <button onClick={handleFav}>
      <AiFillHeart className={s.hearth} />
    </button>
  );
}
