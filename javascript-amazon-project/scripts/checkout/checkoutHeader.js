import { calculateCartQuantity } from "../../data/cart.js";


export function renderCheckoutHeader(){
    const checkoutHTML = `Checkout (<a class="return-to-home-link"
            href="amazon.html">${calculateCartQuantity()} ${calculateCartQuantity() === 1? 'Item' : 'Items'}</a>)
    `
    document.querySelector(".js-checkout-header").innerHTML = checkoutHTML
}
