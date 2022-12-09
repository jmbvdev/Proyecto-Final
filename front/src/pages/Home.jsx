import React from 'react';
import HomeList from '../components/HomeList';
import Carousel from '../components/Carousel';
import PopularPlants from '../components/PopularPlants';
import Discount from '../components/Discount';
import ChatBot from 'react-simple-chatbot';
import s from "../styles/home.module.css"
import { ThemeProvider } from 'styled-components'
import chatbot from "../images/chatbot.png"
import { useNavigate } from 'react-router-dom';
import {FcPhoneAndroid}from "react-icons/fc"
import { AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import {IoMail}from "react-icons/io5"
import coupon from "../images/gif/coupon.gif"
import register from "../images/gif/register.gif"
import PlantInfoBot from '../components/PlantInfoBot';

const theme = {
    background: '#f5f8fb',
    headerBgColor: '#466b0f',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#659c12',
    botFontColor: '#fff',
    userBubbleColor: '#2e2d39', 
    userFontColor: '#fff',
   
}



const Home = ({isSearch}) => {
  const navigate= useNavigate()
   
    const steps = [
        {
          id: '0',
          message: 'Hello, Welcome to Calathea Market!',
          delay:2000,
          trigger: '1',
        },
        {
          id: '1',
          delay:1000,
          message: 'Whats your Name?',
          trigger: '2',
        },
        {
            id:"2",
            user:true,
            trigger:"3"
        },
        {
            id:"3",
            message: "Hi {previousValue}, nice to meet you!",
            trigger:"4"
        },
        {
          id:"4",
          message:"Please tell me how can I help you",
          trigger:"5"
        },
        {
          id:"5",
          options: [
            { value: 1, label: 'Wiki', trigger: '9' },
            { value: 2, label: 'Guide', trigger: '8' },
            { value: 3, label: 'Buy Plants', trigger: '6' },
            { value: 4, label: 'Contact', trigger: '7' },
          ],
        },
        {
          id:"other",
          message:"Is there anything else I can help you?",
          trigger:"other_option"

        },
        {
          id:"other_option",
          options: [
            { value: 1, label: 'Wiki', trigger: '9' },
            { value: 2, label: 'Guide', trigger: '8' },
            { value: 3, label: 'Buy Plants', trigger: '6' },
            { value: 4, label: 'Contact', trigger: '7' },
          ],

        },
        {
          id:"6",
          component: (
            <div className={s.buy_plants} > 
            <button onClick={()=>{
              navigate("/plants")
              window.scrollTo(0, {behavior: 'smooth'})
              }}>
                Go to plants
              </button>
           

           </div>
          ),
          trigger:"other"
        },
        {
          id:"7",
          component: (
            <div className={s.contact}> 
              <h4>Contact Us</h4>
            <div className={s.phone}>
              <FcPhoneAndroid className={s.phone_icon}/>
              <p>+51 770317300</p>
            </div>
            <div className={s.phone}>
              <IoMail className={s.phone_icon}/>
              <p>calatheaMarket@gmail.com</p>
            </div>
            <div className={s.social}>
              <a
                href="https://www.instagram.com/calatheamarkets/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram/>
              </a>
              <a
                href="https://github.com/jmbvdev/Proyecto-Final/tree/main"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub/>
              </a>

            </div>

           </div>
          ),
          trigger:"other"

        },
        {
          id:"8",
          options: [
            { value: 1, label: 'Coupon', trigger: 'coupon' },
            { value: 2, label: 'Register', trigger: 'register' },
          ],
        },
        {id:"coupon",
        component:(
          <div  className={s.coupon}   style={{backgroundImage: `url(${coupon})`}}>

          </div>
        ),
        trigger:"other"

        },
        {id:"register",
        component:(
          <div  className={s.coupon}   style={{backgroundImage: `url(${register})`}}>

          </div>
        ),
        trigger:"other",

        },
        {id:"9",
        component:(
          <PlantInfoBot/>
        ),
        trigger:"other",

        }

      ];
  

    return (
        <div className={s.container} > 
        
            <ThemeProvider theme={theme}>
             <div className={s.bot}>
            <ChatBot steps={steps} floating={true} botAvatar={chatbot} headerTitle={"Calathea Bot"} />
            </div>   

            </ThemeProvider>
          
           <div>

         <Discount/>
         <Carousel isSearch={isSearch}  />
       
          <PopularPlants/>
          <HomeList/>            
      
          
           </div>
  
        </div>
    );
};

export default Home;