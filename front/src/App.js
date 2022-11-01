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
import NotFound from "./components/NotFound";
import { auth } from "./firebase/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./Redux/actions/users/index";
import { loadCart } from "./Redux/actions/shopCart/index.js";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./auth/Dashboard";
import PostMercadoPago from "./components/postMercadoPago";

function App() {
  const [isSearch, setIsSearch] = useState(false);

  function handleSearch() {
    setIsSearch((isSearch) => !isSearch);
  }
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!auth.currentUser) dispatch(loadCart());
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          const role = await authenticatedUser.getIdTokenResult();
          dispatch(
            setCurrentUser({ ...authenticatedUser, role: role.claims.role })
          );
          dispatch(loadCart(authenticatedUser.uid));
        }
      }
    );
    return unSubscribeAuth;
  }, []);

  return (
    <div className="App">
      <Nav setIsSearch={handleSearch} />
      {isSearch && <SearchBox setIsSearch={handleSearch} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/create" element={<CreatePlant />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/details/:id" element={<PlantsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route exact path="/plants/edit/:id" element={<EditPlant />} />
        <Route path="/success" element={<PostMercadoPago />} />
        <Route path="/pending" element={<PostMercadoPago />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
