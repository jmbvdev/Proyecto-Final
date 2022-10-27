import React from 'react';
import HomeList from '../components/HomeList';
import Carousel from '../components/Carousel';
import PopularPlants from '../components/PopularPlants';
import Comentarios from "../components/Comentarios"



const Home = () => {

  

    return (
        <div className='home'>        
          {/* <Carousel/> */}
          <PopularPlants/>
          <HomeList/>            
          {/* <Comentarios/> */}
          
  
        </div>
    );
};

export default Home;