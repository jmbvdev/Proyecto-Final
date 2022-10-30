import React from 'react';
import HomeList from '../components/HomeList';
import Carousel from '../components/Carousel';
import PopularPlants from '../components/PopularPlants';





const Home = () => {

  

    return (
        <div >     

          <Carousel/>
          <PopularPlants/>
          <HomeList/>            
          {/* <Comentarios/> */}
          
  
        </div>
    );
};

export default Home;