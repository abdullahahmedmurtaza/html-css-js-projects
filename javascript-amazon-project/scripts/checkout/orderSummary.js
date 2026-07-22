import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOptions
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import convertCurrency from "../utils/money.js";
// default export for dayjs ESM
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {calculateDeliveryDate, deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from "./paymentSummary.js";

import { renderCheckoutHeader } from "./checkoutHeader.js";

console.log(dayjs().add(5,'day').format('MMMM D'));
console.log(dayjs().add(1,'month').format('MMMM D'));
console.log(dayjs().subtract(1,'month').format('MMMM D'));
console.log(dayjs().subtract(1,'month').format('dddd'));


// const today = dayjs();
// const deliveryDate = today.add(7,'days');
// console.log(deliveryDate.format('dddd, MMMM D'));





// // Function to update the checkout header
// function updateCartQuantity() {
//   let cartQuantity = 0;
//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.productQuantity;
//   });
//   // console.log(cartQuantity);
//   document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity;
// }


// const today = dayjs();

export function renderOrderSummary(){

let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const matchingItem = getProduct(cartItem.productId)
  const matchingOption = getDeliveryOption(cartItem.deliveryOptionId);
  //   console.log(matchingOption);
  
  // console.log(matchingOption);
  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
             Delivery Date : ${calculateDeliveryDate(matchingOption)}
            </div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${convertCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingItem.productId}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.productQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = ${matchingItem.id}>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link-${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${matchingItem.id}" data-container-id = "${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem,cartItem)}
              </div>
            </div>
          </div>
`;
});



// Generate HTML for delivery options
function deliveryOptionsHTML(matchingItem,cartItem){
  let html = '';
  deliveryOptions.forEach((option)=>{
    const priceString = option.priceCents === 0? 'FREE - ' : `$${convertCurrency(option.priceCents)} - `;
    const deliveryDate = calculateDeliveryDate(option)
    let isChecked;
      isChecked = cartItem.deliveryOptionId === option.deliveryOptionId ? 'checked' : ''; 
    html += `<div class="delivery-option js-delivery-option" data-delivery-option-id = "${option.deliveryOptionId}" data-product-id = "${matchingItem.id}">
                  <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}Shipping
                    </div>
                  </div>
                </div>`
  });
  return html;
}

// console.log(cartSummaryHTML);

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// Remove item using the delete link

document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
  const productId = link.dataset.containerId;
  link.addEventListener("click", () => {
    // console.log(productId);
    removeFromCart(productId);
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});

renderCheckoutHeader();

// Update the quantity
document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    // console.log(productId);
    document
      .querySelector(`.js-quantity-input-${productId}`)
      .classList.add("quantity-input-displayed");
    document
      .querySelector(`.js-save-quantity-link-${productId}`)
      .classList.add("save-quantity-link-displayed");

    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        document
          .querySelector(`.js-quantity-input-${productId}`)
          .classList.remove("quantity-input-displayed");
        document
          .querySelector(`.js-save-quantity-link-${productId}`)
          .classList.remove("save-quantity-link-displayed");
        const updatedQuantity = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value,
        );
        if (updatedQuantity < 1000 && updatedQuantity >= 0) {
          updateQuantity(productId, updatedQuantity);
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
            `${updatedQuantity}`;
            renderCheckoutHeader();
        }
      }
    });

    document
      .querySelector(`.js-save-quantity-link-${productId}`)
      .addEventListener("click", () => {
        document
          .querySelector(`.js-quantity-input-${productId}`)
          .classList.remove("quantity-input-displayed");
        document
          .querySelector(`.js-save-quantity-link-${productId}`)
          .classList.remove("save-quantity-link-displayed");
        const updatedQuantity = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value,
        );
        if (updatedQuantity < 1000 && updatedQuantity >= 0) {
          updateQuantity(productId, updatedQuantity);
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
            `${updatedQuantity}`;
            renderCheckoutHeader();
        }
      });
  });
});

// Update the cart and the page when selecting a delivery option
document.querySelectorAll('.js-delivery-option').forEach((option)=>{
  const {deliveryOptionId, productId} = option.dataset;
  option.addEventListener('click', ()=>{
    updateDeliveryOptions(productId,deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  });
});
}
