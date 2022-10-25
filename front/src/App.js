import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import Nav from "./components/Nav";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/create" element={<CreateProduct />} />
      </Routes>
    </div>
  );
}

export default App;
