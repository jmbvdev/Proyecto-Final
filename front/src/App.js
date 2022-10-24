import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
        <Nav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>

    </div>
  );
}

export default App;
