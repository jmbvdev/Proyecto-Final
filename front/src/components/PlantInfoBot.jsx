import React from "react";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { GetProductDetails } from "../Redux/actions/products";
import s from "../styles/plantInfoBot.module.css";

const PlantInfoBot = () => {
  const plant = useSelector((state) => state.productsReducer.productsBackUp);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const searchedPlant = plant.find((p) =>
    p.data?.name?.toLowerCase().includes(search.toLowerCase())
  );
  function onClick(e) {
    e.preventDefault();
    dispatch(GetProductDetails(searchedPlant?.id));
 
  }
  const plantDetail = useSelector(
    (state) => state.productsReducer.productDetails.data
  );
  const details=  useSelector(
    (state) => state.productsReducer.productDetails
  );

  return (
    <div className={s.container}>
      <form action="">
        <div className={s.search}>
          <input
            type="text"
            onChange={handleSearch}
         
            placeholder="type a name"
          />
          <button type="submit" onClick={onClick}>
            {" "}
            <HiSearch className={s.search_icon} />
          </button>
        </div>
      </form>
      <h4>{plantDetail?.name}</h4>
      {plantDetail?.image && (
        <img src={plantDetail?.image} alt="" className={s.image} />
      )}
      <p>{search==="" && !details?.hasOwnProperty("id")&& !plantDetail?.details.length? "Please type the name of a plant and click on the search icon to see the description" :null}</p>
      <p>
        {
          plantDetail?.hasOwnProperty("details") &&plantDetail?.details
          }
          {
             !plantDetail?.details.length && details?.hasOwnProperty("id") ?"this plant is not in our store":null
          }
     
      </p>
    </div>
  );
};

export default PlantInfoBot;
