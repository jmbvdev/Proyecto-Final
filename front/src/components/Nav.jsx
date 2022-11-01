import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { FiHeart, FiLogIn } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import logo from "../images/logo-sinfondo.png";
import "../styles/nav.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userOnline, setCurrentUser } from "../Redux/actions/users/index";

const Nav = ({ setIsSearch }) => {
  const [Mobile, setMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.shopCartReducer.products);
  const user = useSelector((state) => state.usersReducer.currentUser);

  const signOutHandler = () => {
    signOut(auth).then(() => {
      console.log(auth)
      dispatch(setCurrentUser(null))
      navigate('/');
    });
  };

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
            <Link to="/">
              <li>
                <p className="link">Home</p>
              </li>
            </Link>
            <Link to="/plants">
              <li>
                <p className="link">Plants</p>
              </li>
            </Link>
            <Link to="/about">
              <li>
                <p className="link">About</p>
              </li>
            </Link>
            <Link to="/contact">
              <li>
                <p className="link">Contact Us</p>
              </li>
            </Link>
            <Link to="/faq">
              <li>
                <p className="link">FAQ</p>
              </li>
            </Link>
            <Link to="/delivery">
              <li>
                <p className="link">Delivery</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="icons-container">
          {user !== null ? (
            <div>
            <Link to="/dashboard">{auth.currentUser.email}</Link>
            <button className="sign-in-button" onClick={signOutHandler}>
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
          <button
            className="mobile-menu-icon"
            onClick={() => setMobile(!Mobile)}
          >
            {Mobile ? "X" : "burger"}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Nav;
