import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import s from "../styles/searchBox.module.css";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ setIsSearch }) => {
  const plants = useSelector((state) => state.productsReducer.productsBackUp);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handelOnChange(e) {
    setSearch(e.target.value);
  }

  function handleClick(id) {
    setIsSearch();
    navigate(`plants/details/${id}`);
    setSearch("");
  }

  const findResults = plants
    .filter((p) => {
      return p.data.name.toLowerCase().includes(search.toLowerCase());
    })
    .slice(0, 5);

  return (
    <div>
      <div className={s.container}>
        <button onClick={setIsSearch} className={s.close}>
          <GrClose className={s.close_icon} />
        </button>
        <form action="" className={s.search}>
          <input
            type="text"
            value={search}
            onChange={handelOnChange}
            placeholder="search a plant"
            name="q"
          />

          <button type="submit">
            <RiSearchLine />
          </button>
        </form>
      </div>
      <div className={s.pruebaContainer}>
        {search &&
          findResults.map((p) => {
            return (
              <div
                onClick={() => {
                  handleClick(p.id);
                }}
                className={s.pruebaContainertwo}
              >
                <img className={s.prueba} src={p.data.image} alt="" />
                <p>{p.data.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchBox;
