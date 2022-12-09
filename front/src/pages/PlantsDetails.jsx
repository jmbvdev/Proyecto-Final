import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetails, GetProductDetails } from "../Redux/actions/products";
import { GiLindenLeaf, GiTable } from "react-icons/gi";
import { TbPlant2 } from "react-icons/tb";
import { FaComment, FaCommentDots, FaDog } from "react-icons/fa";
import { SiThymeleaf } from "react-icons/si";
import s from "../styles/details.module.css";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { addProduct, saveCart } from "../Redux/actions/shopCart";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import FavButton from "../components/FavButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Reviews from "./Reviews";
import View_Reviews from "../components/View_Reviews";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import MoreSizes from "../components/MoreSizes";
import { IoIosArrowBack } from "react-icons/io";

const PlantsDetails = () => {
  const dispatch = useDispatch();
  const plant = useSelector(
    (state) => state.productsReducer.productDetails.data
  );

  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const cart = useSelector((state) => state.shopCartReducer.products);

  const navigate = useNavigate();
  const id = useParams().id;
  const [comment, setComment] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "transparent",
    border: "none",
    p: 0,
  };
  const styleReview = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "transparent",
    border: "none",
    p: 0,
  };

  useEffect(() => {
    dispatch(GetProductDetails(id));
    return function() {
      dispatch(clearDetails());
    };
  }, []);

  useEffect(() => {
    if (!view.length) {
      //axios.get("http://localhost:5000/api-plants-b6153/us-central1/app/coments/1ZNEmmNnAp6r4QXLVCAS")
      axios
        .get(
          `https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/${id}`
        )
        //  axios.get(`https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/${id}`)
        .then((res) => {
          setView(res.data);
        });
    }
  }, []);

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/plants/edit/${id}`);
    window.scrollTo(0, {behavior: 'smooth'})
  }
  function handleComents(e) {
    e.preventDefault();
    navigate(`/reviews/${id}`);
  }
  function handleRedirect(e) {
    e.preventDefault();
    navigate(`/sign-in`);
  }

  function handleCart() {
    if (cart.findIndex((e) => e.id === id) !== -1 || plant?.stock === 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: false,
      });
      Promise.resolve(
        Toast.fire({
          icon: "info",
          title:
            plant?.stock === 0
              ? `We don't have stock of this product!`
              : `You already have this product in your cart!`,
        })
      );
      return;
    }
    Swal.fire({
      title: "Success",
      text: "Your product was successfully added to the cart",
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

  const handleOpen = () => {
    if (!currentUser) {
      return Swal.fire({
        title: "Wait...",
        text: "Your have to sign in to add a coment",
        icon: "failure",
        showDenyButton: false,
        denyButtonText: "",
        denyButtonColor: "rgba(11, 115, 147, 0.713)",
        confirmButtonText: "Sign In",
        confirmButtonColor: "rgb(9, 102, 74)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/sign-in");
        }
      });
    }
    if (plant.logicalDeletion) {
      return;
    }
    const user = view.find((e) => e.data.userUID === currentUser.uid);

    if (user) {
      Promise.resolve(
        Swal.fire({
          title: "Ups",
          text: "you already added a review to this plant",
          icon: "warning",
          showDenyButton: false,
          confirmButtonText: "ok",
          confirmButtonColor: "rgb(9, 102, 74)",
        })
      );
      return;
    }

    setOpen(true);
  };
  const handleOpenReview = () => {
    //if (!currentUser) return;
    // const user = view.find((e) => e.data.userUID === currentUser.uid);
    // if (!currentUser) {
    //   Promise.resolve(
    //     Swal.fire({
    //       title: "Eh",
    //       text: "This plant still does not have any reviews",
    //       icon: "info",
    //       showDenyButton: false,
    //       confirmButtonText: "ok",
    //       confirmButtonColor: "rgb(9, 102, 74)",
    //     })
    // //   );
    //   return;
    //}
    if (plant.logicalDeletion) {
      return;
    }
    if (view.length === 0)
      return Swal.fire(
        "There are no comments, take the opportunity to leave one"
      );
    setOpenReview(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseReview = () => setOpenReview(false);

  return plant?.name ? (
    <div className={s.container}>
      <div className={s.button_container}>
        <button onClick={() => navigate(-1)} className={s.back}>
          <IoIosArrowBack />
        </button>
      </div>
      <div>
        <img src={plant?.image} alt="" />
        {plant?.stock === 0 ? (
          <div className={s.card_overstock}>
            <p>Out of stock</p>
          </div>
        ) : null}
        {plant?.logicalDeletion ? (
          <div className={s.card_overstock}>
            <p>Discontinued product</p>
          </div>
        ) : null}
      </div>
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
          <div className={s.place}>
            {plant?.place && plant?.place === "indoor" ? (
              <SiThymeleaf className={s.place_icon} />
            ) : (
              <GiLindenLeaf className={s.place_icon} />
            )}
            <span>{plant?.place.toUpperCase()}</span>
          </div>
        </div>
        {plant?.small || plant?.medium || plant?.large ? (
          <MoreSizes
            idsmall={plant?.small}
            idmedium={plant?.medium}
            idlarge={plant?.large}
          />
        ) : null}
        <div className={s.price}>
          <div>
            <h4>Price</h4>
            <h3>$ {plant?.price}</h3>
          </div>
          <div>
            <h4>Stock</h4>
            <span>{plant?.stock}</span>
          </div>
          {plant?.stock > 0 ? (
            <div className={s.quantity}>
              <button
                disabled={
                  quantity === 1 || plant?.stock === 0 || plant?.logicalDeletion
                }
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <p>{plant?.stock === 0 ? plant?.stock : quantity}</p>
              <button
                disabled={
                  quantity === plant?.stock ||
                  plant?.stock === 0 ||
                  plant?.logicalDeletion
                }
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          ) : null}
        </div>
        <div className={s.favorites}>
          <h4>Add to favorites</h4>
          <FavButton
            id={id}
            user={currentUser?.uid}
            log={plant?.logicalDeletion}
          />
          {!currentUser || currentUser?.role?.[0] === "user" ? null : (
            <div className={s.edit_btn}>
              <h4>Edit</h4>
              <button onClick={handleEdit}>
                <RiEdit2Fill />
              </button>
            </div>
          )}
        </div>
        <div className={s.reviews_container}>
          <h4>Add a review</h4>

          <AiFillStar className={s.star} close={setOpen} onClick={handleOpen} />
          <div>
            {/* {currentUser ? ( */}
            <div className={s.favorites}>
              <h4>See reviews</h4>
              <FaCommentDots className={s.hearth} onClick={handleOpenReview} />
            </div>
            {/* ) : (
            // <button className={s.noreview} onClick={handleRedirect}>
            //   Sign in to leave a review
            // </button>
            null
          )
          } */}
          </div>
        </div>

        {cart.findIndex((e) => e.id === id) !== -1 && (
          <h5>Already in your cart</h5>
        )}

        <button
          disabled={plant?.logicalDeletion}
          onClick={handleCart}
          className={s.cart}
        >
          Add to Cart
        </button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Reviews setView={setView} close={setOpen} handleClose={handleClose} />
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={openReview}
            onClose={handleCloseReview}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleReview}>
              <View_Reviews
                setOpenReview={setOpenReview}
                view={view}
                user={currentUser?.uid}
                setView={setView}
              />
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PlantsDetails;
