import React from 'react';
import { useState } from 'react';
import s from "../styles/plants.module.css"

const Categories = () => {
    const [activeIndoor, setActiveIndoor]= useState(false)
    const [activeOutdoor, setActiveOutoor]= useState(false)
    const [activePet, setActivePet]= useState(false)
    const [activeTable, setActiveTable]= useState(false)
    const [activeEasy, setActiveEasy]= useState(false)
    function handleIndoor() {
        setActiveIndoor(!activeIndoor)
        
    }
    function handleOutdoor() {
        setActiveOutoor(!activeOutdoor)
        
    }
    function handlePet() {
        setActivePet(!activePet)
        
    }
    function handleTable() {
        setActiveTable(!activeTable)
        
    }
    function handleEasy() {
        setActiveEasy(!activeEasy)
        
    }
    return (
        <div className={s.categories}>
                        <div onClick={()=>handleIndoor()} className={activeIndoor? s.indoor_active:s.indoor}><p>indoor</p></div>
                        <div onClick={()=>handleOutdoor()} className={activeOutdoor? s.outdoor_active:s.outdoor}><p>outdoor</p></div>
                        <div  onClick={()=>handlePet()} className={activePet? s.pet_active:s.pet} ><p>pet friendly</p></div>
                        <div onClick={()=>handleEasy()} className={activeEasy? s.easy_active:s.easy}><p>easy care</p></div>
                        <div  onClick={()=>handleTable()} className={activeTable? s.table_active:s.table}><p>tabletop</p></div>
                       </div>
    );
};

export default Categories;