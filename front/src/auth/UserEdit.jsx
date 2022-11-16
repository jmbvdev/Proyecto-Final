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
import { GiPhone } from "react-icons/gi";
import { MdLocationSearching } from "react-icons/md";
import { MdLocationCity, MdLocationOn } from "react-icons/md";
import { setCurrentUser } from "../Redux/actions/users/index.js";
import ForgotenPassword from "./forgotenPassword";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

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
  const [error, setError] = React.useState({});

  const sendNewPass = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleBack = () => {
    navigate(-1);
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
    setError(validate({ ...input, [e.target.name]: e.target.value }));
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
        <button
          onClick={() => {
            navigate("/dashboard");
            window.scrollTo(0, { behavior: "smooth" });
          }}
          className={s.back}
        >
          <IoIosArrowBack />
        </button>
      </div>

      <div className={s.profile}>
        <form onSubmit={(e) => handleOnSubmit(e)} className={s.specs}>
          <div className={s.input_label}>
            <p className={s.name_input}>User image</p>
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
            <p className={s.name_input}>User name</p>
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
            {error.displayName && (
              <p className={s.danger}>{error.displayName}</p>
            )}
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
            {error.city && <p className={s.danger}>{error.city}</p>}
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
          <div className={s.input_label}>
            <p className={s.name_input}>Adress number</p>
            <div className={s.input_container}>
              <MdLocationCity className={s.user_icon} />
              <input
                name="adressNumber"
                value={input.adressNumber}
                onChange={handleChange}
                placheholder="Adress Number"
                type="text"
                className={s.input_text}
                autoComplete="off"
              />
            </div>

            {error.adressNumber && (
              <p className={s.danger}>{error.adressNumber}</p>
            )}
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
            {error.phoneNumber && (
              <p className={s.danger}>{error.phoneNumber}</p>
            )}
          </div>

          <button type="submit" className={s.update}>
            UPDATE
          </button>
          {user?.providerData?.[0].providerId.includes("google") ? null : (
            <div>
              <button type="button" onClick={sendNewPass} className={s.update}>
                Set new Password
              </button>
              {open ? <ForgotenPassword close={setOpen} /> : null}
            </div>
          )}
        </form>

        <img src={image} alt="" className={s.calatea} />
      </div>
    </div>
  );
};

const validate = (input) => {
  let error = {};
  if (
    input.displayName !== "" &&
    !/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(
      input.displayName && input.displayName
    )
  )
    error.displayName = "Name invalid! (Ex : Juan Lopez)";

  if (input.city !== "" && !/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/.test(input.city))
    error.city = "City invalid! (Ex : Boston, New Jersey, Santa Monica)";

  if (
    input.phoneNumber !== "" &&
    !/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/.test(
      input.phoneNumber
    ) &&
    input.phoneNumber
  )
    error.phoneNumber = "Number invalid! 8 digits a least 12 at most";

  if (input.adressNumber !== "" && !/^[0-9]+$/.test(input.adressNumber))
    error.adressNumber = "Adress number invalid! (Ex : 1543)";
  return error;
};

export default UserEdit;
