import React from 'react'

import CardComment from './CardComment';
import s from "../styles/review.module.css"




function View_Reviews({view}) {

  return (


    <div className={s.reviews}>
        <h3>Your opinion is important for us!</h3>
        <div className={s.reviews_list}>

        {view?.map((e, i) => (
          <CardComment key={i} image={e.data?.userImg} name={e.data?.userName} quote={e.data?.comentspositive}  rate={e.data?.star}/>
        ))}
   
        </div>
   

    </div>


  )
}

export default View_Reviews