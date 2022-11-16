import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { VscClose } from "react-icons/vsc";
import s from "../styles/searchBox.module.css";
import { useNavigate } from "react-router-dom";
import { clearDetails, GetProductDetails } from "../Redux/actions/products";

const SearchBox = ({ setIsSearch }) => {
  const plants = useSelector((state) => state.productsReducer.productsBackUp);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handelOnChange(e) {
    setSearch(e.target.value);
  }

  function handleClick(id) {
    dispatch(clearDetails());
    setIsSearch();
    navigate(`plants/details/${id}`);
    dispatch(GetProductDetails(id));
    setSearch("");
  }

  const findResults = plants
    .filter((p) => {
      if (!p.data.logicalDeletion) {
        return p.data.name.toLowerCase().includes(search.toLowerCase());
      } else return false;
    })
    .slice(0, 5);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (findResults[0].id && search) {
      dispatch(clearDetails());
      setIsSearch();
      navigate(`plants/details/${findResults[0].id}`);
      dispatch(GetProductDetails(findResults[0].id));
      setSearch("");
    }
  };

  return (
    <div>
      <div className={s.container}>
        <div className={s.button_container}>
          <button onClick={() => setIsSearch()} className={s.back}>
            <VscClose />
          </button>
        </div>
        <form onSubmit={handleOnSubmit} action="" className={s.search}>
          <input
            autoComplete="off"
            className={s.searchTerm}
            type="text"
            value={search}
            onChange={handelOnChange}
            placeholder="search a plant"
            name="q"
          />

          <button type="submit" className={s.searchButton}>
            <RiSearchLine />
          </button>
        </form>
        <div className={s.search_results}>
          {search &&
            findResults.map((p) => {
              return (
                <div
                  onClick={() => {
                    handleClick(p.id);
                  }}
                  className={s.search_card}
                >
                  <img className={s.search_image} src={p.data.image} alt="" />
                  <p>{p.data.name}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className={s.container_search}></div>
    </div>
  );
};

export default SearchBox;
