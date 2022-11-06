import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearDetails, GetProductDetails } from "../Redux/actions/products";
import { GiTable } from "react-icons/gi";
import { TbPlant2 } from "react-icons/tb";
import { FaComment, FaCommentDots, FaDog } from "react-icons/fa";
import s from "../styles/details.module.css";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { addProduct, saveCart } from "../Redux/actions/shopCart";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import FavButton from "../components/FavButton";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Reviews from "./Reviews";
import View_Reviews from "../components/View_Reviews"
import { AiFillStar } from "react-icons/ai";
import axios from "axios";


const PlantsDetails = () => {
  const dispatch = useDispatch();
  const plant = useSelector(
    (state) => state.productsReducer.productDetails.data
  );
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const cart = useSelector((state) => state.shopCartReducer.products);

  const navigate = useNavigate();
  const id = useParams().id;
  const[comment, setComment]=useState(false)
  const [open, setOpen] = React.useState(false);
  const [openReview, setOpenReview] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState([]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent',
    border: 'none',
    p: 4,
  };
  const styleReview = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'transparent',
    border: 'none',
    p: 4,
  };
  
  useEffect(() => {
    dispatch(GetProductDetails(id));
    return function () {
      dispatch(clearDetails());
    };
  }, []);
  
  useEffect(() => {
    if (!view.length) {
      //axios.get("http://localhost:5000/api-plants-b6153/us-central1/app/coments/1ZNEmmNnAp6r4QXLVCAS")
      axios
        .get(
          `http://localhost:5000/api-plants-b6153/us-central1/app/coments/${id}`
        )
        //  axios.get(`https://us-central1-api-plants-b6153.cloudfunctions.net/app/coments/${id}`)
        .then((res) => {
          console.log(res.data)
          setView(res.data);
        });
    }
  }, []);

  function handleEdit(e) {
    e.preventDefault();
    navigate(`/plants/edit/${id}`);
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
    const user=view.find(e=>e.data.userUID===currentUser.uid)
    if (user) {

      Promise.resolve( Swal.fire({
        title: "Ups",
        text: "you already added a review to this plant",
        icon: "warning",
        showDenyButton: false,
        confirmButtonText: "ok",
        confirmButtonColor: "rgb(9, 102, 74)",
      }))
      return
    }

    

    setOpen(true)
  };
  const handleOpenReview = () => {
    const user=view.find(e=>e.data.userUID===currentUser.uid)
    if (!user) {

      Promise.resolve( Swal.fire({
        title: "Eh",
        text: "This plant still does not have any reviews",
        icon: "info",
        showDenyButton: false,
        confirmButtonText: "ok",
        confirmButtonColor: "rgb(9, 102, 74)",
      }))
      return
    }
    setOpenReview(true)
  };
  const handleClose = () => setOpen(false);
  const handleCloseReview = () => setOpenReview(false);
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
          <FavButton id={id} user={currentUser?.uid} />
          <div className={s.edit_btn}>
            <h4>Edit</h4>
            <button onClick={handleEdit}>
              <FaRegEdit />
            </button>
          </div>
        </div>
        <div className={s.reviews_container}>
          <h4>Add a review</h4>

          <AiFillStar className={s.star} onClick={handleOpen} />
        </div>
        <div>
            {currentUser ? (
              <div className={s.favorites}>
                <h4 >Watch reviews</h4>
                <FaCommentDots className={s.hearth} onClick={handleOpenReview}/>
              </div>
             
            ) : (
              <button onClick={handleRedirect}>
                Sign in to leave a review
              </button>
            )}
        </div>

        {cart.findIndex((e) => e.id === id) !== -1 && (
          <h5>Already in your cart</h5>
        )}

        <button
          disabled={cart.findIndex((e) => e.id === id) !== -1}
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
                    <Reviews />
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
                    <View_Reviews view={view}/>
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

