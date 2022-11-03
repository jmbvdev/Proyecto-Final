import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import s from "../styles/create.module.css";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import { validateComent } from "../Util/validateComent";
import axios from "axios"
import { setCurrentUser } from "../Redux/actions/users";
import { auth } from "../firebase/firebase";


const Reviews = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const id = useParams().id;
    const user = useSelector((state) => state.usersReducer.currentUser);
    const [error, setError] = useState({});


    const [coments, setComents] = useState({
        userUID: user?.uid,
        userName: user?.displayName,
        userImg: user?.photoURL,
        star: "",
        plantsUID: id,
        comentspositive: []
    })
    console.log(coments.userImg)
    //const [state, setState] = useState([])

    const positive = ["Very Good Plant", "Highly Recommended", "Withstand Any Temperature", "Withstand Any Abuse"]

    useEffect(() => {
        dispatch(setCurrentUser(auth.currentUser));

    }, [])

    function handleSelect(e) {
        setComents({
            ...coments,
            star: e.target.value
        })
    }

    const handleSelectComent = (e) => {
        if (e.target.value !== "select") {
            if (!coments.comentspositive.includes(e.target.value))
                setComents({
                    ...coments,
                    comentspositive: [e.target.value],
                });
            setError(
                validateComent({
                    ...coments,
                    comentspositive: [e.target.value],
                })
            );
        }
    }


    const handleDeleteSComent = () => {
        setComents({
            ...coments,
            comentspositive: [],
        });
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        // let response = await axios.post(
        //     "http://localhost:5000/api-plants-b6153/us-central1/app/coments/coment",
        //     // "https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/coment",
        //     coments
        // );
        // alert("Comments created")
        if (

            !coments.comentspositive.length ||
            !coments.star
        ) {
            return alert("Missing Data");
        }
        axios.post("http://localhost:5000/api-plants-b6153/us-central1/app/coments/coment", {
            star: coments.star, plantsUID: coments.plantsUID, userUID: coments.userUID,
            comentspositive: coments.comentspositive, userName: coments.userName, userImg: coments.userImg
        })
            .then(() => {
                //setState(res.data)
                alert("Coments Created")
            })
            .then(() => { Navigate(`/plants/details/${id}`) })
    }

    return (
        <div className={s.container}>
            <form className={s.form}>
                <h2>Leave Your Comment</h2>
                <div className={s.image_input}>
                </div>
                <div>
                    <img src={user?.photoURL} alt="do not pose image" />
                </div>
                <div>
                    <h3>{user?.displayName}</h3>
                </div>

                <div >
                    <select onChange={handleSelectComent}>
                        <option value="select">SELECT</option>
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
                            <p>{coments.comentspositive[0]}</p>
                        </div>
                    ) : null}
                    {error.comentspositive && <span className={s.errors}>{error.comentspositive}</span>}
                </div>
                <div className={s.input_container}>
                    <h5> <AiFillStar />
                        <input id="radio1" type="radio" name="star" value="1" onClick={e => handleSelect(e)} />
                    </h5>
                    <h5><AiFillStar /><AiFillStar />
                        <input id="radio2" type="radio" name="star" value="2" onClick={e => handleSelect(e)} />
                    </h5>
                    <h5><AiFillStar /><AiFillStar /><AiFillStar />
                        <input id="radio3" type="radio" name="star" value="3" onClick={e => handleSelect(e)} />
                    </h5>
                    <h5><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                        <input id="radio4" type="radio" name="star" value="4" onClick={e => handleSelect(e)} />
                    </h5>
                    <h5><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                        <input id="radio5" type="radio" name="star" value="5" onClick={e => handleSelect(e)} />
                    </h5>
                </div>
                <div>
                    <button type='button' onClick={handleOnClick} className={s.create_btn}>Send Coments</button>
                </div>
            </form>
        </div>

    )
}




export default Reviews