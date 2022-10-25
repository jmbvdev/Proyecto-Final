import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import PlantsDetails from "./pages/PlantsDetails";


function App() {
  return (
    <div className="App">
        <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/plants" element={<Plants/>}/>
        <Route path="/plants/details/:id" element={<PlantsDetails/>}/>
      </Routes>

    </div>
  );
}

export default App;
