import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";

export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productQuantity: 2,
    deliveryOptionId : '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    productQuantity: 1,
    deliveryOptionId: '1'
  },
];
} 



// Save the cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a function to calculate the cart quantity

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.productQuantity;
  });
  // console.log(cartQuantity);
  return cartQuantity;
}

// Add a function to push the matching item in the cart.
export function addToCart(productId, productQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) matchingItem = cartItem;
  });
  if (matchingItem) matchingItem.productQuantity += productQuantity;
  else {
    cart.push({
      productId,
      productQuantity,
      deliveryOptionId : '1'
    });
  }
  saveToStorage();
}
// Add a function to remove the matching item in the cart.
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
  // document.querySelector(`.js-cart-item-container-${productId}`).remove();
  renderOrderSummary();
}

// function to update quantity at checkout
export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.productQuantity = newQuantity;
        saveToStorage();
      }
    });
}


// Function to update the delivery options

export function updateDeliveryOptions(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if (cartItem.productId === productId) matchingItem = cartItem;
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  // console.log(matchingItem);
  
  saveToStorage();

  // console.log(matchingItem);
  
}