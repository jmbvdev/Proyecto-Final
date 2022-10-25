import React  from 'react'
import s from '../styles/Footer.module.css'
import {TfiInstagram} from 'react-icons/tfi'
import {FaGithub} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs'
import {ImWhatsapp} from 'react-icons/im'
import {AiOutlineCopyrightCircle} from 'react-icons/ai'
import {SiGooglemaps} from 'react-icons/si'
import logo from "../images/logo-sinfondo.png"



const Footer = () => {
    return (
        <div className={s.fondo}>
            <div className={s.logo}>
            <img className='logo' src={logo} alt="" />
            </div>
            <div className={s.github}>
                <a href="https://github.com/calatheamarketsapp?tab=repositories" className={s.color}><FaGithub /></a>
            </div>
            <div className={s.instagram}>
            <a href="https://www.instagram.com/calatheamarkets/" className={s.color}><TfiInstagram/></a>
            </div>

            <div className={s.whatsapp}>
            <a href="https://api.whatsapp.com/send?phone=5493492680510" className={s.color}><ImWhatsapp/></a>
            </div>
            <div className={s.twitter}>
            <a href="https://www.google.com/maps/place/Garibaldi+87,+B1878KFA+Quilmes,+Provincia+de+Buenos+Aires,+Argentina/@-34.7248831,-58.260413,17z/data=!3m1!4b1!4m5!3m4!1s0x95a32e6a0d2eec83:0x8641ad7d3a3ce1af!8m2!3d-34.7248875!4d-58.2582243"
             className={s.color}><SiGooglemaps/></a>
            </div>
            <div className={s.copyright}>
            <span>Calathea Market-2022 </span> <AiOutlineCopyrightCircle/>
            </div>
        </div>

    )
    
}

export default Footer