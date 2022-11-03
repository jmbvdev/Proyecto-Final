import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseLine, RiSearchLine } from "react-icons/ri";
import { FiHeart, FiLogIn } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import logo from "../images/logo-sinfondo.png";
import "../styles/nav.css";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../Redux/actions/users/index";
import Swal from "sweetalert2"
import {  GiHamburgerMenu } from "react-icons/gi";




const Nav = ({ setIsSearch, setIsVideoShow }) => {
  const [Mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.shopCartReducer.products);
  const user = useSelector((state) => state.usersReducer.currentUser);

  const signOutHandler = () => {
    Swal.fire({
      title:"Warning",
      text:"Are you sure you want to logout?",
      icon:"error",
      showDenyButton:true,
      denyButtonText:"No",
      denyButtonColor:"#FF5733",
      confirmButtonText:"Yes",
      confirmButtonColor:"#72CE65"
    }).then(res=>{
      if (res.isConfirmed) {
          signOut(auth).then(() => {
          dispatch(setCurrentUser(null))
          navigate('/');
      });
      }
    })
  };
  function handleMobile() {
    setMobile(!Mobile)
 
  }

  let total = 0;
  for (let i = 0; i < plants.length; i++) {
    total += plants[i].count;
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img
            className="logo"
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <ul
            className={Mobile ? "nav-links-mobile" : "nav-links"}
            onClick={() => setMobile(false)}
          >
            <Link to="/" className="link_mobile">
              <li>
                <p className="link">Home</p>
              </li>
            </Link>
            <Link to="/plants" className="link_mobile">
              <li>
                <p className="link">Plants</p>
              </li>
            </Link>
            <Link to="/about" className="link_mobile">
              <li>
                <p className="link">About</p>
              </li>
            </Link>
            <Link to="/contact" className="link_mobile">
              <li>
                <p className="link">Contact Us</p>
              </li>
            </Link>
            <Link to="/faq" className="link_mobile">
              <li>
                <p className="link">FAQ</p>
              </li>
            </Link>
            <Link to="/delivery" className="link_mobile">
              <li>
                <p className="link">Delivery</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="icons-container">
          {user !== null ? (
            <div className="user">
              <div className="user_name">
                <img src={auth.currentUser.photoURL} alt="" />
            <Link to="/dashboard">{auth.currentUser.displayName.split(" ")[0]}</Link>

              </div>
            <button className="sign-out-button" onClick={signOutHandler}>
              <FiLogIn className="login-icon" /> Sign out{" "}
            </button>
            </div>
          ) : (
            <button className="sign-in-button">
              <FiLogIn className="login-icon" />{" "}
              <Link to="/sign-in" className="sing-in-link">
                Sign in{" "}
              </Link>
            </button>
          )}
          
          <FiHeart className="favorite-icon" onClick={() => navigate("/favorites")} />
          <RiSearchLine className="search-icon" onClick={setIsSearch} />
          <div className="bag" onClick={() => navigate("/cart")}>
            <HiOutlineShoppingBag className="bag-icon" />
            <div className="bag-quantity">
              <p className="total">{total}</p>
            </div>
          </div>
        </div>
          <button
            className="mobile-menu-icon"
            onClick={handleMobile}
          >
            {Mobile ? <RiCloseLine className="close-nav"/> : <GiHamburgerMenu/>}
          </button>
      </nav>
    </>
  );
};

export default Nav;
