
import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import axios from 'axios'
import { getPictureUrl, setPlantImage } from '../firebase/Controllers'
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/actions/products/index"
import { validate } from '../Util/validate';
import { BsImageFill } from "react-icons/bs"
import ShowPlant from '../components/ShowPlant';
import s from "../styles/createPlant.module.css"


const allCategories = ["easy care", "tabletop", "pet friendly"]
const imageExample = "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_faux-spider-plant_medium_grant_cream.jpg?v=1661444123"
const detailExample = "Add a pop of serenity to your tablescape with this popular Phalaenopsis orchid. One of the easiest varieties to grow as a houseplant—it is affectionately called the beginner orchid. You may notice a small number of blooms on your orchid upon delivery. These blooms will open quicker in a warm indoor setting. It will typically bloom about once a year, for up to three months. After a blooming cycle, the flowers will wilt and fall off. This is the orchid’s way to store up energy to re-bloom again next season."


const CreatePlant = () => {
    const dispatch = useDispatch()

    const [imageUrl, setImageUrl] = useState("")
    const [uid, setUid] = useState("")
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        categories: [],
        details: "",
        planter: "",
        name: "",
        price: "",
        size: "",
        stock: 0,
        type: "",
        logicalDeletion: false
    })

    const fileRef = useRef(null)

    const handleOpenfilePicker = () => {
        if (fileRef.current) {
            fileRef.current.click()
        }
    };

    const handleChangefile = (e) => {
        const files = e.target.files
        const fileReader = new FileReader()
        const id = uuidv4()
        setUid(id)
        console.log(id)
        if (fileReader && files && files.length > 0) {
            fileReader.readAsArrayBuffer(files[0])
            fileReader.onload = async function () {
                const imageData = fileReader.result
                // setImage(imageData)
                const res = await setPlantImage(id, imageData)
                console.log(res)
                const url = await getPictureUrl(id)
                if (url) {
                    setImageUrl(url)
                }
            }
        }
    }

    const handleOnChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }

    function handleOnSubmit(e) {
        e.preventDefault();
        const product = {
            uid: uid,
            categories: input.categories,
            details: input.details,
            imageUrl: imageUrl,
            planter: input.planter,
            name: input.name,
            price: input.price,
            size: input.size,
            stock: input.stock,
            type: input.type,
            logicalDeletion: input.logicalDeletion
        }
        dispatch(createProduct(product))
    }

    const handleCategories = (e) => {
        if (e.target.value !== "select" && !input.categories.includes(e.target.value)) {
            setInput({
                ...input,
                categories: [...input.categories, e.target.value]
            })
            setError(validate({
                ...input,
                categories: [...input.categories, e.target.value]
            }))
        }
    }

    const handleDeleteCategories = (e) => {
        setInput({
            ...input,
            categories: input.categories.filter(el => el !== e)
        })
        setError(validate({
            ...input,
            categories: input.categories.filter(el => el !== e)
        }))
    }

    const handleLogicalDeletion = (e) => {
        setInput({
            ...input,
            logicalDeletion: e.target.value
        })
    }

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
                  className={s.input_text}
                  onChange={handleOnChange}
                />
                {error.name && <p className={s.errors}>{error.name}</p>}
              </div>

              <div className={s.input_container}>
                <input
                  type="text"
                  name="details"
                  placeholder="details"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
                {error.details && <p className={s.errors}>{error.details}</p>}
              </div>

              <div className={s.input_container}>
                <input
                  type="text"
                  name="planter"
                  placeholder="planter"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
              </div>

              <div className={s.input_container}>
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
              </div>

              <div className={s.input_container}>
                <input
                  type="text"
                  name="size"
                  placeholder="size"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
              </div>

              <div className={s.input_container}>
                <input
                  type="number"
                  name="stock"
                  placeholder="stock"
                  className={s.input_text}
                  onChange={handleOnChange}
                  min="1"
                  max="5"
                />
              </div>

              <div className={s.input_container}>
                <input
                  type="text"
                  name="type"
                  placeholder="type"
                  className={s.input_text}
                  onChange={handleOnChange}
                />
              </div>

              {/* <div>
                            <input type="text" name="categories" placeholder="categories" onChange={handleOnChange} />
                        </div> */}
              <div className={s.selects_container}>
                  <select onChange={handleCategories} className={s.select_style}>
                    <option value="select">CATEGORIES</option>
                    {allCategories.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
               
                <div className={s.categories_option}>
                  {input.categories.map((el) => (
                    <div className={s.categories_option} >
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

                <select onChange={handleLogicalDeletion}>
                  <option value="select">LOGICAL ERASE</option>
                  <option value={false}>SHOW</option>
                  <option value={true}>HIDE</option>
                </select>
              </div>

              <div>
                <button type="submit" className={s.create_btn}>
                 CREATE
                </button>
              </div>
            </form>
          </div>
          <div className={s.right}>
            <ShowPlant
              categories={input.categories}
              imageUrl={imageUrl || imageExample}
              details={input.details || detailExample}
              planter={input.planter}
              name={input.name || "Petite Sunset Orchid"}
              price={input.price || "90"}
              size={input.size}
              stock={input.stock || 10}
              type={input.type || "exterior"}
              logicalDeletion={input.logicalDeletion}
            />
          </div>
        </div>
      </div>
    );
};

export default CreatePlant;