import s from "../styles/Comentarios.module.css";
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import gustavo from "../images/fotos perfil/gustavo.jpg"
import Christian from "../images/fotos perfil/cristian cordoba.jpg"
import andres from '../images/fotos perfil/andres.jpg'
import dario from "../images/fotos perfil/dario.jpg"


const Comentarios = () => {


    return (

        <div >
            <div className={s.titulo}>
            <h3 >Testimonials</h3>
            </div>
            <div className={s.envolver}>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                    <div className={s.imagen}>
                        <img src={gustavo} />
                    </div>
                    <span >"Excelente atencion y el servicio"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br/>
                <div className={s.letras}>
                <span >Gustavo </span>
                </div>
            </div>
            <div className={s.tarjeta}>
                <div className={s.contenedor}>
                <div className={s.imagen}>
                    <img src={dario} />
                    </div>
                 <span className={s.letras}>"Cumplieron con mis Expectativas"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br/>
                <div className={s.letras}>
                <span >Dario </span>
                </div>
            </div>
            < div className={s.tarjeta}>
                <div className={s.contenedor}>
                <div className={s.imagen}>
                    <img src={andres} />
                </div>
                <span className={s.letras}>"Tardaron en realizar el envio"</span>
                </div>
                <div className={s.pulgar}>
                    <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                </div>
                <br/>
                <div className={s.letras}>
                <span >Andres </span>
                </div>
            </div>
            {/* < div className={s.tarjeta}>
            <div className={s.imagen}>
                <img src={Christian} />
                </div>
                                <span className={s.letras}>"Son los mejores"</span>
                                <div className={s.pulgar}>
                                <BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill /><BsFillHandThumbsUpFill />
                                </div>
                               <h3 className={s.letras}>Christian </h3>
                                        </div> */}
</div>

        </div>
    )
}

export default Comentarios