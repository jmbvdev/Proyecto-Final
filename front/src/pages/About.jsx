import React from 'react';
import s from "../styles/about.module.css"
import image from "../images/plantgirl.webp"
import logo from "../images/logo-sinfondo.png"
import girl from "../images/hanging.webp"
import big from "../images/big.webp"
import cat from "../images/cat.webp"
import ScrollAnimation from 'react-animate-on-scroll';


const About = () => {
    return (
      <div className={s.container}>
        <header className={s.banner}>
          <ScrollAnimation animateIn="fadeIn"className={s.contact } animateOnce={true}>
          <div className={s.contact}>
            <img src={logo} alt="" />
            <h1>About Us</h1>
          </div>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInRight" animateOnce={true}className={s.image_banner}>
          <img src={image} alt="girl on the phone" />
            </ScrollAnimation>
        </header>
        <ScrollAnimation animateIn="fadeIn"  className={s.about} >
        
        <ScrollAnimation animateIn="fadeInLeft"  className={s.image} >
          <img src={girl} alt="girl"  />
          </ScrollAnimation>
          <div className={s.about_main}>
            <ScrollAnimation animateIn="fadeInRight" >
              <p>
                <strong>Calathea Market</strong> is an e-commerce created for
                plant lovers, we help you create an environment full of life
                with plants for all tastes such as easy care, pet friendly,
                indoor, outdoor, etc.
              </p>
            </ScrollAnimation>
          </div>
          </ScrollAnimation>

          <ScrollAnimation animateIn="fadeIn" animateOnce={true} className={s.about_reverse} >
        
 
          <div className={s.about_main_reverse}>
            <ScrollAnimation animateIn="fadeInLeft" animateOnce={true} >
              <p>
                <strong>Large plants</strong> have a higher volume of potting mix given their bigger grow pot or planter, which means they'll generally need less frequent waterings
              </p>
            </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="fadeInRight" animateOnce={true} className={s.image_reverse} >
          <img src={big} alt="big"  />
          </ScrollAnimation>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" animateOnce={true} className={s.about_cat} >
        
        <ScrollAnimation animateIn="fadeInLeft" animateOnce={true} className={s.image} >
          <img src={cat} alt="cat"  />
          </ScrollAnimation>
          <div className={s.about_main}>
            <ScrollAnimation animateIn="fadeInRight" animateOnce={true} >
              <p>
                <strong>Pet-friendly</strong> plants to avoid such a catastrophe, and their expanded offerings are a welcome sight for pets and pet lovers alike.
              </p>
            </ScrollAnimation>
          </div>
          </ScrollAnimation>
         
        
      </div>
    );
};

export default About;