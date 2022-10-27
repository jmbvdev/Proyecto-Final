import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateProduct from "./components/CreateProduct";
import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import Home from "./pages/Home";
import Footer from './components/Footer'
import Plants from "./pages/Plants";
import PlantsDetails from "./pages/PlantsDetails";
import Cart from "./pages/Cart"
import Auth from "./auth/Auth";



function App() {
  const isSearch= useSelector(state=>state.productsReducer.isSearch)
  return (
    <div className="App">
      <Nav />      
      {isSearch && <SearchBox />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/create" element={<CreateProduct />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/details/:id" element={<PlantsDetails />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/sign-in" element={<Auth />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
