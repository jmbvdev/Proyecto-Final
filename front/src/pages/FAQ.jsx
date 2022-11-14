import React from 'react';
import Faq from "react-faq-component";
import s from "../styles/faq.module.css"
import ScrollAnimation from "react-animate-on-scroll"
import logo from "../images/logo-sinfondo.png"
import image from "../images/planterGirl.webp"

const FAQ = () => {
    const data = {
        title: "Frequently Asked Question",
        rows: [
            {
                title: "I don't get much light, what plant do you recommend?",
                content: `Our favorites for lower light are Sansevierias (aka 'Snake Plants') and the ZZ plant. They tolerate low light quite well and are also pretty easy maintenance in general. `,
            },
            {
                title: "What's a good plant for the bathroom?",
                content:
                    "This depends on what your bathroom is like. If you get nice bright light in your bathroom, most plants will be quite happy with the added humidity in the room. There are some plants that need that extra humidity, like Calatheas, Ferns, etc. If you don't have much light, you'll be limited to plants that tolerate lower light.",
            },
            {
                title: "Is there a plant that stays small? ",
                content: `All plants will grow over time. Some grow more slowly than others, but you can expect that pretty much any plant will need to be re-potted to a larger pot at least occasionally.  `,
            },
            {
                title: "How do I know what kind of light I have in my house?  ",
                content: "Most indoor plants want bright, indirect light, which is different than direct sun. Direct sun means the sun is visible in the sky through the window. Bright indirect light is filtered light that's bright, and is usually the kind of light you'll find right near a window or skylight, depending on the direction your window faces and what obstructs the view. The further you get from a window, the lower the light becomes. ",
            },
        ],
    };
    const styles = {
        // bgColor: 'white',
        titleTextColor: "blue",
        rowTitleColor: "blue",
        // rowContentColor: 'grey',
        // arrowColor: "red",
    };
    

    return (
        <div className={s.container}>
             <header className={s.banner}   >
                <ScrollAnimation animateIn="fadeIn" animateOnce={true} className={s.contact} >
                <div className={s.contact}>
                <img src={logo} alt="girl" />
                    <h1>FAQ</h1>
                </div>
          </ScrollAnimation>
                   
          <ScrollAnimation animateIn="fadeInRight" animateOnce={true} className={s.banner_img} >
               
                <img src={image} alt="girl on the phone"   />
          </ScrollAnimation>
            </header>
            <section className={s.section}>
                
            <div className={s.faq}>
              <Faq
                data={data}
                styles={{
                    bgColor: "white",
                    titleTextColor: "#48482a",
                    rowTitleColor: "#78789a",
                    rowTitleTextSize: 'large',
                    rowContentColor: "#48484a",
                    rowContentTextSize: '16px',
                    rowContentPaddingTop: '10px',
                    rowContentPaddingBottom: '10px',
                    rowContentPaddingLeft: '50px',
                    rowContentPaddingRight: '150px',
                    arrowColor: "black",
                   
                    }} 
             
            />

            </div>
            </section>
        </div>
    );
};

export default FAQ;