import React from 'react';
import s from "../styles/favorites.module.css"
import image from "../images/hoya.webp"
import {MdDelete}from "react-icons/md"

const Favorites = () => {
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
                        <div className={s.card}>
                            <img src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Braided-Money-Tree_burbank_almond.jpg?v=1665085617" alt="" />
                            <div className={s.specs}>
                                <h4>Faux Braided Money Tree</h4>
                                <p>$375</p>
                                <button><MdDelete/></button>
                            </div>
                        </div>
                        

                    </div>

                </div>

            </div>
        </div>
            
        </div>
    );
};

export default Favorites;