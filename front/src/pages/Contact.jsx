import React from "react";
import s from "../styles/contact.module.css";
import image from "../images/girlPhone.webp";
import logo from "../images/logo-sinfondo.png";
import indoor from "../images/indoor.webp";
import { FiMail } from "react-icons/fi";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import ScrollAnimation from "react-animate-on-scroll";

const Contact = () => {
  return (
    <div className={s.container}>
      <header className={s.banner}>
        <ScrollAnimation
          animateIn="fadeIn"
          animateOnce={true}
          className={s.contact}
        >
          <div className={s.contact}>
            <img src={logo} alt="girl" />
            <h1>Contact Us</h1>
          </div>
        </ScrollAnimation>

        <ScrollAnimation
          animateIn="fadeInRight"
          animateOnce={true}
          className={s.banner_img}
        >
          <img src={image} alt="girl on the phone" />
        </ScrollAnimation>
      </header>
      <section className={s.section}>
        <div className={s.form}>
          <ScrollAnimation animateIn="fadeInLeft" className={s.contactInfo}>
            <h2>Contact Info</h2>
            <ul>
              <li>
                <MdOutlineLocationOn className={s.location_icon} />
                <span>Buenos Aires, 2912 CA</span>
              </li>
              <li>
                <FiMail className={s.location_icon} />
                <span>calathea_market@outlook.com</span>
              </li>
              <li>
                <HiOutlinePhone className={s.location_icon} />
                <span>+51 770317301</span>
              </li>
            </ul>

            <ul className={s.social}>
              <li>
                <a
                  href="https://www.instagram.com/calatheamarkets/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TiSocialInstagram className={s.social_icon} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/calatheamarketsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithubSquare className={s.social_icon} />
                </a>
              </li>
            </ul>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInRight" className={s.contactForm}>
            <h2>Send a Message</h2>
            <div className={s.box}>
              <div className={s.input_container}>
                <input type="text" required />
                <span>First Name</span>
              </div>
              <div className={s.input_container}>
                <input type="text" required />
                <span>Last Name</span>
              </div>
              <div className={s.input_container}>
                <input type="email" required />
                <span>Email Address</span>
              </div>
              <div className={s.input_container}>
                <input type="text" required />
                <span>Mobile Number</span>
              </div>
              <div className={s.message}>
                <textarea required></textarea>
                <span>Write your message here...</span>
              </div>
              <div className={s.send}>
                <input type="text" value="Send" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};

export default Contact;
