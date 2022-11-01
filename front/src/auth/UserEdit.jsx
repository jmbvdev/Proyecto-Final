import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, setCurrentUser } from "../Redux/actions/users";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getPictureUrl, getPictureUrlUser, setUserImage } from "../firebase/Controllers";
import { useRef } from "react";



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
        <div>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div>
                    <label>User Name:</label>
                    <input
                        name="displayName"
                        value={input.displayName}
                        onChange={handleChange}
                        placeholder="User name"/>
                </div>
                <div>
                    <label>User password:</label>
                    <input 
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        placheholder="Password"
                        type="password"
                        />
                    <input 
                        name="password2"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        placheholder="Repeat your password"
                        type="password"
                        />
                </div>
                <div>
                    <label>User phone Number:</label>
                    <input 
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        />
                </div>
                <div>
                    <label>User image:</label>
                    <button type="button" onClick={handleFile}></button>
                    <input 
                        name="photoURL"
                        ref={fileRef}
                        type="file"
                        onChange={handleImage}
                        />
                </div>
                <div>
                    <button 
                        type="submit"
                        >
                            UPDATE
                    </button>
                </div>
            </form>
        </div>
    )
};

export default UserEdit;