import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getPictureUrl, setPlantImage } from "../firebase/Controllers";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/actions/products/index";
import { validate } from "../Util/validate";
import { BsImageFill, BsEyeFill } from "react-icons/bs";
import ShowPlant from "../components/ShowPlant";
import s from "../styles/createPlant.module.css";

const allCategories = ["easy care", "tabletop", "pet friendly"];
const allSize = ["mini", "small", "medium", "large"];
const imageExample =
  "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-spider-plant_medium_grant_cream.jpg?v=1661444123";
const detailExample =
  "Example of detail: In order for your client to better appreciate your product, you can enter more details of it";

const CreatePlant = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  const [uid, setUid] = useState("");
  const [error, setError] = useState({});

  const [input, setInput] = useState({
    categories: [],
    details: "",
    name: "",
    price: 0,
    size: [],
    stock: 0,
    type: "plant",
    logicalDeletion: false,
  });

  const fileRef = useRef(null);

  const handleOpenfilePicker = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChangefile = (e) => {
    const files = e.target.files;
    const fileReader = new FileReader();
    const id = uuidv4();
    setUid(id);
    console.log(id);
    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        // setImage(imageData)
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
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(input);
    if (
      !input.categories.length ||
      !input.details ||
      !image ||
      !input.name ||
      !input.price ||
      !input.size.length ||
      !input.stock
    ) {
      return alert("Faltan datos");
    }

    const product = {
      uid: uid,
      categories: input.categories,
      details: input.details,
      image: image,
      // planter: input.planter,
      name: input.name,
      price: input.price,
      size: input.size[0],
      stock: input.stock,
      type: "plant",
      place: "indoor",
      logicalDeletion: input.logicalDeletion,
    };
    dispatch(createProduct(product));
    alert("Create");
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
      setError(
        validate({
          ...input,
          categories: [...input.categories, e.target.value],
        })
      );
    }
  };

  const handleDeleteCategories = (e) => {
    setInput({
      ...input,
      categories: input.categories.filter((el) => el !== e),
    });
    setError(
      validate({
        ...input,
        categories: input.categories.filter((el) => el !== e),
      })
    );
  };

  const handlePrice = (e) => {
    setInput({
      ...input,
      price: parseInt(e.target.value),
    });
    setError(
      validate({
        ...input,
        price: parseInt(e.target.value),
      })
    );
  };

  const handleSize = (e) => {
    if (e.target.value !== "select") {
      setInput({
        ...input,
        size: [e.target.value],
      });
      setError(
        validate({
          ...input,
          size: [e.target.value],
        })
      );
    }
  };

  const handleDeleteSize = () => {
    setInput({
      ...input,
      size: [],
    });
    setError(
      validate({
        ...input,
        size: [],
      })
    );
  };

  const handleStock = (e) => {
    setInput({
      ...input,
      stock: parseInt(e.target.value),
    });
    setError(
      validate({
        ...input,
        stock: parseInt(e.target.value),
      })
    );
  };


  const handleShow = () =>
    setInput({
      ...input,
      logicalDeletion: !input.logicalDeletion,
    });

  return (
    <div className={s.container}>
      <div className={s.wraper}>
        <div className={s.left}>
          <form onSubmit={handleOnSubmit} className={s.form}>
            <h4>CREATE A PLANT</h4>
            <div className={s.image_input}>
              <div className={s.image_btn}>
                <button type="button" onClick={handleOpenfilePicker}>
                  <BsImageFill />
                </button>
                <p>upload image</p>

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
                className={s.input_text}
                onChange={handleOnChange}
              />
              {error.name && <p className={s.errors}>{error.name}</p>}
            </div>

            <div className={s.input_container}>
              <input
                type="text"
                name="details"
                autoComplete="off"
                placeholder="details"
                className={s.input_text}
                onChange={handleOnChange}
              />
              {error.details && <p className={s.errors}>{error.details}</p>}
            </div>
            {/* 
              <div className={s.input_container}>
                <input
                  type="text"
                  name="planter"
                  placeholder="planter"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
              </div> */}

            <div className={s.input_container}>
              <input
                type="number"
                name="price"
                placeholder="price"
                className={s.input_text}
                onChange={handlePrice}
                min="1"
                max="1000000"
              />
              {error.price && <p className={s.errors}>{error.price}</p>}
            </div>

            <div className={s.input_container}>
              <input
                type="number"
                name="stock"
                placeholder="stock"
                className={s.input_text}
                onChange={handleStock}
                min="1"
                max="1000000"
              />
              {error.stock && <p className={s.errors}>{error.stock}</p>}
            </div>

            {/* <div className={s.input_container}>
                <input
                  type="text"
                  name="type"
                  placeholder="type"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
              </div> */}

            {/* <div>
                            <input type="text" name="categories" placeholder="categories" onChange={handleOnChange} />
                        </div> */}
            <div className={s.selects_container}>
              <select onChange={handleSize}>
                <option value="select">SIZE</option>
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
              {error.size && <span className={s.errors}>{error.size}</span>}
            </div>

            <div className={s.selects_container}>
              <select onChange={handleCategories}>
                <option value="select">CATEGORIES</option>
                {allCategories.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </select>

              <div className={s.categories_option}>
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
                {error.categories && (
                  <span className={s.errors}> {error.categories}</span>
                )}
              </div>

              <div className={s.show_btn}>
                <label>show: </label>
                <button type="button" onClick={handleShow}>
                  <BsEyeFill/>
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={Object.keys(error).length ? true : false}
                className={s.create_btn}
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
        <div className={s.right}>
          <ShowPlant
            categories={input.categories}
            image={image || imageExample}
            details={input.details || detailExample}
            // planter={input.planter}
            name={input.name || "Name example"}
            price={input.price || "99"}
            size={(input.size.length && input.size) || "Size example"}
            stock={input.stock || 99}
            type={input.type || "exterior"}
            logicalDeletion={input.logicalDeletion}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePlant;
