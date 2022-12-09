import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearDetails, GetProductDetails } from "../Redux/actions/products";
import s from "../styles/details.module.css"

function MoreSizes({ idsmall, idmedium, idlarge }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRedirect = (id) => {
    dispatch(clearDetails());
    navigate(`/plants/details/${id}`);
    dispatch(GetProductDetails(id));
  };
  return (
    <div className={s.size_btn}>
      {idsmall ? (
        <button className={s.size_button}
          onClick={() => {
            handleRedirect(idsmall);
          }}
        >
          small
        </button>
      ) : null}
      {idmedium ? (
        <button className={s.size_button}
          onClick={() => {
            handleRedirect(idmedium);
          }}
        >
          medium
        </button>
      ) : null}
      {idlarge ? (
        <button className={s.size_button}
          onClick={() => {
            handleRedirect(idlarge);
          }}
        >
          large
        </button>
      ) : null}
    </div>
  );
}

export default MoreSizes;
