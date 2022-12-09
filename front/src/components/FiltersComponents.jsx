import React from "react";
import { useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FilterBy, OrderBy } from "../Redux/actions/products";
import { BiReset } from "react-icons/bi";
import indoor from "../images/indoor.webp";
import s from "../styles/filters.module.css";

const FiltersComponents = () => {
  const [activeIndoor, setActiveIndoor] = useState(false);
  const [activeOutdoor, setActiveOutoor] = useState(false);
  const [activePet, setActivePet] = useState(false);
  const [activeTable, setActiveTable] = useState(false);
  const [activeEasy, setActiveEasy] = useState(false);
  const [filters, setFilters] = useState(["all", "all", "all", "all"]);
  const [orderPrice, setOrderPrice] = useState(false);

  function resetFilter() {
    setActiveIndoor(false);
    setActiveOutoor(false);
    setActivePet(false);
    setActiveTable(false);
    setActiveEasy(false);

    setFilters(["all", "all", "all", "all"]);
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FilterBy(filters));
  }, [filters, dispatch]);

  function handleOrder() {
    if (orderPrice === true) {
      return "asc";
    } else {
      return "desc";
    }
  }

  function handleClick() {
    setOrderPrice(!orderPrice);
    dispatch(OrderBy(order));
  }
  const order = handleOrder();

  function handleSize(e) {
    let arr = [...filters];
    arr[1] = e.target.value;
    setFilters(arr);
  }
  function handleIndoor() {
    setActiveIndoor(!activeIndoor);
    setActiveOutoor(false);
    let arr = [...filters];
    if (arr[3] === "indoor") {
      arr[3] = "all";
    } else {
      arr[3] = "indoor";
    }
    setFilters(arr);
  }
  function handleOutdoor() {
    setActiveOutoor(!activeOutdoor);
    setActiveIndoor(false);
    let arr = [...filters];
    if (arr[3] === "outdoor") {
      arr[3] = "all";
    } else {
      arr[3] = "outdoor";
    }
    setFilters(arr);
  }
  function handlePet() {
    setActivePet(!activePet);
    setActiveTable(false);
    setActiveEasy(false);
    let arr = [...filters];
    if (arr[2] === "pet friendly") {
      arr[2] = "all";
    } else {
      arr[2] = "pet friendly";
    }
    setFilters(arr);
  }
  function handleTable() {
    setActiveTable(!activeTable);
    setActivePet(false);
    setActiveEasy(false);
    let arr = [...filters];
    if (arr[2] === "tabletop") {
      arr[2] = "all";
    } else {
      arr[2] = "tabletop";
    }
    setFilters(arr);
  }
  function handleEasy() {
    setActiveEasy(!activeEasy);
    setActivePet(false);
    setActiveTable(false);
    let arr = [...filters];
    if (arr[2] === "easy care") {
      arr[2] = "all";
    } else {
      arr[2] = "easy care";
    }
    setFilters(arr);
  }

  return (
    <div className={s.filters}>
      <div className={s.container}>
        <BiReset onClick={resetFilter} className={s.reset} />
        <div className={s.size_container}>
          <select
            onChange={(e) => handleSize(e)}
            name=""
            id=""
            className={s.select}
          >
            <option value="all">all sizes</option>
            <option value="mini">mini</option>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </div>
        <div className={s.price} onClick={() => handleClick()}>
          <MdOutlineAttachMoney className={s.price_icon} />
          {orderPrice ? (
            <FaLongArrowAltUp className={s.direction_icon} />
          ) : (
            <FaLongArrowAltDown className={s.direction_icon} />
          )}
        </div>
      </div>
      <div className={s.categories}>
        <div
          onClick={() => handleIndoor()}
          style={{backgroundImage: `url(${indoor})`}}
          className={activeIndoor ? s.indoor_active : s.indoor}
        >
          <p>indoor</p>
        </div>
        <div
          onClick={() => handleOutdoor()}
          className={activeOutdoor ? s.outdoor_active : s.outdoor}
        >
          <p>outdoor</p>
        </div>
        <div
          onClick={() => handlePet()}
          className={activePet ? s.pet_active : s.pet}
        >
          <p>pet friendly</p>
        </div>
        <div
          onClick={() => handleEasy()}
          className={activeEasy ? s.easy_active : s.easy}
        >
          <p>easy care</p>
        </div>
        <div
          onClick={() => handleTable()}
          className={activeTable ? s.table_active : s.table}
        >
          <p>tabletop</p>
        </div>
      </div>
    </div>
  );
};

export default FiltersComponents;
