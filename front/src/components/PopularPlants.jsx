import React from 'react';
import img from "../images/popular.jpg"
import s from "../styles/popularPlants.module.css"


const PopularPlants = () => {
    return (
        <div className={s.popular}>
            <img src={img} className={s.image} alt="plant"/>
                <h3 className={s.title}>Most Popular</h3>
            <div className={s.list}>
                <div className={s.container_card}>
                    <div className={s.card}>
                        <div className={s.card_overlay}>
                            <button>more details</button>
                        </div>
                        <img src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera_variant_medium_hyde_mint_f0e6d601-426c-40fe-abc6-b0a1f4dce17b.jpg?v=1665091216" alt="" />
                        <div className={s.specs}>
                            <p>Monstera Deliciosa</p>
                            <b>$80</b>
                        </div>
                    </div>
                </div>
                <div className={s.container_card}>
                    <div className={s.card}>
                    <div className={s.card_overlay}>
                            <button>more details</button>
                        </div>
                        <img src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-spider-plant_medium_grant_cream.jpg?v=1661444123" alt="" />
                        <div className={s.specs}>
                            <p>Faux Spider Plant</p>
                            <b>$65</b>
                        </div>
                    </div>
                </div>
                <div className={s.container_card}>
                    <div className={s.card}>
                    <div className={s.card_overlay}>
                            <button>more details</button>
                        </div>
                        <img src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_mint.jpg?v=1655956902" alt="" />
                        <div className={s.specs}>
                            <p>Money Tree Plant</p>
                            <b>$85</b>
                        </div>
                    </div>
                </div>


            </div>

            
        </div>
    );
};

export default PopularPlants;