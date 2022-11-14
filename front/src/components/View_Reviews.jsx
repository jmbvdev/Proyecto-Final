import React from 'react'
import {useNavigate} from "react-router-dom"
import CardComment from './CardComment';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from "react-icons/fa"
import axios from "axios";
import s from "../styles/review.module.css"
import Swal from "sweetalert2";




function View_Reviews({view,setView, user,userUID,comentid}) {

  const navigate=useNavigate()

  
  function handleDeleteButton(comentid, userUID) {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this comment?",
      icon: "question",
      showDenyButton: true,
      denyButtonText: "Cancel",
      denyButtonColor: "#72CE65",
      confirmButtonText: "Delete",
      confirmButtonColor:  "#FF5733",
     
    })
    .then((res)=>{
    if (userUID === user)
   
      axios
        .delete(
          `http://localhost:5000/api-plants-b6153/us-central1/app/coments/${comentid}`
        )
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: "Your comment has been deleted",
            icon: "success",
            confirmButtonText: "ok",
            confirmButtonColor: "rgb(9, 102, 74)",
                    })

        });
    setView(view.filter((e) => e.data.userUID !== user))

    if (userUID !== user) {
      Swal.fire({
        title: "Wait...",
        text: "You can't delete someone else's comment",
        icon: "failure",
        showDenyButton: false,
        denyButtonText: "",
        denyButtonColor: "rgba(11, 115, 147, 0.713)",
        confirmButtonText: "Accept",
        confirmButtonColor: "rgb(9, 102, 74)",
      });
    }
  })
  }

  
  function handleUpdateButton(comentid,userUID,plantsUID) {

    navigate(`/update/${comentid}/${plantsUID}`);
      
    }

  
  

  return (


    <div className={s.reviews}>
        <h3>Your opinion is important for us!</h3>
        <div className={s.reviews_list}>

        {view?.map((e, i) => (
          <CardComment key={i} image={e.data?.userImg} name={e.data?.userName} quote={e.data?.comentspositive} rate={e.data?.star}

            borrar={user===e.data?.userUID ?<button onClick={() => { handleDeleteButton(e.comentid, e.data.userUID) }} className={s.delete} ><MdDeleteForever /></button>:null}
            edit={user===e.data?.userUID?<button  onClick={()=>handleUpdateButton(e.comentid,e.data?.userUID,e.data?.plantsUID)}><FaRegEdit/></button>:null}
            // borrar={<button onClick={() => { handleDeleteButton(e.comentid, e.data.userUID) }} className={s.delete} ><MdDeleteForever /></button>}
          />

        ))}
   
        </div>
   

    </div>


  )
}

export default View_Reviews