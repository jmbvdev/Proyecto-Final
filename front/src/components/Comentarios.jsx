import s from "../styles/Comentarios.module.css";
import Tarjeta from './Tarjeta a'
import Tarjetab from './Tarjeta b'
import Tarjetac from './Tarjeta c'
import { FaDotCircle } from 'react-icons/fa'
import { BsCircle, BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from 'react-icons/bs';

const Comentarios = () => {

  return (
    <div>
      <div className={s.titulo}>
        <h3 >Testimonials</h3>
      </div>
      <div className={s.conteItemscarousel}  >
        <div className={s.itemcarousel} id="fot1">
          <div className={s.tarjetacarousel}>
            <Tarjeta />
          </div>
          <div className={s.flechascarousel}>
            <a href="#fot3" className={s.flechaccion}><BsFillCaretLeftFill /></a>
            <a href="#fot2" className={s.flechaccion}><BsFillCaretRightFill /></a>
          </div>
        </div>
        <div className={s.itemcarousel}>
          <div className={s.tarjetacarousel} id="fot2">
            <Tarjetab />
          </div>
          <div className={s.flechascarousel}>
            <a href="#fot1" className={s.flechaccion}><BsFillCaretLeftFill /></a>
            <a href="#fot3" className={s.flechaccion}><BsFillCaretRightFill /></a>
          </div>
        </div>
        <div className={s.itemcarousel}>
          <div className={s.tarjetacarousel} id="fot3">
            <Tarjetac />
          </div>
          <div className={s.flechascarousel}>
            <a href="#fot2" className={s.flechaccion}><BsFillCaretLeftFill /></a>
            <a href="#fot1" className={s.flechaccion}><BsFillCaretRightFill /></a>
          </div>
        </div>
      </div>
      <div>
        <a href="#fot1" className={s.punto}><FaDotCircle /></a>
        <a href="#fot2" className={s.punto}><FaDotCircle /></a>
        <a href="#fot3" className={s.punto}><FaDotCircle /></a>

      </div>
    </div>
  )

}

export default Comentarios