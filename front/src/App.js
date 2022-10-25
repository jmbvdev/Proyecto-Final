import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Plants from "./pages/Plants";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/create" element={<CreateProduct />} />
        <Route path="/plants" element={<Plants/>}/>
        <Route path="/details/:id" element={<Plants/>}/>
      </Routes>
    </div>
  );
}

export default App;
