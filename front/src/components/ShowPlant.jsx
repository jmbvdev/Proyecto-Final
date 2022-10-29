import React from 'react';

import { GiTable } from "react-icons/gi"
import { TbPlant2 } from "react-icons/tb"
import { FaDog } from "react-icons/fa"
import s from "../styles/showPlant.module.css"


import { AiFillHeart } from 'react-icons/ai';

const ShowPlant = ({ image, name, details, categories, price, logicalDeletion, type, stock, size }) => {
    return (
                <div className={s.container}>

                    <img src={image} alt="" />
                    <div className={s.details}>

                        <h1>{name} </h1>

                        <div>
                            <h4>Description</h4>
                            <p>{details}</p>
                        </div>

                        <div className={s.categories}>
                            {
                                categories && categories?.map((p, i) => {
                                    return (

                                        <div key={i} className={s.categories_container}>
                                            {p.includes("tabletop") ? <GiTable className={s.table} /> : p.includes("pet friendly") ? <FaDog className={s.table} /> : p.includes("easy care") && <TbPlant2 className={s.table} />}
                                            <span>{p.includes("tabletop") ? "TABLETOP" : p.includes("pet friendly") ? "PET FRIENDLY" : p.includes("easy care") && "EASY CARE"}</span>
                                        </div>
                                    );
                                })
                            }

                        </div>
                        
                        <div className={s.price}>
                            <div>
                                <h4>Price</h4>
                                <h3>$ {price}</h3>
                            </div>
                       <div>

                       <div>
                            <h4>Size: </h4>
                            <p>{size}</p>
                        </div>

                        <div>
                            <h4>Stock: </h4>
                            <p>{stock}</p>
                        </div>


                        <div>
                            <h4>Type: </h4>
                            <p>{type}</p>
                        </div>

                        

                        
                        <h4>Show</h4>
                        {logicalDeletion ? <p>OFF</p> : <p>ON</p>}
                       </div>

                       <div>
                        <h4>Type</h4>
                        <p>{type}</p>
                       </div>
                        </div>

                       
                    </div>

                </div>
    );
};

export default ShowPlant;