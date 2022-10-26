
import s from '../styles/Carousel.module.css';
import {BsCircle, BsFillCaretLeftFill} from "react-icons/bs";
import {BsFillCaretRightFill} from 'react-icons/bs';
import {FaDotCircle} from 'react-icons/fa'
import foto1 from '../images/carousel/art.png'
import foto2 from '../images/carousel/big.png'
import foto3 from '../images/carousel/hoya.png'

 export default function Carousel() {
    return (
      <div>
      <div className={s.conteItemscarousel}  >
        <div className={s.itemcarousel} id="foto1">
            <div className={s.tarjetacarousel}>
                        <img src={foto1} className={s.imagen}/>
                        </div>                        
                        <div className={s.flechascarousel}>
                          <a href="#foto3" className={s.flechaccion}><BsFillCaretLeftFill/></a>
                          <a href="#foto2" className={s.flechaccion}><BsFillCaretRightFill/></a>
                        </div>
                                    </div>
                                    <div className={s.itemcarousel}>
            <div className={s.tarjetacarousel}  id="foto2">
            <img src={foto2} className={s.imagen}/>
                        </div>                        
                        <div className={s.flechascarousel}>
                        <a href="#foto1" className={s.flechaccion}><BsFillCaretLeftFill/></a>
                        <a href="#foto3" className={s.flechaccion}><BsFillCaretRightFill/></a>
                        </div>
                                    </div>     
                                    <div className={s.itemcarousel}>
            <div className={s.tarjetacarousel} id="foto3">
            <img src={foto3} className={s.imagen}/>
                        </div>                        
                        <div className={s.flechascarousel}>
                        <a href="#foto2" className={s.flechaccion}><BsFillCaretLeftFill/></a>
                        <a href="#foto1" className={s.flechaccion}><BsFillCaretRightFill/></a>
                        </div>
                                    </div> 
                    
            </div>
            <div>
            <a href="#foto1" className={s.punto}><FaDotCircle/></a>
            <a href="#foto2" className={s.punto}><FaDotCircle/></a>
            <a href="#foto3" className={s.punto}><FaDotCircle/></a>
                                                  
              </div>   
            </div>
    )
}  
