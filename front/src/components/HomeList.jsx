import React from 'react';
import s from "../styles/homeList.module.css"
import Card from './Card';

import CardHome from './CardHome';
import { AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom';

const HomeList = () => {

    const plants=[
        {
            name: "Ficus Burgundy",
            price: 78,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-burgundy_medium_hyde_olive.jpg?v=1660942048",
            details:
              "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
            stock: 10,
            planter: "Hyde",
            size:["small", "medium"],
            categories:["pet friendly"]
          },
          {
            name: "Alocasia Black Velvet",
            price: 78,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_alocasia-black-velvet_small_bryant_cream.jpg?v=1663279869",
            details:
              "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
            stock: 10,
            planter: "Hyde",
            size:["small"],
            categories:["tabletop","pet friendly"]
          },
          {
            name: "Petite White Orchid",
            price: 78,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_petite-white-orchid_bryant_mint_variant.jpg?v=1658946493",
            details:
              "Affectionately nicknamed the beginner orchid, the popular Phalaenopsis orchid is one of the easiest varieties of orchids to grow as a houseplant. This orchid will typically bloom once a year for up to three months. Upon delivery, you may notice a small number of blooms on your orchid—these blooms will open quicker in a warm, indoor setting. After a blooming cycle, the flowers will wilt and fall off and the orchid will store up energy to re-bloom again next season.",
            stock: 10,
            planter: "Bryant",
            size:["small"],
            categories:["tabletop"]
          },
          {
            name: "Petite Sunset Orchid",
            price: 78,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_petite-sunset-orchid_bryant_cream_variant_580ffda5-510b-4c86-9e71-4be8debe3282.jpg?v=1658848308",
            details:
              "Add a pop of serenity to your tablescape with this popular Phalaenopsis orchid. One of the easiest varieties to grow as a houseplant—it is affectionately called the beginner orchid. You may notice a small number of blooms on your orchid upon delivery. These blooms will open quicker in a warm indoor setting. It will typically bloom about once a year, for up to three months. After a blooming cycle, the flowers will wilt and fall off. This is the orchid’s way to store up energy to re-bloom again next season.",
            stock: 10,
            planter: "Bryant",
            size:["small"],
            categories:["tabletop"]
          },
          {
            name: "Coffee Plant",
            price: 82,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_small_upccyled-planter-saucer_cream.jpg?v=1653602047",
            details:
              "You might be surprised to know the same plant that grows your morning coffee beans is a popular, low-maintenance houseplant! Although it’s unlikely this plant will produce berries inside, its attractive shiny green foliage will liven up any interior space.",
            stock: 10,
            planter: "Upcycled",
            size:["small"],
            categories:["tabletop", "pet friendly"]
          },
          {
            name: "Monstera Deliciosa",
            price: 80,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera-ginny_medium_hyde_olive.jpg?v=1662048565",
            details:
              "Though the Monstera Ginny, or Rhaphidophora tetrasperma, resembles its distant cousin the Monstera Deliciosa, it has its own unique personality and is most often seen climbing moss poles, trellises, and stakes.",
            stock: 10,
            planter: "Hyde",
            size:["medium"],
            categories:["tabletop","pet friendly"]
          },
          {
            name: "Bromeliad Vriesea Intenso Orange",
            price: 88,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-vriesea-intenso-orange_small_bryant_cream_variant.jpg?v=1655215164",
            details:
              "The Vriesea Intenso Orange, or flaming sword houseplant, is one of the showiest bromeliads known for its bright orange spike, lasting as long as 3-6 months. It is a colorful, easy indoor plant that will brighten up any space. Ad",
            stock: 10,
            planter: "Bryant",
            size:["small"],
            categories:["easy care","tabletop","pet friendly"]
          },
          {
            name: "Button Fern",
            price: 74,
            image: "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_button-fern_medium_grant_cream.jpg?v=1653067276",
            details:
              "Despite the Button Fern's appearance, with adorable button-like leaflets attached to delicate stems, it is a tough little fern: On the cliffs of its native New Zealand, it can withstand a variety of temperatures and humidity. This plant is pet-friendly!",
            stock: 10,
            planter: "Grant",
            size:["medium"],
            categories:["easy care","tabletop","pet friendly"]
          }
    ]
    return (
        <>
       
           <h3 className={s.title}>All Plants</h3> 
        <div className={s.container}>
           <div className={s.list}>
            {
                plants.map(plant=>(
                    <CardHome key={plant.name} plant={plant}/>
                ))
            }
           </div>
            
        </div>
           <div className={s.show}>
            <Link className={s.show_a} to="/plants">show all   <AiOutlineRight className={s.show_arrow} /></Link>
          
           </div>
        
        </>
    );
};

export default HomeList;