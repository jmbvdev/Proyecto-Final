
import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import axios from 'axios'
import { getPictureUrl, setPlantImage } from '../firebase/Controllers'
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Redux/actions/products/index"
import { validate } from '../Util/validate';



const allCategories = ["easy care", "tabletop", "pet friendly"]

const CreateProduct = () => {
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


    return (
        <div>
            <br />
            <h2>agregar plantas</h2>
            <div>
                <div>
                    <button type="button" onClick={handleOpenfilePicker}>Choose new plant picture</button>
                    <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={handleChangefile} />
                </div>
                <form onSubmit={handleOnSubmit}>

                    <div>
                        <input type="text" name="name" placeholder="name" onChange={handleOnChange} />
                        {error.name && <p>{error.name}</p>}
                    </div>

                    <div>
                        <input type="text" name="details" placeholder="details" onChange={handleOnChange} />
                        {error.details && <p>{error.details}</p>}
                    </div>

                    <div>
                        <input type="text" name="planter" placeholder="planter" onChange={handleOnChange} />
                    </div>

                    <div>
                        <input type="text" name="price" placeholder="price" onChange={handleOnChange} />
                    </div>

                    <div>
                        <input type="text" name="size" placeholder="size" onChange={handleOnChange} />
                    </div>

                    <div>
                        <input type="number" name="stock" placeholder="stock" onChange={handleOnChange} />
                    </div>

                    <div>
                        <input type="text" name="type" placeholder="type" onChange={handleOnChange} />
                    </div>

                    {/* <div>
                        <input type="text" name="categories" placeholder="categories" onChange={handleOnChange} />
                    </div> */}

                    <label>Categories: </label>
                    <select onChange={handleCategories}>
                        <option value="select">Seleccionar...</option>
                        {
                            allCategories.map((el, i) =>
                                <option key={i} value={el}>{el}</option>
                            )
                        }
                    </select>

                    <div>
                        {
                            input.categories.map(el =>
                                <div >
                                    <button type="button" onClick={() => handleDeleteCategories(el)}>x</button>
                                    <p>{el}</p>
                                </div>
                            )
                        }
                        {error.categories && <span>  {error.categories}</span>}
                    </div>



                    {/* <div>
                        <select name="" id=""></select>
                    </div>
                    <div>
                        <select name="" id=""></select>
                    </div> */}

                    <div>
                        <button type="submit" >Enviar</button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default CreateProduct
