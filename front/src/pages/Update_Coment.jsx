import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import s from "../styles/update_coment.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import axios from "axios"
import CardComent from "../components/CardComment"





const Update_Coment = ({ }) => {

  const Navigate = useNavigate();
  const id = useParams().comentid;
  const plantsUID = useParams().plantsUID
  const user = useSelector((state) => state.usersReducer.currentUser);
  const [view, setView] = useState([]);
  const [value, setValue] = useState(0);
  const [update, setUpdate] = useState({
    star: "",
    comentspositive: [],
  });

  const positive = [
    "That's Not What I Expected",
    "Very Good Plant",
    "Highly Recommended",
    "Withstand Any Temperature",
    "Withstand Any Abuse",
  ];

  useEffect(() => {

    //axios.get("http://localhost:5000/api-plants-b6153/us-central1/app/coments/C2IE5ETPfGe4ZRASGzcM")
    axios
      .get(
        `http://localhost:5000/api-plants-b6153/us-central1/app/coments/${plantsUID}`
      )
      //  axios.get(`https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/${plantsUID}`)
      .then((res) => {
        setView(res.data.filter((e) => e.data.userUID === user.uid));
      });

  }, []);

  function handleSelect(e) {
    setUpdate({
      ...update,
      star: e.target.value
    });
  }

  const handleSelectComent = (e) => {
    if (e.target.value !== "select") {
      if (!update.comentspositive.includes(e.target.value))
        setUpdate({
          ...update,
          comentspositive: [e.target.value],
        });
    }
  };

  const handleDeleteSComent = () => {
    setUpdate({
      ...update,
      comentspositive: [],
    });
  };


  const handleOnClick = () => {

    if (!update.comentspositive.length && !update.star) {
      Swal.fire("Are you sure don't make the changes ?");
    }
    else {

      Swal.fire({
        title: "Warning",
        text: "Are you sure you want to update this comment?",
        icon: "warning",
        showDenyButton: true,
        denyButtonText: "Cancel",
        denyButtonColor: "#FF5733",
        confirmButtonText: "yes, Update",
        confirmButtonColor: "#8acfa9",

      })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .put(
                `http://localhost:5000/api-plants-b6153/us-central1/app/coments/${id}`,
                // `https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/${id}`,
                {
                  star: update.star !== "" ? update.star : view[0].data.star,
                  comentspositive: update.comentspositive.length ? update.comentspositive : view[0].data?.comentspositive,
                }
              )
            Navigate(-1)
          }
        })
    }
  }



  return (
    <div>
      <div className={s.container}>
        <form className={s.form}>
          <h2>Update Your Comment</h2>
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
            {update.comentspositive.length ? (
              <div className={s.categories_option}>
                <button type="button" onClick={handleDeleteSComent}>
                  x
                </button>
                <p className={s.positive_comments}>
                  {update.comentspositive[0]}
                </p>
              </div>
            ) : null}

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

          </div>
          <div>
            <button
              type="button"
              onClick={handleOnClick}
              className={s.create_btn}
            >
              Update comments
            </button>
          </div>
        </form>
      </div>
      <div className={s.changeview}>
        {
          view.length ? (
            <CardComent
              image={view[0].data?.userImg}
              name={view[0].data?.userName}
              rate={update.star ? update.star : view[0].data?.star}
              quote={update.comentspositive.length ? update.comentspositive : view[0].data?.comentspositive}
            />)
            : (null)}

      </div>

    </div>
  );
};
export default Update_Coment