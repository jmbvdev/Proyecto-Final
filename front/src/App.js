import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GetAllProducts } from "./Redux/actions/products";
import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Plants from "./pages/Plants";
import PlantsDetails from "./pages/PlantsDetails";
import Cart from "./pages/Cart";
import CreatePlant from "./pages/CreatePlant";
import EditPlant from "./pages/EditPlant";
import NotFound from "./components/NotFound";
import { auth } from "./firebase/firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./Redux/actions/users/index";
import { loadCart } from "./Redux/actions/shopCart/index.js";
import { onAuthStateChanged } from "firebase/auth";
import ScrollToTop from "react-scroll-to-top";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./auth/Dashboard";
import PostMercadoPago from "./components/postMercadoPago";
import Favorites from "./pages/Favorites";
import UserEdit from "./auth/UserEdit";
import Verification from "./auth/Verification";
import UsersDash from "./auth/AdminDash/UsersDash.jsx";
import ProductsDash from "./auth/AdminDash/ProductsDash";
import OrdersDash from "./auth/AdminDash/OrdersDash";
import CouponDash from "./auth/AdminDash/CouponDash";
import Reviews from "./pages/Reviews";
import OrdersUser from "./pages/OrdersUser";
import UserDetail from "./auth/UsersDash";
import ManageOrders from "./pages/ManageOrders.jsx";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Update_Coment from "./pages/Update_Coment.jsx";


function App() {
  const [isSearch, setIsSearch] = useState(false);

  function handleSearch() {
    setIsSearch((isSearch) => !isSearch);
  }
  console.log("me renderizo en App");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(GetAllProducts());
    
  }, []);

  React.useEffect(() => {
    if (!auth.currentUser) dispatch(loadCart());
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          const role = await authenticatedUser.getIdTokenResult(true);
          dispatch(
            setCurrentUser({
              ...authenticatedUser,
              role: role.claims.role || "user",
              adress: role.claims.adress || "",
              adressNumber: role.claims.adressNumber || "",
              city: role.claims.city || "",
            })
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
        <Route path="/" element={<Home isSearch={isSearch} />} />
        <Route exact path="/create" element={<CreatePlant />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/details/:id" element={<PlantsDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/edit" element={<UserEdit />} />
        <Route path="/dashboard/users" element={<UsersDash />} />
        <Route path="/dashboard/orders" element={<OrdersDash />} />
        <Route path="/dashboard/products" element={<ProductsDash />} />
        <Route path="/dashboard/coupons" element={<CouponDash />} />
        <Route exact path="/users/detail/:id" element={<UserDetail />} />
        <Route exact path="/plants/edit/:id" element={<EditPlant />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/success" element={<PostMercadoPago />} />
        <Route path="/pending" element={<PostMercadoPago />} />
        <Route path="/failure" element={<PostMercadoPago />} />
        <Route exact path="/reviews/:id" element={<Reviews />} />
        <Route path="/orders/:id" element={<OrdersUser />} />
        <Route exact path="/manage-order" element={<ManageOrders />} />
        <Route path="*" element={<NotFound />} />
        <Route exact path="/update/:comentid/:plantsUID" element={<Update_Coment/>}/>
      </Routes>
      <ScrollToTop smooth />
      <Footer />
    </div>
  );
}

export default App;
