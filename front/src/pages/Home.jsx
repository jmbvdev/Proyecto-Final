import React from 'react';
import { useSelector } from 'react-redux';
import HomeList from '../components/HomeList';
import PopularPlants from '../components/PopularPlants';



const Home = () => {

  

    return (
        <div className='home'>
          
          <PopularPlants/>
          <HomeList/>
            
        </div>
    );
};

export default Home;