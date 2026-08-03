 function convertCurrency(priceCents){
    return (Math.round(Math.abs(priceCents)) / 100).toFixed(2);
}

export default convertCurrency;