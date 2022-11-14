import React from "react";
import { AiFillHeart } from "react-icons/ai";
import s from "../styles/favsbutton.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FavButton({ id, user, iamInFavPage, icon }) {
  const navigate = useNavigate();
  function handleFav(e) {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        title: "Wait...",
        text: "Your have to sign in to add a favorite",
        icon: "failure",
        showDenyButton: false,
        denyButtonText: "",
        denyButtonColor: "rgba(11, 115, 147, 0.713)",
        confirmButtonText: "Sign In",
        confirmButtonColor: "rgb(9, 102, 74)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/sign-in");
        }
      });
    }
    if (iamInFavPage) {
      return axios
        .delete(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${id}/${user}`
        )
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: `${res.data}`,
            icon: "success",
            confirmButtonText: "ok",
            confirmButtonColor: "rgb(9, 102, 74)",
          });
        });
    }
    axios
      .post(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${id}`,
        { userID: user }
      )
      .then((res) => {
        Swal.fire({
          title: "Great",
          text: `${res.data}`,
          icon: "success",
          confirmButtonText: "ok",
          confirmButtonColor: "rgb(9, 102, 74)",
        });
      });
  }

  return (
    <button onClick={handleFav}>
      {icon || <AiFillHeart className={s.hearth} />}
    </button>
  );
}
