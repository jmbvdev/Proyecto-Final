import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { FiHeart , FiLogIn} from 'react-icons/fi';
import { HiOutlineShoppingBag} from 'react-icons/hi';
import logo from "../images/logo.jpg"

import  "../styles/nav.css"
import { setSearch } from '../Redux/actions/products';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';



const Nav = ({user, authState, setAuthState, setUser}) => {
 
  
    const [Mobile, setMobile] = useState(false)
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const plants = useSelector(state=>state.shopCartReducer.products)

    function handleSearch() {
     dispatch(setSearch())
      
    }


    const signOutHandler = () => {
      signOut(auth)
      .then(() => {
          setUser(null);
          setAuthState('login');
      })
      .catch((err) => console.log(err));
      
  let total=0
  for (let i = 0; i < plants.length; i++) {
             total+=plants[i].count
    

  }

    return (
        <>
        <nav className='navbar'>
        
          <div className='nav-left'>
          <img className='logo' src={logo} alt="logo" onClick={()=>navigate("/")} />
          <ul className={Mobile ? "nav-links-mobile" : "nav-links"} onClick={() => setMobile(false)}>
            <Link to='/' >
              <li><p className='link'>Home</p></li>
            </Link>
            <Link to='/plants'>
              <li><p className='link'>Plants</p></li>
            </Link>
            <Link to='/about' >
              <li><p className='link'>About</p></li>
            </Link>
            <Link to='/contact'>
              <li><p className='link'>Contact Us</p></li>
            </Link>
            <Link to='/faq' >
              <li><p className='link'>FAQ</p></li>
            </Link>
            <Link to='/delivery' >
              <li><p className='link'>Delivery</p></li>
            </Link>
      
          </ul>

          </div>
         
          <div className='icons-container'>
            {
            authState === 'logged' ?
            <button className='sign-in-button' onClick={signOutHandler}><FiLogIn className='login-icon'/> Sign out </button> : 
            <button className='sign-in-button'><FiLogIn className='login-icon'/> <Link to='/sign-in' className='sing-in-link'>Sign in </Link></button>
            }
            
            <FiHeart className='favorite-icon'/>
            <RiSearchLine onClick={handleSearch} className='search-icon'/>
            <div className='bag' onClick={()=>navigate("/cart")}>
            <HiOutlineShoppingBag className='bag-icon'/>
            <div className='bag-quantity'>
              <p className='total'>{total}</p></div>

            </div>
          <button className='mobile-menu-icon' onClick={() => setMobile(!Mobile)}>
            {Mobile ? "X" : "burger"}
          </button>
          </div>
        </nav>
      </>
    );
};

export default Nav;