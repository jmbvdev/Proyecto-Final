import axios from "axios";
import React from "react";
import {RiBitCoinLine}from "react-icons/ri"
import s from "../../styles/formPost.module.css"


const Coinbase = ({totalAmount}) => {
    let paymentUrl = "";
    const amount = totalAmount.toString();
    console.log(amount)
    React.useEffect(() => {
        (async () => {await axios.get(`http://api-plants-b6153/us-central1/app/coinbase/create-charge/${amount}`)
        .then(response => {
            paymentUrl = response.data.hosted_url
            return paymentUrl
    })})()
    }, []);
    
    const handleLink = () => {
        window.open(paymentUrl, '_self')
    };

    return (
        <div onClick={handleLink} className={s.crypto}>
            <RiBitCoinLine className={s.coin}/>
            <p>PAY WITH CRYPTO</p>

        </div>
    )
};

export default Coinbase;