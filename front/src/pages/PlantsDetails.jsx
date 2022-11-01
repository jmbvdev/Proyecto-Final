import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetails, GetProductDetails } from "../Redux/actions/products";
import { GiTable } from "react-icons/gi";
import { TbPlant2 } from "react-icons/tb";
import { FaDog } from "react-icons/fa";
import s from "../styles/details.module.css";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { addProduct, saveCart } from "../Redux/actions/shopCart";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import FavButton from "../components/FavButton";

const PlantsDetails = () => {
  const dispatch = useDispatch();
  const plant = useSelector(
    (state) => state.productsReducer.productDetails.data
  );
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const cart = useSelector((state) => state.shopCartReducer.products);

  const navigate = useNavigate();
  const id = useParams().id;

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(GetProductDetails(id));
    return function () {
      dispatch(clearDetails());
    };
  }, []);

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/plants/edit/${id}`);
  }

  function handleCart() {
    Swal.fire({
      title: "Success",
      text: "Your product was successfully added to cart",
      icon: "success",
      showDenyButton: true,
      denyButtonText: "Go to cart",
      denyButtonColor: "rgba(11, 115, 147, 0.713)",
      confirmButtonText: "ok",
      confirmButtonColor: "rgb(9, 102, 74)",
    }).then((res) => {
      if (res.isDenied) {
        navigate("/cart");
      }
    });
    dispatch(
      addProduct(
        {
          id,
          image: plant.image,
          price: plant.price,
          name: plant.name,
          stock: plant.stock,
        },
        quantity
      )
    );

    if (currentUser) {
      dispatch(
        saveCart(
          [
            ...cart,
            {
              id,
              image: plant.image,
              price: plant.price,
              name: plant.name,
              stock: plant.stock,
              count: quantity,
            },
          ],
          currentUser.uid
        )
      );
    }
  }

  return plant?.name ? (
    <div className={s.container}>
      <img src={plant?.image} alt="" />
      <div className={s.details}>
        <h1>{plant?.name} </h1>
        <div>
          <h4>Description</h4>
          <p>{plant?.details}</p>
        </div>
        <div className={s.categories}>
          {plant?.categories &&
            plant.categories?.map((p, i) => {
              return (
                <div key={i} className={s.categories_container}>
                  {p.includes("tabletop") ? (
                    <GiTable className={s.table} />
                  ) : p.includes("pet friendly") ? (
                    <FaDog className={s.table} />
                  ) : (
                    p.includes("easy care") && <TbPlant2 className={s.table} />
                  )}
                  <span>
                    {p.includes("tabletop")
                      ? "TABLETOP"
                      : p.includes("pet friendly")
                      ? "PET FRIENDLY"
                      : p.includes("easy care") && "EASY CARE"}
                  </span>
                </div>
              );
            })}
        </div>
        <div className={s.price}>
          <div>
            <h4>Price</h4>
            <h3>$ {plant?.price}</h3>
          </div>
          <div className={s.quantity}>
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              disabled={quantity === plant?.stock}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className={s.favorites}>
          <h4>Add to favorites</h4>
          <button>
            <AiFillHeart className={s.hearth} />
          </button>
          <div className={s.edit_btn}>
            <h4>Edit</h4>
            <button onClick={handleEdit}>
              <FaRegEdit />
            </button>
          </div>
        </div>

        <button
          disabled={cart.findIndex((e) => e.id === id) !== -1}
          onClick={handleCart}
          className={s.cart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PlantsDetails;
