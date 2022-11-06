import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "../styles/create.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
// import { validateComent } from "../Util/validateComent";
import axios from "axios";
import { setCurrentUser } from "../Redux/actions/users";
import { auth } from "../firebase/firebase";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";

const Reviews = () => {
  return null;

  /* return (
        <div className={s.container}>
            <form className={s.form}>
                <h2>Leave Your Comment</h2>
                    <img src={user?.photoURL} className={s.userPic} alt="do not pose image" />
                    <h3>{user?.displayName}</h3>

                <div >
                    <select onChange={handleSelectComent} className={s.recomendations_select}>
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
                            <p className={s.positive_comments}>{coments.comentspositive[0]}</p>
                        </div>
                    ) : null}
                    {error.comentspositive && <span className={s.errors}>{error.comentspositive}</span>}
                </div>
                <div className={s.input_container}>
                   <Box
                   sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Star rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
          handleSelect(e)
        }}
        />
                   </Box>
                  
                </div>
                <div>
                    <button type='button' onClick={handleOnClick} className={s.create_btn}>Send comments</button>

                </div>
            </form>
        </div>
  ); */
};

export default Reviews;
