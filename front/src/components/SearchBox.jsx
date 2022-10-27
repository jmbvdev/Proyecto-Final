import React from 'react';
import { RiSearchLine } from 'react-icons/ri';
import {GrClose}from "react-icons/gr"
import s from "../styles/searchBox.module.css"




const SearchBox = ({setIsSearch}) => {

    return (
        <div className={s.container}>
            
            <button onClick={setIsSearch}  className={s.close}><GrClose className={s.close_icon}/></button>
            <form action="" className={s.search}>

                <input type="text" placeholder='search a plant' name='q' />
              
                <button type='submit'><RiSearchLine/></button>

            </form>
       
        </div>
    );
};

export default SearchBox;