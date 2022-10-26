import React from 'react';
import { useSelector } from 'react-redux';
import HomeList from '../components/HomeList';
import Carousel from '../components/Carousel';
import PopularPlants from '../components/PopularPlants';


const Home = () => {

  

    return (
        <div className='home'>        
          <Carousel/>
          <PopularPlants/>
          <HomeList/>            
        </div>
    );
};

export default Home;