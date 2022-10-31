import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteProduct, GetProductDetails } from "../Redux/actions/products";
import { GiTable } from "react-icons/gi";
import { TbPlant2 } from "react-icons/tb";
import { FaDog } from "react-icons/fa";

import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";

import Loading from "../components/Loading";

import { useRef } from "react";
import s from "../styles/create.module.css";
import ShowProduct from "../components/ShowPlant";
import { getPictureUrl, setPlantImage } from "../firebase/Controllers";
import { validateEdit } from "../Util/validateEdit";
import { editProduct } from "../Redux/actions/products";

const allCategories = ["easy care", "tabletop", "pet friendly"];
const allSize = ["mini", "small", "medium", "large"];

const EditPlant = () => {
  const dispatch = useDispatch();
  const plant = useSelector(
    (state) => state.productsReducer.productDetails.data
  );
  const [isLoading, setIsLoading] = useState(true);

  const [image, setImage] = useState("");
  const id = useParams().id;

  useEffect(() => {
    dispatch(GetProductDetails(id)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, id]);

  const [error, setError] = useState({});

  const [input, setInput] = useState({
    categories: [],
    details: "",
    // planter: "",
    name: "",
    price: 0,
    size: [],
    stock: 0,
    //type: "",
    logicalDeletion: false,
  });

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const handleOpenfilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChangefile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();

    // console.log(id)
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;

        const res = await setPlantImage(id, imageData);
        console.log(res);
        const url = await getPictureUrl(id);
        if (url) {
          setImage(url);
        }
      };
    }
  };

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateEdit({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleOnSubmit(e) {
    e.preventDefault();

    const product = {
      categories: input.categories.length ? input.categories : plant.categories,
      details: input.details.length ? input.details : plant.details,
      image: image.length ? image : plant.image,
      // planter: input.planter,
      name: input.name !== "" ? input.name : plant.name,
      price: input.price !== 0 ? input.price : plant.price,
      size: input.size.length ? input.size[0] : plant.size,
      stock: parseInt(input.stock) + parseInt(plant?.stock),
      // type: input.type,
      logicalDeletion:
        input.logicalDeletion !== plant.logicalDeletion
          ? input.logicalDeletion
          : plant.logicalDeletion,
    };
    dispatch(editProduct(id, product));
    navigate(-2);
  }

  const handleCategories = (e) => {
    if (
      e.target.value !== "select" &&
      !input.categories.includes(e.target.value)
    ) {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });
    }
  };

  const handleDeleteCategories = (e) => {
    setInput({
      ...input,
      categories: input.categories.filter((el) => el !== e),
    });
  };

  const handleSize = (e) => {
    if (e.target.value !== "select") {
      setInput({
        ...input,
        size: [e.target.value],
      });
    }
  };
  const handleDeleteSize = () => {
    setInput({
      ...input,
      size: [],
    });
  };

  const handleShow = () =>
    setInput({
      ...input,
      logicalDeletion: !input.logicalDeletion,
    });

  const handlePrice = (e) => {
    setInput({
      ...input,
      price: parseInt(e.target.value),
    });
    setError(
      validateEdit({
        ...input,
        price: parseInt(e.target.value),
      })
    );
  };

  const handleStock = (e) => {
    setInput({
      ...input,
      stock: parseInt(e.target.value),
    });
    setError(
      validateEdit({
        ...input,
        stock: parseInt(e.target.value),
      })
    );
  };

  const handleDelete = () => {
    dispatch(DeleteProduct(id));
    navigate(-2);
  };

  return (
    <div>
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <ShowProduct
              image={image || plant?.image}
              name={input.name || plant?.name}
              details={input.details || plant?.details}
              categories={
                (input.categories.length && input.categories) ||
                plant?.categories
              }
              price={(input.price !== 0 && input.price) || plant?.price}
              logicalDeletion={input.logicalDeletion || plant?.logicalDeletion}
              type={plant?.type}
              stock={parseInt(input.stock) + parseInt(plant?.stock)}
              size={(input.size.length && input.size) || plant?.size}
            />

            <div className={s.container}>
              <form onSubmit={handleOnSubmit} className={s.form}>
                <h2>Edit plant</h2>
                <div className={s.image_input}>
                  <div className={s.image_btn}>
                    <button type="button" onClick={handleOpenfilePicker}>
                      <BsImageFill />
                    </button>
                    <p>add image</p>
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleChangefile}
                  />
                </div>

                <div className={s.input_container}>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />
                  {error.name && <p className={s.errors}>{error.name}</p>}
                </div>

                <div className={s.input_container}>
                  <input
                    type="text"
                    name="details"
                    placeholder="details"
                    autoComplete="off"
                    onChange={handleOnChange}
                  />
                  {error.details && <p className={s.errors}>{error.details}</p>}
                </div>

                {/* <div className={s.input_container}>
                                    <input type="text" name="planter" placeholder="planter" onChange={handleOnChange} />
                                </div> */}

                <div className={s.input_container}>
                  <label>Price: </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="price"
                    onChange={handlePrice}
                    min="0"
                    max="1000000"
                  />
                  {error.price && <p className={s.errors}>{error.price}</p>}
                </div>

                <div className={s.input_container}>
                  <label>Stock: </label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="stock"
                    onChange={handleStock}
                    min="0"
                    max="1000000"
                  />
                  {error.stock && <p className={s.errors}>{error.stock}</p>}
                </div>

                <div>
                  <label>Show: </label>
                  <button type="button" onClick={handleShow}>
                    Switch
                  </button>
                </div>

                <div className={s.categories}>
                  <label>Size: </label>
                  <select onChange={handleSize}>
                    <option value="select">Seleccionar...</option>
                    {allSize.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {input.size.length ? (
                    <div className={s.categories_option}>
                      <button type="button" onClick={handleDeleteSize}>
                        x
                      </button>
                      <p>{input.size[0]}</p>
                    </div>
                  ) : null}
                </div>

                <div className={s.categories}>
                  <label>Categories: </label>
                  <select onChange={handleCategories}>
                    <option value="select">Select...</option>
                    {allCategories.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  {input.categories.map((el) => (
                    <div className={s.categories_option}>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategories(el)}
                      >
                        x
                      </button>
                      <p>{el}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={Object.keys(error).length ? true : false}
                    className={s.create_btn}
                  >
                    update
                  </button>
                </div>
              </form>
            </div>
            <div>
              <button type="button" onClick={handleDelete}>
                DELETE
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default EditPlant;
