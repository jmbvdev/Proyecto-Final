import s from "../styles/Tarjeta.module.css"
import React from 'react'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import gustavo from '../images/fotos perfil/gustavo.jpg'
import dario from "../images/fotos perfil/dario.jpg"
import andres from "../images/fotos perfil/andres.jpg"

const Tarjetaa = () => {
    return (
        <div className={s.envolver}>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={gustavo} />
                    </div>
                    <span className={s.letras1}>"Excelente atencion"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Gustavo </span>
                </div>
            </div>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={dario} />
                    </div>
                    <span className={s.letras1}>"Digno de Recomendar"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Dario </span>
                </div>
            </div>
            < div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={andres} />
                    </div>
                    <span className={s.letras1}>"Tardaron en realizar el envio"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Andres </span>
                </div>
            </div>
        </div>
    )
}
export default Tarjetaa
