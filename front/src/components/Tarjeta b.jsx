import s from "../styles/Tarjeta.module.css"
import React from 'react'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import christian from '../images/fotos perfil/cristian cordoba.jpg'
import martin from "../images/fotos perfil/martin.png"
import maximiliano from "../images/fotos perfil/maximiliano.png"

const Tarjetab = () => {
    return (
        <div className={s.envolver}>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={christian} />
                    </div>
                    <span className={s.letras1}>"Son los Mejores"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Christian </span>
                </div>
            </div>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={martin} />
                    </div>
                    <span className={s.letras1}>"Excelente todo"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Martin </span>
                </div>
            </div>
            < div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={maximiliano} />
                    </div>
                    <span className={s.letras1}>"Nada para criticar"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Maximiliano </span>
                </div>
            </div>
        </div>
    )
}
export default Tarjetab
