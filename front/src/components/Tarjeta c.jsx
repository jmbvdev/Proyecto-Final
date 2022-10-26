import s from "../styles/Tarjeta.module.css"
import React from 'react'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import juanma from '../images/fotos perfil/juanma.jpg'
import gaston from "../images/fotos perfil/gaston.jpg"
import julian from "../images/fotos perfil/julian.jpg"

const Tarjetac = () => {
    return (
        <div className={s.envolver}>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={juanma} />
                    </div>
                    <span className={s.letras1}>"Me encanto la pagina"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Juan Manuel </span>
                </div>
            </div>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={gaston} />
                    </div>
                    <span className={s.letras1}>"Me encanto todo"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Gaston </span>
                </div>
            </div>
            < div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={julian} />
                    </div>
                    <span className={s.letras1}>"Volveria a comprar"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br />
                <div className={s.letras}>
                    <span >Julian </span>
                </div>
            </div>
        </div>
    )
}
export default Tarjetac
