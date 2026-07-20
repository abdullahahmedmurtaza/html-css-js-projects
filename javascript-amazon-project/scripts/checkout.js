import { cart,removeFromCart ,calculateCartQuantity, updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { convertCurrency } from "./utils/money.js";


// // Function to update the checkout header
// function updateCartQuantity() {
//   let cartQuantity = 0;
//   cart.forEach((cartItem) => {
//     cartQuantity += cartItem.productQuantity;
//   });
//   // console.log(cartQuantity);
//   document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity;
// }



let cartSummaryHTML = '';
let matchingItem;

cart.forEach((cartItem) => {
  products.forEach((product) => {
    if (cartItem.productId === product.id) matchingItem = product;
  });
  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.productQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = ${matchingItem.id}>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="save-quantity-link link-primary js-save-quantity-link-${matchingItem.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-container-id = "${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;
});

// console.log(cartSummaryHTML);

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;


// Remove item using the delete link

document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
  const productId = link.dataset.containerId;
  link.addEventListener('click',()=>{
    // console.log(productId);
    removeFromCart(productId);
    document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity();
  });
})

document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity();


// Update the quantity
document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
  
  link.addEventListener('click',()=>{
    const {productId} = link.dataset;
    // console.log(productId);
    document.querySelector(`.js-quantity-input-${productId}`).classList.add('quantity-input-displayed')
    document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('save-quantity-link-displayed');

    document.body.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
          document.querySelector(`.js-quantity-input-${productId}`).classList.remove('quantity-input-displayed')
      document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('save-quantity-link-displayed');
      const updatedQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      if(updatedQuantity<1000 && updatedQuantity>=0){
      updateQuantity(productId, updatedQuantity);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${updatedQuantity}`;
      document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity();
      }
        }
      })

    document.querySelector(`.js-save-quantity-link-${productId}`).addEventListener('click',()=>{
      document.querySelector(`.js-quantity-input-${productId}`).classList.remove('quantity-input-displayed')
      document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('save-quantity-link-displayed');
      const updatedQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
      if(updatedQuantity<1000 && updatedQuantity>=0){
      updateQuantity(productId, updatedQuantity);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${updatedQuantity}`;
      document.querySelector('.js-return-to-home-link').innerHTML = calculateCartQuantity();
      }
    });
  });
});


