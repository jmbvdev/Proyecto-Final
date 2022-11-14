import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  getPictureUrl,
  getPictureUrlUser,
  setUserImage,
} from "../firebase/Controllers";
import { useRef } from "react";
import s from "../styles/userEdit.module.css";
import image from "../images/edit.webp";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { GiPhone } from "react-icons/gi";
import {MdLocationSearching}from "react-icons/md"
import {MdLocationCity, MdLocationOn}from "react-icons/md"
import { setCurrentUser } from "../Redux/actions/users/index.js";
import ForgotenPassword from "./forgotenPassword";
import axios from "axios";
import Swal from "sweetalert2";
import { IoIosArrowBack } from "react-icons/io";

const UserEdit = () => {
  const initialState = {
    displayName: "",
    email: "",
    phoneNumber: "",
    adress: "",
    adressNumber: "",
    city: "",
  };

  const [input, setInput] = React.useState(initialState);
  const [photoURL, setphotoURL] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.usersReducer.currentUser);
  const fileRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const sendNewPass = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleImage = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async () => {
        const userImage = fileReader.result;
        const res = await setUserImage(user.uid, userImage);
        const url = await getPictureUrlUser(user.uid);
        url ? setphotoURL(url) : setphotoURL(null);
      };
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    //setError(validate({...input, [e.target.name] : e.target.value}))
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const updates = {
      displayName:
        input.displayName !== ""
          ? input.displayName.charAt(0).toUpperCase() +
            input.displayName.slice(1)
          : user.displayName,
      photoURL: photoURL || user.photoURL,
      phoneNumber:
        input.phoneNumber !== "" ? input.phoneNumber : user.phoneNumber,
      role: user.role || ["user"],
      adress: input.adress || user.adress,
      adressNumber: input.adressNumber || user.adressNumber,
      city: input.city || user.city,
    };
    axios
      .put(
        `https://us-central1-api-plants-b6153.cloudfunctions.net/app/users/${user.uid}`,
        updates
      )
      .then((res) => {
        dispatch(setCurrentUser({ ...res.data, ...res.data.customClaims }));
        setInput(initialState);
        setphotoURL(null);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        Promise.resolve(
          Toast.fire({
            icon: "success",
            title: `User information modified!`,
          })
        );

        navigate("/dashboard");
      })
      .catch((err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          iconColor: "white",
          customClass: {
            popup: "colored-toast",
          },
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
        Promise.resolve(
          Toast.fire({
            icon: "error",
            title: `${err.response.data}`,
          })
        );
      });
  };

  return (
    <div className={s.container}>
       <div className={s.button_container}>
            <button onClick={()=>navigate(-1)} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
      <div className={s.profile}>
        <form onSubmit={(e) => handleOnSubmit(e)} className={s.specs}>
          <div className={s.input_label}>
            <p className={s.name_input}>User image:</p>
            <div className={s.input_container}>
              <button type="button" onClick={handleFile}></button>
              <input
                name="photoURL"
                ref={fileRef}
                type="file"
                onChange={handleImage}
                className={s.file}
              />
            </div>
          </div>
          <div className={s.input_label}>
            <p className={s.name_input}>user name</p>
            <div className={s.input_container}>
              <BiUser className={s.user_icon} />
              <input
                name="displayName"
                value={input.displayName}
                onChange={handleChange}
                placeholder="User name"
                className={s.input_text}
                autoComplete="off"
              />
            </div>
          </div>
          <div className={s.input_label}>
            <p className={s.name_input}>City</p>
            <div className={s.input_container}>
              <MdLocationSearching className={s.user_icon} />
              <input
                name="city"
                value={input.city}
                onChange={handleChange}
                placeholder="City"
                className={s.input_text}
                autoComplete="off"
              />
            </div>
          </div>
          <div className={s.input_label}>
            <p className={s.name_input}>Adress</p>

            <div className={s.input_container}>
              <MdLocationOn className={s.user_icon} />
              <input
                name="adress"
                value={input.adress}
                onChange={handleChange}
                placheholder="Adress"
                type="text"
                className={s.input_text}
                autoComplete="off"
              />
            </div>
          </div>
          <div className={s.input_container}>
            <MdLocationCity className={s.user_icon} />
            <input
              name="adressNumber"
              value={input.adressNumber}
              onChange={handleChange}
              placheholder="N°"
              type="text"
              className={s.input_text}
              autoComplete="off"
            />
          </div>
          <div className={s.input_label}>
            <p className={s.name_input}>phone</p>
            <div className={s.input_container}>
              <GiPhone className={s.user_icon} />
              <input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className={s.input_text}
              />
            </div>
          </div>

          <button type="submit" className={s.update}>
            UPDATE
          </button>
        </form>
        {user?.providerData?.[0].providerId.includes("google") ? null : (
          <div>
            <button type="button" onClick={sendNewPass} className={s.update}>
              Set new Password
            </button>
            {open ? <ForgotenPassword close={setOpen} /> : null}
          </div>
        )}

        <img src={image} className={s.calatea} />
      </div>
    </div>
  );
};

export default UserEdit;

/* 

export const editUser = (id, payload) => {
  return async function (dispatch) {
    return await fetch(
      `http://localhost:5000/api-plants-b6153/us-central1/app/users/${id}`,
      {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(payload),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    ).then((response) => {
      dispatch({
        type: EDIT_USER,
        payload: response,
      });
    });
  };
};



*/
