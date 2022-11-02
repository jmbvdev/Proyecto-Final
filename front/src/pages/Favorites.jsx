import React from 'react';
import s from "../styles/favorites.module.css"
import image from "../images/hoya.webp"
import {MdDelete}from "react-icons/md"
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Favorites = () => {
    const user= useSelector(state=>state.usersReducer.currentUser)
    const data=useSelector(state=>state.productsReducer.productsBackUp)
    const [favorites, setFavorites]= useState([])

    useEffect(()=>{
        axios.get(`https://us-central1-api-plants-b6153.cloudfunctions.net/app/favourites/${user.uid}`)
        .then((res)=>{
            let favArray=[]
            res.data.forEach((f)=>{
                favArray=favArray.concat(data.filter(fav=>fav.id===f.id))     
            })
            setFavorites(favArray)
        })
    },[])
    

    return (
        <div className={s.main}>
             <div className={s.title_container}>
             <h3 className={s.title}>Favorites</h3>

             </div>

        <div className={s.container}>
            <div className={s.favorites}>
                <div className={s.left} style={{backgroundImage: `url(${image})`}} > </div>
                <div className={s.right}>
                    <h2>Your favorite plants</h2>
                    <div className={s.favorite_list}>
                        {
                            favorites.map(fav=>{
                                return(
                                    <div className={s.card}>
                                        <img src={fav.data?.image} alt="" />
                                        <div className={s.specs}>
                                          <h4>{fav.data?.name}</h4>
                                           <p>${fav.data.price}</p>
                                              <button><MdDelete className={s.delete}/></button>

                                        </div>

                                    </div>
                                )
                            })
                        }
                   
                   
                        

                    </div>

                </div>

            </div>
        </div>
            
        </div>
    );
};

export default Favorites;