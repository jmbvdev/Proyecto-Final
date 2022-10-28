import React  from 'react'
import {TiSocialInstagram} from "react-icons/ti"
import {FaGithubSquare} from "react-icons/fa"
import {ImLocation} from "react-icons/im"
import {BsTelephoneFill} from "react-icons/bs"
import {GrMail}from "react-icons/gr"
import {AiFillFacebook}from "react-icons/ai"
import logo from "../images/logo-sinfondo.png"
import '../styles/Footer.css'




const Footer = () => {
    return (
        <footer className="footer-distributed">

        <div className="footer-left">
            <img src={logo} className="logo_footer" alt="" />

            <p className="footer-company-name">Copyright © 2022 <strong>Calathea Market</strong> All rights reserved</p>
        </div>

        <div class="footer-center">
            <div>
               <i><ImLocation/></i> 
                <p><span>Buenos Aires</span>
                    Argentina</p>
            </div>

            <div>
            <i><BsTelephoneFill/></i> 
                <p>+51 770317305</p>
            </div>
            <div>
            <i><GrMail/></i> 
                <p><a href="calatheaMarket@gmail.com">calatheaMarket@gmail.com</a></p>
            </div>
        </div>
        <div class="footer-right">
            <p class="footer-company-about">
                <span>About the company</span>
                <strong>Calathea Market</strong> is an e-commerce created for plant lovers, we help you create an environment full of life with plants for all tastes such as easy care, pet friendly, indoor, outdoor, etc. 
            </p>
            <div class="footer-icons">
                <a href="#"><TiSocialInstagram /></a>
                <a href="#"><FaGithubSquare/></a>
                <a href="#"><AiFillFacebook/></a>
            </div>
        </div>
    </footer>


    )
    
}

export default Footer