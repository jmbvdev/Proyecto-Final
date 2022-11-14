import axios from "axios";
import React from "react";


const Coinbase = ({totalAmount}) => {
    let paymentUrl = "";
    const amount = totalAmount.toString();
    console.log(amount)
    React.useEffect(() => {
        (async () => {await axios.get(`http://localhost:5000/api-plants-b6153/us-central1/app/coinbase/create-charge/${amount}`)
        .then(response => {
            paymentUrl = response.data.hosted_url
            return paymentUrl
    })})()
    }, []);
    
    const handleLink = () => {
        window.open(paymentUrl, '_blank')
    };

    return (
        <button onClick={handleLink}>PAY WITH CRYPTO</button>
    )
};

export default Coinbase;