import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export const deliveryOptions = [{
    'deliveryOptionId' : '1',
    'deliveryDays' : 7,
    'priceCents' : 0
},{
    'deliveryOptionId' : '2',
    'deliveryDays' : 3,
    'priceCents' : 499
},{
    'deliveryOptionId' : '3',
    'deliveryDays' : 1,
    'priceCents' : 999
}];

export function getDeliveryOption(deliveryOptionId){
    let matchingOption;
    deliveryOptions.forEach((option)=>{
        if (option.deliveryOptionId === deliveryOptionId) matchingOption = option;
    })
    return matchingOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  let deliveryDateString = String(deliveryOption.deliveryOptionId === '1'? `${dayjs().add(deliveryOption.deliveryDays,'day').format('dddd, MMMM D')}` : deliveryOption.deliveryOptionId === '2'? `${dayjs().add(deliveryOption.deliveryDays,'day').format('dddd, MMMM D')}` : `${dayjs().format('dddd, MMMM D')}`);
//   console.log(deliveryDateString);
    // const numberOfDaysToAdd = deliveryOption.deliveryDays;
    // while ()



return deliveryDateString;
}