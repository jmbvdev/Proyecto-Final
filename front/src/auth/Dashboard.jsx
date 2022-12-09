import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingBag } from "react-icons/fa";
import { RiCoupon2Fill, RiPlantFill } from "react-icons/ri";
import avatar from "../images/avatar 1.gif";
import { BiStats } from "react-icons/bi";
import { IoIosArrowBack, IoIosCreate } from "react-icons/io";
import s from "../styles/dashboard.module.css";
import image from "../images/profile.webp";

const Dashboard = () => {
  const user = useSelector((state) => state.usersReducer.currentUser);
  const [role, setRole] = React.useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    if (user) {
      setRole(user.role[0]);
      if (user.role[0] === "admin") setIsAdmin(true);
    }
  }, [user]);

  const navigate = useNavigate();

  return (
    <div className={s.container}>

           <div className={s.button_container}>
            <button onClick={()=>{
              navigate(-1)
              window.scrollTo(0, {behavior: 'smooth'})
              }} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>

      <div className={s.profile}>
        <img src={image} alt="" className={s.calatea} />
        <div className={s.specs}>
          <img
            src={user?.photoURL || avatar}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "https://i.stack.imgur.com/4powQ.gif";
            }}
            alt={user?.displayName}
            className={s.profile_pic}
          />
          <h2>{user?.displayName}</h2>
          <div className={s.text_specs}>
            <p>
              <strong>Email: </strong>
              {user?.email}
            </p>
            <div className={s.container_btn}>
              <button
                onClick={() => {
                  navigate("/dashboard/edit")
                  window.scrollTo(0, {behavior: 'smooth'})
              }}
                className={s.edit_btn}
              >
                CLICK TO EDIT
              </button>
              {/* {role === "admin" && (
                <div className={s.admin}>
                  <FaUserCircle className={s.admin_icon} />
                  <button onClick={() => navigate("/dashboard/admin")}>
                    ADMIN
                  </button>
                </div>
              )} */}
            </div>
            {role === "admin" ? (
              <div className={s.btn_container}>
                <div className={s.admin} onClick={() => {
                  navigate("/dashboard/users")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>

                  <FaUserCircle className={s.admin_icon} />
                  <button>USERS</button>
                </div>

                <div className={s.admin} onClick={() => {
                  navigate("/dashboard/products")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>

                  <RiPlantFill className={s.admin_icon} />
                  <button>PRODUCTS</button>
                </div>

                <div className={s.admin}  onClick={() => {
                  navigate("/manage-order")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>

                  <FaShoppingBag className={s.admin_icon} />
                  <button>ORDERS</button>
                </div>

                <div className={s.admin} onClick={() => {
                  navigate("/dashboard/coupons")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>

                  <RiCoupon2Fill className={s.admin_icon} />
                  <button>COUPONS</button>
                </div>

                <div className={s.admin}  onClick={() => {
                  navigate("/create")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>
                <IoIosCreate className={s.admin_icon} />

                  <button>CREATE</button>
                </div>

                <div className={s.admin} onClick={() => {
                  navigate("/stadistics")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>

                  <BiStats className={s.admin_icon} />
                  <button>STATISTICS</button>
                </div>
              </div>
            ) : role === "moderator" ? (
              <div className={s.btn_container}>

                 <div className={s.admin} onClick={() => {
                  navigate("/dashboard/products")
                  window.scrollTo(0, {behavior: 'smooth'})
                }}>

                  <RiPlantFill className={s.admin_icon} />
                  <button>PRODUCTS</button>
                </div>

                <div className={s.admin}  onClick={() => {
                  navigate("/manage-order")
                  window.scrollTo(0, {behavior: 'smooth'})  
                }}>

                  <FaShoppingBag className={s.admin_icon} />
                  <button>ORDERS</button>
                </div>
              </div>
            ) : role === "user" ? (
              <div className={s.btn_container}>


<div className={s.admin}  onClick={() => {
  navigate(`/orders/${user?.uid}`)
  window.scrollTo(0, {behavior: 'smooth'})
}}>

                  <FaShoppingBag className={s.admin_icon} />
                  <button>ORDERS</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
