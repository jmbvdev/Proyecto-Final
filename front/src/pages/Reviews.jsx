import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "../styles/create.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { setCurrentUser } from "../Redux/actions/users";
import { auth } from "../firebase/firebase";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

import avatar from "../images/avatar 1.gif"
import { IoIosArrowBack } from "react-icons/io";


const Reviews = ({ setView, close,handleClose }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const id = useParams().id;
  const user = useSelector((state) => state.usersReducer.currentUser);
  const [error, setError] = useState({});

  const [value, setValue] = useState(0);
  const [coments, setComents] = useState({
    userUID: user?.uid,
    userName: user?.displayName,
    userImg: user?.photoURL,
    star: "",
    plantsUID: id,
    comentspositive: [],
  });

  //const [state, setState] = useState([])

  const positive = [
    "That's Not What I Expected",
    "Very Good Plant",
    "Highly Recommended",
    "Withstand Any Temperature",
    "Withstand Any Abuse",
  ];

  function handleSelect(e) {
    setComents({
      ...coments,
      star: e.target.value,
    });
  }

  const handleSelectComent = (e) => {
    if (e.target.value !== "select") {
      if (!coments.comentspositive.includes(e.target.value))
        setComents({
          ...coments,
          comentspositive: [e.target.value],
        });
    }
  };

  const handleDeleteSComent = () => {
    setComents({
      ...coments,
      comentspositive: [],
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    if (!coments.comentspositive.length || !coments.star) {
      // Swal.fire("Missing Data");
      Swal.fire({
        title: "Eh",
        text: "You must enter some information",
        icon: "info",
        showDenyButton: false,
        confirmButtonText: "ok",
        confirmButtonColor: "rgb(9, 102, 74)",
      });
    } else {
      axios
        .post(
          "https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/coment",
          {
            star: coments.star,
            plantsUID: coments.plantsUID,
            userUID: coments.userUID,
            comentspositive: coments.comentspositive,
            userName: coments.userName,
            userImg: coments.userImg,
          }
        )
        .then((res) => {
          close(false);
          Swal.fire({
            title: "Success",
            text: "Your comment was successfully added",
            icon: "success",
            confirmButtonText: "ok",
            confirmButtonColor: "rgb(9, 102, 74)",
          });
          setView((prevstate) => [...prevstate, res.data]);
        })
        .then(() => {
          Navigate(`/plants/details/${id}`);
        });
    }
  };

  return (
    <div className={s.container}>
      
      <form className={s.form}>
      <div className={s.button_container}>
            <button onClick={()=>handleClose(true)} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
        <h2>Leave Your Comment</h2>
        <img
          src={user?.photoURL || avatar}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://i.stack.imgur.com/4powQ.gif";
          }}
          className={s.userPic}
          alt="do not pose"
        />
        <h3>{user?.displayName}</h3>

        <div>
          <select
            onChange={handleSelectComent}
            className={s.recomendations_select}
          >
            <option value="select">Select a recomendation</option>
            {positive.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div>
          {coments.comentspositive.length ? (
            <div className={s.categories_option}>
              <button type="button" onClick={handleDeleteSComent}>
                x
              </button>
              <p className={s.positive_comments}>
                {coments.comentspositive[0]}
              </p>
            </div>
          ) : null}
          {error.comentspositive && (
            <span className={s.errors}>{error.comentspositive}</span>
          )}
        </div>
        <div className={s.input_container}>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Star rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(e, newValue) => {
                setValue(newValue);
                handleSelect(e);
              }}
            />
          </Box>
        </div>
        <div>
          <button
            type="button"
            onClick={handleOnClick}
            className={s.create_btn}
          >
            Send comments
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reviews;
