import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, setCurrentUser } from "../Redux/actions/users";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getPictureUrl, getPictureUrlUser, setUserImage } from "../firebase/Controllers";
import { useRef } from "react";
import s from "../styles/userEdit.module.css"
import image from "../images/edit.webp"
import { BiUser } from "react-icons/bi";
import {RiLockPasswordFill, RiLockPasswordLine}from "react-icons/ri" 
import { GiPhone } from "react-icons/gi";


const UserEdit = () => {

    const initialState = {
        displayName: "",
        email: "",
        password: "",
        phoneNumber: "",
      };

    const [input, setInput] = React.useState(initialState);
    const [password2, setPassword2] = React.useState("");
    const [photoURL, setphotoURL] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.usersReducer.currentUser);
    const fileRef = useRef(null);

      
    
    React.useEffect(() => {
        setInput((prev) => ({ ...prev, [input.name]: input.value }));
      }, [input.name, input.value]);

      React.useEffect(() => {
        dispatch(setCurrentUser(auth.currentUser))
      }, [user])

      const handleFile = () => {
        if(fileRef.current){
            fileRef.current.click();
        }
      }

      const handleImage = e => {
        const files = e.target.files;
        const fileReader = new FileReader();

        if(fileReader && files && files.length){
            fileReader.readAsArrayBuffer(files[0]);
            fileReader.onload = async () => {
                const userImage = fileReader.result;
                const res = await setUserImage(user.uid, userImage);
                const url = await getPictureUrlUser(user.uid);
                url ? setphotoURL(url) : setphotoURL(null);
            }
        }
      }

      const handleChange = (e) => {
        e.preventDefault();
        //setError(validate({...input, [e.target.name] : e.target.value}))
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    
      const handleOnSubmit = (e) => {
        e.preventDefault();
        
        const updates = {
            displayName: input.displayName !== "" ? input.displayName : user.displayName,
            photoURL: photoURL,
            password: input.password !== "" ? input.password : user.password,
            phoneNumber: input.phoneNumber !== "" ? input.phoneNumber : user.phoneNumber,
        };
        dispatch(editUser(user.uid, updates));
        setInput(initialState);
        setphotoURL(null);
        navigate("/dashboard");
      };

    return(
        <div className={s.container}>
            <div className={s.profile}>
            <form onSubmit={(e) => handleOnSubmit(e)} className={s.specs}>
            <div className={s.input_label}>
                    <p className={s.name_input}>User image:</p>
                <div className={s.input_container} >
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
                    <BiUser className={s.user_icon}/>
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
                <p className={s.name_input}>password</p>

                <div className={s.input_container}>
                    <RiLockPasswordFill  className={s.user_icon}/>
                    <input 
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        placheholder="Password"
                        type="password"
                        className={s.input_text}
                        autoComplete="off"
                        />
                 </div>
                </div>
                <div className={s.input_container}>
                <RiLockPasswordLine  className={s.user_icon}/>
                    <input 
                        name="password2"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        placheholder="Repeat your password"
                        type="password"
                        className={s.input_text}
                        autoComplete="off"
                        />

                </div>
                <div className={s.input_label}>

                    <p className={s.name_input}>phone</p>
                <div className={s.input_container}>
                    <GiPhone className={s.user_icon}/>
                    <input 
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={s.input_text}
                        />
                </div>
                </div>
                
                    <button 
                        type="submit"
                        className={s.update}
                        >
                            UPDATE
                    </button>
             
            </form>
            <img src={image} className={s.calatea} />

            </div>
        </div>
    )
};

export default UserEdit;