import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import '../data/cart-class.js'
import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";


// Using Promise.all to execute multiple promises at the simultaneously

Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('products loaded!');
        })
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('cart loaded!');
        })
    })
]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});





// Use promise chaining for loading.


// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('promise1 value');
//     })
// }).then((value)=>{
//     console.log(value);
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         })
//     })
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// Implementing the loading with callbacks

// loadProducts(()=>{
//     loadCart(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//     });
// })