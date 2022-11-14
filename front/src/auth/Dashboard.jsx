import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingBag } from "react-icons/fa";
import { RiCoupon2Fill, RiPlantFill } from "react-icons/ri";
import { BiStats} from "react-icons/bi";
import {IoIosArrowBack, IoIosCreate } from "react-icons/io";
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
            <button onClick={()=>navigate(-1)} className={s.back}>
              <IoIosArrowBack/>
            </button>

          </div>
      <div className={s.profile}>
        <img src={image} alt="" className={s.calatea} />
        <div className={s.specs}>
          <img
            src={user?.photoURL}
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
                onClick={() => navigate("/dashboard/edit")}
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
                <div className={s.admin} onClick={() => navigate("/dashboard/users")}>
                  <FaUserCircle className={s.admin_icon} />
                  <button >
                    USERS
                  </button>
                </div>
                <div className={s.admin} onClick={() => navigate("/dashboard/products")}>
                  <RiPlantFill className={s.admin_icon} />
                  <button >
                    PRODUCTS
                  </button>
                </div>
                <div className={s.admin}  onClick={() => navigate("/manage-order")}>
                  <FaShoppingBag className={s.admin_icon} />
                  <button>
                    ORDERS
                  </button>
                </div>
                <div className={s.admin} onClick={() => navigate("/dashboard/coupons")}>
                  <RiCoupon2Fill className={s.admin_icon} />
                  <button >
                    COUPONS
                  </button>
                </div>
                <div className={s.admin}  onClick={() => navigate("/create")}>
                <IoIosCreate className={s.admin_icon} />
                  <button>CREATE</button>

                </div>
                <div className={s.admin} onClick={() => navigate("/stadistics")}>
                  <BiStats className={s.admin_icon} />
                  <button >
                    STATISTICS
                  </button>
                </div>
              </div>
            ) : role === "moderator" ? (
              <div className={s.btn_container}>
                 <div className={s.admin} onClick={() => navigate("/dashboard/products")}>
                  <RiPlantFill className={s.admin_icon} />
                  <button >
                    PRODUCTS
                  </button>
                </div>
                <div className={s.admin}  onClick={() => navigate("/manage-order")}>
                  <FaShoppingBag className={s.admin_icon} />
                  <button>
                    ORDERS
                  </button>
                </div>

              
              </div>
            ) : role === "user" ? (
              <div className={s.btn_container}>

<div className={s.admin}  onClick={() => navigate("/manage-order")}>
                  <FaShoppingBag className={s.admin_icon} />
                  <button>
                    ORDERS
                  </button>
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
