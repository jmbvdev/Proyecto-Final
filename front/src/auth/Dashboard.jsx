import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { FaUserCircle, FaShoppingBag } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";

import s from "../styles/dashboard.module.css";
import image from "../images/profile.webp";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
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
      <div className={s.profile}>
        <img src={image} alt="" className={s.calatea} />
        <div className={s.specs}>
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://www.rdssistemas.com.ar/wp-content/uploads/2020/11/user4-400x400.png";
            }}
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
                <div className={s.admin}>
                  <FaUserCircle className={s.admin_icon} />
                  <button onClick={() => navigate("/dashboard/users")}>
                    USERS
                  </button>
                </div>
                <div className={s.admin}>
                  <RiPlantFill className={s.admin_icon} />
                  <button onClick={() => navigate("/dashboard/products")}>
                    PRODUCTS
                  </button>
                </div>
                <div className={s.admin}>
                  <FaShoppingBag className={s.admin_icon} />
                  <button onClick={() => navigate("/manage-order")}>
                    ORDERS
                  </button>
                </div>
                <div className={s.admin}>
                  <FaShoppingBag className={s.admin_icon} />
                  <button onClick={() => navigate("/dashboard/coupons")}>
                    COUPONS
                  </button>
                  <RiPlantFill className={s.admin_icon} />
                  <button onClick={() => navigate("/create")}>CREATE</button>
                </div>
                <div className={s.admin}>
                  <RiPlantFill className={s.admin_icon} />
                  <button onClick={() => navigate("/stadistics")}>
                    STATISTICS
                  </button>
                </div>
              </div>
            ) : role === "moderator" ? (
              <div className={s.admin}>
                <button onClick={() => navigate("/dashboard/products")}>
                  PRODUCTS
                </button>
                <button onClick={() => navigate("/manage-order")}>
                  ORDERS
                </button>
              </div>
            ) : role === "user" ? (
              <button onClick={() => navigate(`/orders/${user.uid}`)}>
                ORDERS
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
