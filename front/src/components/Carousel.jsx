
import { useEffect, useState } from "react";
import s from "../styles/Carousel.module.css"
import {BsFillCaretLeftFill} from "react-icons/bs"
import {BsFillCaretRightFill} from 'react-icons/bs'


export default function Carousel() {
    let img1 =
      "https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_bromeliad-vriesea-intenso-orange_small_bryant_cream_variant.jpg?v=1655215164";
    let img2 =
      "https://cdn.sanity.io/images/y346iw48/production/0b8007aa28a7fb37800f81f0011f9e2e2b81bed3-2820x1953.jpg?w=1536&h=1064&auto=format";
    let img3 =
      "https://www.hogarmania.com/archivos/202210/macetas-para-decorar-hogar-en-halloween-668x400x80xX-1.jpg";
    let img4 =
      "https://static.vecteezy.com/system/resources/previews/000/425/737/non_2x/delivery-man-with-box-postman-design-isolated-on-white-background-courier-in-hat-and-uniform-with-package-vector.jpg";
    let images = [img1, img2, img3, img4];
  
    let text1 =
      "Nuestro nuevo ingreso.";
    let text2 =
      "La mejor calidad en Accesorios e insumos.";
    let text3 = "Celebramos Halloween con nuestras macetas especiales.";
    let text4 = "Hacemos envios a todo el pais.";
    let texts = [text1, text2, text3, text4];
    let [index, setIndex] = useState(0);
    let time;
  
    function handleButtonLeft() {
      clearTimeout(time);
      index > 0 ? setIndex(index - 1) : setIndex(images.length - 1);
    }
  
    function handleButtonRight() {
      clearTimeout(time);
      index === images.length - 1 ? setIndex(0) : setIndex(index + 1);
    }
  
    useEffect(() => {
      time = setTimeout(handleButtonRight, 5000);
    }, [index]);
  
    return (
      <div >
          <div className={s.todo}>
        
        <div >
            <button
              onClick={handleButtonLeft}
               className={s.flechas}
            ><BsFillCaretLeftFill/></button>
          </div>
  
  <div className={s.texto}>
          <img
            src={images[index]}
            alt="image not found"
            className={s.imagen}
            
          />
          <br/>
          <span >
          
            {texts[index]}
          </span>
        </div>
  
            
          <div >
            <button
              onClick={handleButtonRight}
              className={s.flechas}
            ><BsFillCaretRightFill/></button>
          </div>
        </div>
        </div>
      
    );
  }