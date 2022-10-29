import React  from 'react'
import {TiSocialInstagram} from "react-icons/ti"
import {FaGithubSquare} from "react-icons/fa"
import {ImLocation} from "react-icons/im"
import {BsTelephoneFill} from "react-icons/bs"
import {GrMail}from "react-icons/gr"
import {AiFillFacebook}from "react-icons/ai"
import logo from "../images/logo-sinfondo.png"
import s from "../styles/footer.module.css"





const Footer = () => {
    return (
      <footer className={s.footer_distributed}>
        <div className={s.footer_left}>
          <img src={logo} className={s.logo_footer} alt="" />

          <p className={s.footer_company_name}>
            Copyright © 2022 <strong>Calathea Market</strong> All rights
            reserved
          </p>
        </div>

        <div className={s.footer_center}>
          <div>
            <i>
              <ImLocation />
            </i>
            <p>
              <span>Buenos Aires</span>
              Argentina
            </p>
          </div>

          <div>
            <i>
              <BsTelephoneFill />
            </i>
            <p>+51 770317305</p>
          </div>
          <div>
            <i>
              <GrMail />
            </i>
            <p>
              <a href="calatheaMarket@gmail.com">calatheaMarket@gmail.com</a>
            </p>
          </div>
        </div>
        <div className={s.footer_right}>
          <p className={s.footer_company_about}>
            <span>About the company</span>
            <strong>Calathea Market</strong> is an e-commerce created for plant
            lovers, we help you create an environment full of life with plants
            for all tastes such as easy care, pet friendly, indoor, outdoor,
            etc.
          </p>
          <div className={s.footer_icons}>
            <a
              href="https://www.instagram.com/calatheamarkets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TiSocialInstagram />
            </a>
            <a
              href="https://github.com/jmbvdev/Proyecto-Final/tree/main"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubSquare />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillFacebook />
            </a>
          </div>
        </div>
      </footer>
    );
    
}

export default Footer