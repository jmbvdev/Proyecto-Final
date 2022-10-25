import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
        <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
<Footer/>
    </div>
  );
}

export default App;
