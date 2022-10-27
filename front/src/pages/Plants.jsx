import React from 'react';
import s from "../styles/plants.module.css"
import logo from "../images/logo-max.png"
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from 'react';
import { GetAllProducts } from '../Redux/actions/products';
import Card from '../components/Card';
import PriceFilter from '../components/PriceFilter';
import Categories from '../components/Categories';
const Plants = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const plants = useSelector(state=>state.productsReducer.allProducts)
    useEffect(()=>{
        if (!plants[0]) {
            dispatch(GetAllProducts())
            
        }
        
    },[plants, dispatch])

    // const plants = [
    //     {
    //         "id": "0w9ZHfy3R2W3H37be3eN",
    //         "data": {
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F0w9ZHfy3R2W3H37be3eN.webp?alt=media&token=b1b0fa89-fc73-49a8-85c5-603091159103",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "name": "Preserved Fern Kokedama",
    //             "planter": "Grant",
    //             "size": [
    //                 "small"
    //             ],
    //             "type": "plant",
    //             "stock": 10,
    //             "price": 75,
    //             "details": "A traditional Japanese art form, the word Kokedama translates to ’moss ball’. There is no upkeep necessary with this preserved fern kokedama simply hang and enjoy, or sit on a flat surface. This is a real kokedama that has been naturally preserved. It is non-toxic and environmentally friendly. Each kokedama is handcrafted and unique natural variations will occur. There might be a slight odor upon unpacking your kokedama, but it will subside in about 3 weeks. Keep it out of direct light and never water."
    //         }
    //     },
    //     {
    //         "id": "1cjkxqu3hsoGzNtU9bQm",
    //         "data": {
    //             "price": 78,
    //             "size": [
    //                 "small",
    //                 "medium",
    //                 "large"
    //             ],
    //             "type": "plant",
    //             "details": "Take a closer look at the Arrowhead White Butterfly, and you’ll find that its leaves actually feature marbling in a variety of vibrant green shades. You can showcase this unique variegation by training your Syngonium podophyllum to climb trellises and ladder stands in the same way it climbs trees in its native rainforests!",
    //             "stock": 10,
    //             "name": "Arrowhead White Butterfly",
    //             "planter": "Grant",
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F1cjkxqu3hsoGzNtU9bQm.webp?alt=media&token=c4a2dabb-e5af-4a3e-8373-d508a621ea3b"
    //         }
    //     },
    //     {
    //         "id": "21UEqHzQwHvXzkC0xVx0",
    //         "data": {
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F21UEqHzQwHvXzkC0xVx0.webp?alt=media&token=4ae762f9-d279-4021-94c5-fa779fb51caf",
    //             "size": [
    //                 "small"
    //             ],
    //             "stock": 10,
    //             "details": "The Vriesea Intenso Orange, or flaming sword houseplant, is one of the showiest bromeliads known for its bright orange spike, lasting as long as 3-6 months. It is a colorful, easy indoor plant that will brighten up any space. Ad",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "type": "plant",
    //             "price": 88,
    //             "planter": "Bryant",
    //             "name": "Bromeliad Vriesea Intenso Orange"
    //         }
    //     },
    //     {
    //         "id": "57cBZwITOSHgtA8h85xD",
    //         "data": {
    //             "planter": "Burbank",
    //             "type": "plant",
    //             "stock": 10,
    //             "details": "If you’ve admired the Ficus elastica’s moody foliage from afar due to its irritating milky sap—meet our Faux Rubber Tree. With this artificial version, you can still get the look without worrying about curious pets or small children getting too close.",
    //             "name": "Faux Rubber Tree",
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F57cBZwITOSHgtA8h85xD.webp?alt=media&token=87092894-2e84-494a-bd4c-0c5dba4bdd89",
    //             "size": [
    //                 "large"
    //             ],
    //             "categories": [
    //                 "pet friendly"
    //             ],
    //             "price": 325
    //         }
    //     },
    //     {
    //         "id": "62vUj8sKaxYG7qgSXKUH",
    //         "data": {
    //             "type": "plant",
    //             "size": [
    //                 "medium",
    //                 "large"
    //             ],
    //             "details": "Nicknamed the swiss cheese plant, the Monstera deliciosa is famous for its quirky natural leaf holes. These holes are theorized to maximize sun fleck capture on the forest floor. Depending on the season and maturity of the plant, your Monstera could arrive with no holes just yet, and be sized to grow alongside you.",
    //             "stock": 10,
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F62vUj8sKaxYG7qgSXKUH.webp?alt=media&token=46c756b0-915f-4f83-853e-e887382459ad",
    //             "price": 80,
    //             "planter": "Grant",
    //             "name": "Monstera Deliciosa"
    //         }
    //     },
    //     {
    //         "id": "83io15EEIxXTP38hfHRa",
    //         "data": {
    //             "name": "String of Hearts",
    //             "stock": 10,
    //             "type": "plant",
    //             "size": [
    //                 "small",
    //                 "medium"
    //             ],
    //             "price": 72,
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F83io15EEIxXTP38hfHRa.webp?alt=media&token=c1bfee40-a2e9-4467-954f-43ae908cc5b2",
    //             "details": "Our String of Hearts is a lovely trailing succulent known for its heart-shaped leaves and tolerant nature. It can propagate quickly due to its shallow roots and ability to easily grow new roots and vines. We recommend putting it on an elevated surface like a bookshelf to give it space to cascade.",
    //             "categories": [
    //                 "tabletop"
    //             ],
    //             "planter": "Hyde"
    //         }
    //     },
    //     {
    //         "id": "8WGwXzHizjN9zZSoNREY",
    //         "data": {
    //             "planter": "Base",
    //             "name": "Faux Phalaenopsis Orchid",
    //             "price": 50,
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F8WGwXzHizjN9zZSoNREY.webp?alt=media&token=140b1c56-2805-4c38-965d-d3328885a92b",
    //             "type": "plant",
    //             "details": "Our Faux Orchid will provide your space with lovely, bright white blooms all year-round. Pair this artificial Phalaenopsis with one of our ceramic planters for a realistic look.",
    //             "size": [
    //                 "small"
    //             ],
    //             "stock": 10
    //         }
    //     },
    //     {
    //         "id": "9K8gDYM2r0hzy3iZvfLr",
    //         "data": {
    //             "details": "Why is the Philodendron our most popular plant year after year? It could be its heart-shaped green leaves, easy-going nature, or quick-growing trailing vines. Snag this low-maintenance houseplant now to bring the outdoors in.",
    //             "stock": 10,
    //             "name": "Philodendron Green",
    //             "planter": "Grant",
    //             "type": "plant",
    //             "size": [
    //                 "small",
    //                 "medium"
    //             ],
    //             "price": 78,
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2F9K8gDYM2r0hzy3iZvfLr.webp?alt=media&token=d753f558-da83-4947-9140-473d74991e59",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "CoXmYetRvrHDC5hlKu6P",
    //         "data": {
    //             "name": "Pink Anthurium",
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2FCoXmYetRvrHDC5hlKu6P.webp?alt=media&token=41f8861d-5356-416e-ad0e-a254ab93dde2",
    //             "price": 88,
    //             "type": "plant",
    //             "stock": 10,
    //             "planter": "Bryant",
    //             "categories": [
    //                 "easy care"
    //             ],
    //             "details": "This bright pink Anthurium lives up to its nickname, the flamingo flower. Rarely without their showy blooms, Anthuriums are known as the world’s longest blooming houseplant. Each bloom can last up to eight weeks, and new ones will pop up often. These aren’t actual flowers, but modified waxy leaves. Anthuriums flourish and bloom best in bright indirect light.",
    //             "size": [
    //                 "small"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "Ev4hJZzH9Of1KgngMfQI",
    //         "data": {
    //             "type": "plant",
    //             "size": [
    //                 "small",
    //                 "medium",
    //                 "large"
    //             ],
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "name": "Parlor Palm",
    //             "planter": "Grant",
    //             "image": "https://firebasestorage.googleapis.com/v0/b/api-plants-b6153.appspot.com/o/plants%2FEv4hJZzH9Of1KgngMfQI.jpg?alt=media&token=17223ec2-7890-4a96-a703-89cdf82a688e",
    //             "details": "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities. ",
    //             "price": 68
    //         }
    //     },
    //     {
    //         "id": "G6LAGxQP0YTQxTDfZN83",
    //         "data": {
    //             "stock": 10,
    //             "details": "The Fiddle Leaf Fig is famous for its broad, vibrant green leaves with prominent veining. It prefers a stable environment and can be fickle when temps fluctuate. Keep it in bright light, and water about once every 1-2 weeks.",
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "planter": "Grant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_fiddle-leaf-fig_variant_small_grant_cream.jpg?v=1665066979",
    //             "size": [
    //                 "medium",
    //                 "large"
    //             ],
    //             "price": 68,
    //             "name": "Fiddle Leaf Fig",
    //             "type": "plant"
    //         }
    //     },
    //     {
    //         "id": "Jg0j2Ds61yrFCcwu63pF",
    //         "data": {
    //             "size": [
    //                 "medium"
    //             ],
    //             "price": 74,
    //             "name": "Button Fern",
    //             "details": "Despite the Button Fern's appearance, with adorable button-like leaflets attached to delicate stems, it is a tough little fern: On the cliffs of its native New Zealand, it can withstand a variety of temperatures and humidity. This plant is pet-friendly!",
    //             "type": "plant",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_button-fern_medium_grant_cream.jpg?v=1653067276",
    //             "stock": 10,
    //             "planter": "Grant"
    //         }
    //     },
    //     {
    //         "id": "KHP7ZfJJIOIUzEmW5QiO",
    //         "data": {
    //             "planter": "Grant",
    //             "categories": [
    //                 "easy care",
    //                 "pet friendly"
    //             ],
    //             "size": [
    //                 "medium"
    //             ],
    //             "price": 72,
    //             "name": "Faux Maranta",
    //             "type": "plant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-maranta_medium_grant_black.jpg?v=1661882705",
    //             "stock": 10,
    //             "details": "Marantas can be finicky, but there is no need to fuss with our faux take on the prayer plant. It even comes nestled in your choice of ceramic planter for a look so convincing that eagle-eyed plant parents will mistake your artificial Maranta for the real thing."
    //         }
    //     },
    //     {
    //         "id": "KZN4scpUJDXKHjy6vrGo",
    //         "data": {
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "stock": 10,
    //             "type": "plant",
    //             "price": 78,
    //             "planter": "Hyde",
    //             "size": [
    //                 "small"
    //             ],
    //             "details": "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
    //             "name": "Alocasia Black Velvet",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_alocasia-black-velvet_small_bryant_cream.jpg?v=1663279869"
    //         }
    //     },
    //     {
    //         "id": "LaGomXA1nhfatA8SACFZ",
    //         "data": {
    //             "categories": [
    //                 "easy care",
    //                 "pet friendly"
    //             ],
    //             "price": 300,
    //             "planter": "Grant",
    //             "stock": 10,
    //             "size": [
    //                 "large"
    //             ],
    //             "details": "Get the look without the fuss with our striking 6 ft tall artificial Fiddle Leaf Fig Tree. No bright light required. Pair it with our Pallas floor planter for a more polished look.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-fiddle-leaf-fig_variant_large_pallas_ginger.jpg?v=1645210384",
    //             "type": "plant",
    //             "name": "Faux Fiddle Leaf Fig Tree"
    //         }
    //     },
    //     {
    //         "id": "OkqJk3mRNCfQfNmWi7wB",
    //         "data": {
    //             "categories": [
    //                 "tabletop"
    //             ],
    //             "type": "plant",
    //             "details": "Add a pop of serenity to your tablescape with this popular Phalaenopsis orchid. One of the easiest varieties to grow as a houseplant—it is affectionately called the beginner orchid. You may notice a small number of blooms on your orchid upon delivery. These blooms will open quicker in a warm indoor setting. It will typically bloom about once a year, for up to three months. After a blooming cycle, the flowers will wilt and fall off. This is the orchid’s way to store up energy to re-bloom again next season.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_petite-sunset-orchid_bryant_cream_variant_580ffda5-510b-4c86-9e71-4be8debe3282.jpg?v=1658848308",
    //             "size": [
    //                 "small"
    //             ],
    //             "stock": 10,
    //             "price": 78,
    //             "name": "Petite Sunset Orchid",
    //             "planter": "Bryant"
    //         }
    //     },
    //     {
    //         "id": "PzUy0pgjO6v2zvpGY0J7",
    //         "data": {
    //             "details": "The Bromeliad Vriesea Vogue is one of the most beautiful and distinctive pet-friendly plants, with a cone-like red and yellow spike that sometimes produces flowers. The colorful bract has earned this bromeliad the nickname Flaming Sword Plant.",
    //             "type": "plant",
    //             "stock": 10,
    //             "price": 88,
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-vriesea-vogue_small_bryant_black.jpg?v=1658331260",
    //             "planter": "Bryant",
    //             "name": "Bromeliad Vriesea Vogue",
    //             "size": [
    //                 "small"
    //             ],
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "RBHFjws0oHeL0LiCRYCl",
    //         "data": {
    //             "details": "Meet the Purple Orchid—a beginner-friendly Phalaenopsis orchid with vivid purple blooms edged in white. Phalaenopsis orchids typically bloom about once a year for up to three months. Upon delivery, you may notice a few buds on your orchid; these blooms will open quicker in a warm indoor setting. After a blooming cycle, the flowers will wilt and fall off, allowing the orchid to store energy to re-bloom again next season. Add bonus: Phalaenopsis orchids are non-toxic, making them a great gift plant and pet lovers.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_purple-orchid_bryant_white_variant.jpg?v=1659650894",
    //             "size": [
    //                 "small"
    //             ],
    //             "name": "Purple Orchid",
    //             "stock": 10,
    //             "planter": "Bryant",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop"
    //             ],
    //             "price": 98,
    //             "type": "plant"
    //         }
    //     },
    //     {
    //         "id": "RoD7CLy4rarGEGli7NBU",
    //         "data": {
    //             "planter": "Bryant",
    //             "type": "plant",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop"
    //             ],
    //             "price": 98,
    //             "name": "Autumn Orchid",
    //             "details": "Our Autumn Orchid features long-lasting, pinkish-orange flowers. As a Phalaenopsis orchid, it is easy to care for and non-toxic (AKA pet-friendly), making it our go-to gift for summer celebrations. Phalaenopsis orchids typically bloom about once a year for up to three months. You may notice a small number of blooms on your orchid upon delivery; these blooms will open quicker in a warm indoor setting. After a blooming cycle, the flowers will wilt and fall off, allowing the orchid to store energy to re-bloom again next season.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_summer-orchid_bryant_cream.jpg?v=1658772070",
    //             "stock": 10,
    //             "size": [
    //                 "small"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "RqotoVnlML9VVIgvdaK0",
    //         "data": {
    //             "type": "plant",
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop"
    //             ],
    //             "details": "This exclusive set is perfect for a small windowsill or sunny space, and hard to kill. You’ll get a variety of miniature succulents with matching planters to display them in.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_succulent-trio_variant_mini_hyde_mint_373331a0-f9bd-4fd0-9097-4eea4b23f127.jpg?v=1657084995",
    //             "price": 98,
    //             "name": "Succulent Assortment with Planters",
    //             "size": [
    //                 "mini"
    //             ],
    //             "planter": "Hyde"
    //         }
    //     },
    //     {
    //         "id": "XbZi4cJxSAohlKrvTZfZ",
    //         "data": {
    //             "details": "The trendy Variegated Monstera Deliciosa can be hard to find and hard to keep alive without plenty of natural light. Opt for our faux version instead. Pair this artificial showstopper with one of our signature planters for a finished look.",
    //             "name": "Faux Variegated Monstera Tree",
    //             "stock": 10,
    //             "categories": [
    //                 "pet friendly"
    //             ],
    //             "type": "plant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Monstera-Tree_burbank_white.jpg?v=1661446656",
    //             "price": 325,
    //             "size": [
    //                 "large"
    //             ],
    //             "planter": "Burbank"
    //         }
    //     },
    //     {
    //         "id": "bKmftYVBj6S0QDajsiIl",
    //         "data": {
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Braided-Money-Tree_burbank_almond.jpg?v=1665085617",
    //             "price": 375,
    //             "categories": [
    //                 "pet friendly"
    //             ],
    //             "details": "Our Faux Money Tree floor plant will bring luck and fortune to even the darkest spaces, no window necessary. Features an artificial braided trunk. Pair it with a planter or basket for a realistic look.",
    //             "type": "plant",
    //             "size": [
    //                 "large"
    //             ],
    //             "stock": 10,
    //             "name": "Faux Braided Money Tree",
    //             "planter": "Burbank"
    //         }
    //     },
    //     {
    //         "id": "bk6UA4LePDp4q5OEKadf",
    //         "data": {
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_peperomia-obtusfolia-green_variant_small_grant_cream.jpg?v=1661867801",
    //             "planter": "Grant",
    //             "size": [
    //                 "small"
    //             ],
    //             "price": 68,
    //             "name": "Peperomia Obtusifolia",
    //             "type": "plant",
    //             "stock": 10,
    //             "details": "The Peperomia obtusifolia, also known as the baby rubber plant, is an easy-going houseplant characterized by its thick, succulent-like green leaves. A popular variety of Peperomia, it does not need much to thrive and might even reward you with white flower spikes once a year.",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "djYwphYDeiRyDh63DXx1",
    //         "data": {
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant-cream.jpg?v=1655956902",
    //             "name": "Money Tree Plant",
    //             "type": "plant",
    //             "size": [
    //                 "small"
    //             ],
    //             "details": "Said to bring good luck and fortune, the Money Tree is the perfect plant to add to any room of your home to create good Feng Shui. It is known for its resilience, ease of growth, and fun braided trunk. ",
    //             "price": 84,
    //             "planter": "Bryant"
    //         }
    //     },
    //     {
    //         "id": "fjzHsO8aAI8NTMNpUIgk",
    //         "data": {
    //             "type": "plant",
    //             "planter": "Hyde",
    //             "name": "Autumn Fern",
    //             "size": [
    //                 "medium"
    //             ],
    //             "stock": 10,
    //             "price": 74,
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_autumn-fern_medium_grant_blush.jpg?v=1665127827",
    //             "details": "The lacey fronds of the Autumn Fern add color, dimension, and texture to your space. Newly unfurled fronds start off copper or bronze, then mature to deep green. It is relatively easy-going for a fern but is happiest in high humidity and indirect light, mimicking the environment of Asia’s cool and shady forests it is native to."
    //         }
    //     },
    //     {
    //         "id": "fmP31TxEyI8zBETeBsKM",
    //         "data": {
    //             "stock": 10,
    //             "price": 88,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop"
    //             ],
    //             "details": "The striking foliage of the Philodendron Imperial Red starts out bright red before maturing to a beautiful burgundy then dark green. This unique tropical plant loves to climb as it grows and would benefit from a coco coir pole, trellis, or similar for support.",
    //             "name": "Philodendron Imperial Red",
    //             "type": "plant",
    //             "size": [
    //                 "small"
    //             ],
    //             "planter": "Bryant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_philodendron-imperial-red_small_bryant_cream.jpg?v=1663279727%20320w"
    //         }
    //     },
    //     {
    //         "id": "gKZ9puXHSoe77hBmf4Ip",
    //         "data": {
    //             "details": "Bring the desert’s calming, earthy energy into your space with our Faux Cactus. Pair it with one of our signature planters for a realistic look and place it in any room of your home—no window required to keep this (artificial) plant happy.",
    //             "categories": [
    //                 "pet friendly",
    //                 "tabletop"
    //             ],
    //             "planter": "Upcycled",
    //             "type": "plant",
    //             "stock": 10,
    //             "name": "Faux Cactus",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Cactus_upcycled_avocado.jpg?v=1661446097",
    //             "size": [
    //                 "medium"
    //             ],
    //             "price": 325
    //         }
    //     },
    //     {
    //         "id": "gYAWgqWRUg0Ek94jo3B1",
    //         "data": {
    //             "type": "plant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_zz-plant_bryant_mint_variant.jpg?v=1665087876",
    //             "details": "The ZZ Plant is characterized by its waxy green leaves above the surface of its potting mix, and its large potato-like rhizomes underneath. These rhizomes store water, making the ZZ a hardy, drought-tolerant houseplant that only needs water every few weeks. ",
    //             "price": 88,
    //             "planter": "Bryant",
    //             "size": [
    //                 "small",
    //                 "large"
    //             ],
    //             "name": "ZZ Plant",
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "pet friendly"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "gp8Ao1jHUlSGX3G8skYe",
    //         "data": {
    //             "price": 78,
    //             "details": "The Ficus Burgundy, or rubber tree, is known for its glossy burgundy leaves and latex sap that was once used in rubber production! This same sap makes the Ficus elastica toxic, so the best practice is to keep it out of the reach of curious pets and small children. Give your Ficus Burgundy plenty of bright indirect light to help it retain its dramatic foliage.",
    //             "size": [
    //                 "small",
    //                 "medium"
    //             ],
    //             "type": "plant",
    //             "stock": 10,
    //             "categories": [
    //                 "pet friendly"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_ficus-burgundy_medium_hyde_olive.jpg?v=1660942048",
    //             "planter": "Hyde",
    //             "name": "Ficus Burgundy"
    //         }
    //     },
    //     {
    //         "id": "jnm2BXg4GTa9waLFYhzL",
    //         "data": {
    //             "stock": 10,
    //             "details": "Our life-like Faux Ric Rac Cactus arrives ready to display in a weathered-looking terracotta pot with a metal and twine hanger. Artificial, it requires almost zero care, making it the perfect plant to hang in windowless bathrooms or hard-to-reach corners of your home.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Hanging-Ric-Rac_variant.jpg?v=1661446470",
    //             "type": "plant",
    //             "name": "Faux Hanging Ric Rac Cactus",
    //             "categories": [
    //                 "easy care",
    //                 "pet friendly"
    //             ],
    //             "planter": "Bryant",
    //             "price": 74,
    //             "size": [
    //                 "medium"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "kHoM19wOB8H21BhHCcfm",
    //         "data": {
    //             "type": "plant",
    //             "name": "Coffee Plant",
    //             "price": 82,
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "details": "You might be surprised to know the same plant that grows your morning coffee beans is a popular, low-maintenance houseplant! Although it’s unlikely this plant will produce berries inside, its attractive shiny green foliage will liven up any interior space.",
    //             "stock": 10,
    //             "planter": "Upcycled",
    //             "size": [
    //                 "small"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_coffee-plant_small_upccyled-planter-saucer_cream.jpg?v=1653602047"
    //         }
    //     },
    //     {
    //         "id": "pU0R2NB1MJOzH8zQatZ2",
    //         "data": {
    //             "type": "plant",
    //             "details": "Affectionately nicknamed the beginner orchid, the popular Phalaenopsis orchid is one of the easiest varieties of orchids to grow as a houseplant. This orchid will typically bloom once a year for up to three months. Upon delivery, you may notice a small number of blooms on your orchid—these blooms will open quicker in a warm, indoor setting. After a blooming cycle, the flowers will wilt and fall off and the orchid will store up energy to re-bloom again next season.",
    //             "categories": [
    //                 "tabletop"
    //             ],
    //             "name": "Petite White Orchid",
    //             "stock": 10,
    //             "price": 78,
    //             "size": [
    //                 "small"
    //             ],
    //             "planter": "Bryant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_petite-white-orchid_bryant_mint_variant.jpg?v=1658946493"
    //         }
    //     },
    //     {
    //         "id": "pgkY9PqgwA5SjsAVx63m",
    //         "data": {
    //             "planter": "Grant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_variant_small_grant_blush.jpg?v=1665090268",
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "size": [
    //                 "small",
    //                 "medium",
    //                 "large"
    //             ],
    //             "name": "Snake Plant Laurentii",
    //             "price": 68,
    //             "details": "The Snake Plant Laurentii, or Sansevieria trifasciata 'Laurentii', is a succulent plant characterized by its upright sword-like leaves with vibrant yellow edges. It is popular for its incredibly easy-going nature (it can tolerate low light and drought) and its air-purifying capabilities. The easiest way to kill this plant is to overcare for it. ",
    //             "type": "plant"
    //         }
    //     },
    //     {
    //         "id": "q4LgE5Zgx89SVODbcQpn",
    //         "data": {
    //             "size": [
    //                 "medium",
    //                 "large"
    //             ],
    //             "stock": 10,
    //             "type": "plant",
    //             "planter": "Hyde",
    //             "name": "Desert Rose",
    //             "details": "Our String of Hearts is a lovely trailing succulent known for its heart-shaped leaves and tolerant nature. It can propagate quickly due to its shallow roots and ability to easily grow new roots and vines. We recommend putting it on an elevated surface like a bookshelf to give it space to cascade.",
    //             "categories": [
    //                 "pet friendly"
    //             ],
    //             "price": 78,
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_desert-rose_medium_hyde_blush.jpg?v=1660570847"
    //         }
    //     },
    //     {
    //         "id": "rdxdgQvp2Qjh7vXI1fx4",
    //         "data": {
    //             "size": [
    //                 "medium"
    //             ],
    //             "stock": 10,
    //             "details": "Spider Plants bring character and color to indoor spaces, and thanks to our faux take on Chlorophytum comosum, you can keep yours looking fresh without having plant-care experience. Pair it with the ceramic planter of your choice.",
    //             "categories": [
    //                 "easy care",
    //                 "pet friendly"
    //             ],
    //             "planter": "Grant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-spider-plant_medium_grant_cream.jpg?v=1661444123",
    //             "type": "plant",
    //             "price": 62,
    //             "name": "Faux Spider Plant"
    //         }
    //     },
    //     {
    //         "id": "sFXZV9qNRlZlMGKbrpDf",
    //         "data": {
    //             "details": "Though the Monstera Ginny, or Rhaphidophora tetrasperma, resembles its distant cousin the Monstera Deliciosa, it has its own unique personality and is most often seen climbing moss poles, trellises, and stakes.",
    //             "price": 80,
    //             "name": "Monstera Deliciosa",
    //             "planter": "Hyde",
    //             "stock": 10,
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_monstera-ginny_medium_hyde_olive.jpg?v=1662048565",
    //             "size": [
    //                 "medium"
    //             ],
    //             "type": "plant",
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "sYvPukOzQ08RxxplviFH",
    //         "data": {
    //             "type": "plant",
    //             "planter": "Hyde",
    //             "details": "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities. ",
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_echeveria-lola_variant_mini_hyde_blush.jpg?v=1662564995",
    //             "size": [
    //                 "mini"
    //             ],
    //             "price": 48,
    //             "name": "Echeveria Lola"
    //         }
    //     },
    //     {
    //         "id": "t40J4slRQXsw1ZeWJDrv",
    //         "data": {
    //             "details": "The Dracaena marginata, or Dragon Tree, is a popular low-maintenance plant native to Madagascar. Its unique silhouette and height make it our go-to pick for upgrading any corner!",
    //             "name": "Dracaena Marginata",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop"
    //             ],
    //             "planter": "Hyde",
    //             "size": [
    //                 "medium"
    //             ],
    //             "price": 78,
    //             "stock": 10,
    //             "type": "plant",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_dracaena-marginata_medium_hyde_cream.jpg?v=1655959304"
    //         }
    //     },
    //     {
    //         "id": "xaUQI8u0WZCWdWqbK20K",
    //         "data": {
    //             "categories": [
    //                 "pet friendly"
    //             ],
    //             "type": "plant",
    //             "planter": "Base",
    //             "stock": 10,
    //             "size": [
    //                 "large"
    //             ],
    //             "details": "Our Faux Floor Cactus will bring the desert’s warm and calming energy into your home. No need to worry about providing direct light or arid conditions—this artificial beauty can be a showstopper in any room. Pair with a planter for a finished look.",
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_Faux-Floor-Cactus_growpot.jpg?v=1661782657",
    //             "name": "Faux Floor Cactus",
    //             "price": 325
    //         }
    //     },
    //     {
    //         "id": "xxEkK5S7C7Wgg4guGxcZ",
    //         "data": {
    //             "planter": "Bryant",
    //             "size": [
    //                 "small"
    //             ],
    //             "price": 88,
    //             "name": "Calathea Rattlesnake",
    //             "type": "plant",
    //             "stock": 10,
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_calathea-rattlesnake_small_bryant_black.jpg?v=1663279341",
    //             "details": "The Calathea Rattlesnake is known for its long, wavy green leaves with a brushstroke pattern resembling reptile skin. It raises and lowers these leaves from day to night, a phenomenon called nyctinasty and the source behind its nickname prayer plant. "
    //         }
    //     },
    //     {
    //         "id": "y3HtBLS1NKGAA8iXEGZh",
    //         "data": {
    //             "type": "plant",
    //             "name": "Hoya Heart",
    //             "planter": "Hyde",
    //             "stock": 10,
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_hoya-heart_variant_mini_hyde_blush.jpg?v=1650982114",
    //             "categories": [
    //                 "easy care",
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "details": "The Hoya kerrii is commonly called the Hoya Heart because of its green heart-shaped leaves. This single leaf cutting is a fun, whimsical way to show your plant love. It is partially rooted but does not have a node. It will stay as an adorable heart-shaped leaf for years to come. ",
    //             "price": 48,
    //             "size": [
    //                 "mini"
    //             ]
    //         }
    //     },
    //     {
    //         "id": "zUw4AIIYnywpaWj9hfAk",
    //         "data": {
    //             "size": [
    //                 "small"
    //             ],
    //             "type": "plant",
    //             "categories": [
    //                 "tabletop",
    //                 "pet friendly"
    //             ],
    //             "details": "The “pink” in Bromeliad Antonio Pink describes the fuchsia bracts found in this cultivar, which sometimes produce short-blooming purple flowers. Its vibrant bract also gives it its nickname, the Pink Quill Plant. This plant is pet-friendly!",
    //             "name": "Bromeliad Antonio Pink",
    //             "price": 88,
    //             "stock": 10,
    //             "image": "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-pink-antonio_small_bryant_mint.jpg?v=1658331221",
    //             "planter": "Bryant"
    //         }
    //     }
    // ]
//     let arr=[]
//   for (let i = 0; i < plants.length; i++) {
 
//     arr.push(plants[i].data.price)
//   }
// console.log(arr.sort((a,b)=>a-b))
//console.log(plants)

    return (
       
            <>
               {
                plants.length ? plants[0].hasOwnProperty("message")? <h2>{plants[0].message}</h2>:<div className={s.plants}>
                <div className={s.banner}>
                   <img src={logo} alt="" />
                    <button className={s.contact} onClick={()=>navigate("/contact")}>CONTACT US</button>
               
    
                </div>
                <div className={s.list_container}>
                    <div className={s.list_title}>
                        <div className={s.filters_container}>
                           <PriceFilter />
                           <Categories/>
    
                        </div>
                        <h3 className={s.title}>All Plants</h3>
                        <div className={s.list}>
                            {/* {
                                plants.message&& <h1>{plants.message}</h1>
                            } */}
                       {
                        plants.map((plant)=>(
                            <Card key={plant.id} id={plant.id} plant={plant.data}/>
                        ))
                       }
    
                        </div>
                    </div>
                
    
                </div>
            </div>: <h2>gfd</h2>
            }
            </>

        
      
    );
};

export default Plants;