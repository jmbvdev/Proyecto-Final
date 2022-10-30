import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Plants from "./pages/Plants";
import PlantsDetails from "./pages/PlantsDetails";
import Cart from "./pages/Cart";
import Auth from "./auth/Auth";
import CreatePlant from "./pages/CreatePlant";
import EditPlant from "./pages/EditPlant";

function App() {
  const [isSearch, setIsSearch] = useState(false);
  function handleSearch() {
    setIsSearch((isSearch) => !isSearch);
  }

  return (
    <div className="App">
      <Nav setIsSearch={handleSearch} />
      {isSearch && <SearchBox setIsSearch={handleSearch} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/create" element={<CreatePlant/>} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/details/:id" element={<PlantsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<Auth />} />
        <Route exact path="/plants/details/:id" element={<EditPlant/>} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
