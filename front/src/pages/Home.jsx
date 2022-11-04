import React from 'react';
import HomeList from '../components/HomeList';
import Carousel from '../components/Carousel';
import PopularPlants from '../components/PopularPlants';
import Discount from '../components/Discount';





const Home = ({isSearch}) => {

  

    return (
        <div >     
         <Discount/>
         <Carousel isSearch={isSearch}/>
         
       
          <PopularPlants/>
          <HomeList/>            
          {/* <Comentarios/> */}
          
  
        </div>
    );
};

export default Home;