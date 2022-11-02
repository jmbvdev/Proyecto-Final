import React from 'react';
import HomeList from '../components/HomeList';
import Carousel from '../components/Carousel';
import PopularPlants from '../components/PopularPlants';





const Home = ({isSearch}) => {

  

    return (
        <div >     
         
         <Carousel isSearch={isSearch}/>
         
       
          <PopularPlants/>
          <HomeList/>            
          {/* <Comentarios/> */}
          
  
        </div>
    );
};

export default Home;