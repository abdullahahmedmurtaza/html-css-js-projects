import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";


class Cart {

    cartItems;
    localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
  }

    loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        productQuantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        productQuantity: 1,
        deliveryOptionId: "1",
      },
    ];
  }

  // Save the cart to localStorage
  saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  }
 // Add a function to calculate the cart quantity

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.productQuantity;
    });
    // console.log(cartQuantity);
    return cartQuantity;
  }

  // Add a function to push the matching item in the cart.
  addToCart(productId, productQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) matchingItem = cartItem;
    });
    if (matchingItem) matchingItem.productQuantity += productQuantity;
    else {
      this.cartItems.push({
        productId,
        productQuantity,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }

  // function to update quantity at checkout
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.productQuantity = newQuantity;
        this.saveToStorage();
      }
    });
  }

  // Function to update the delivery options

  updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) matchingItem = cartItem;
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    // console.log(matchingItem);

    this.saveToStorage();

    // console.log(matchingItem);
  }

  // function to update quantity at checkout
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.productQuantity = newQuantity;
        this.saveToStorage();
      }
    });
  }

  // Function to update the delivery options

  updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) matchingItem = cartItem;
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    // console.log(matchingItem);

    this.saveToStorage();

    // console.log(matchingItem);
  }


}


// function GenerateCart(localStorageKey){
//     const cart = {
//   cartItems: undefined,
//   loadFromStorage() {
//     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
//       {
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         productQuantity: 2,
//         deliveryOptionId: "1",
//       },
//       {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         productQuantity: 1,
//         deliveryOptionId: "1",
//       },
//     ];
//   },

//   // Save the cart to localStorage
//   saveToStorage() {
//     localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
//   },

//   // Add a function to calculate the cart quantity

//   calculateCartQuantity() {
//     let cartQuantity = 0;
//     this.cartItems.forEach((cartItem) => {
//       cartQuantity += cartItem.productQuantity;
//     });
//     // console.log(cartQuantity);
//     return cartQuantity;
//   },

//   // Add a function to push the matching item in the cart.
//   addToCart(productId, productQuantity) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) matchingItem = cartItem;
//     });
//     if (matchingItem) matchingItem.productQuantity += productQuantity;
//     else {
//       this.cartItems.push({
//         productId,
//         productQuantity,
//         deliveryOptionId: "1",
//       });
//     }
//     this.saveToStorage();
//   },

//   // Add a function to remove the matching item in the cart.
//   removeFromCart(productId) {
//     const newCart = [];
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId !== productId) {
//         newCart.push(cartItem);
//       }
//     });
//     this.cartItems = newCart;
//     this.saveToStorage();
//     // document.querySelector(`.js-cart-item-container-${productId}`).remove();
//     this.renderOrderSummary();
//   },

//   // function to update quantity at checkout
//   updateQuantity(productId, newQuantity) {
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) {
//         cartItem.productQuantity = newQuantity;
//         this.saveToStorage();
//       }
//     });
//   },

//   // Function to update the delivery options

//   updateDeliveryOptions(productId, deliveryOptionId) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) matchingItem = cartItem;
//     });
//     matchingItem.deliveryOptionId = deliveryOptionId;
//     // console.log(matchingItem);

//     this.saveToStorage();

//     // console.log(matchingItem);
//   }
// };
// return cart;
// }

// create cart using a function

// const cart = GenerateCart('cart-oop');
// const businessCart = GenerateCart('business-cart');


// cart.loadFromStorage();
// cart.addToCart('c2a82c5e-aff4-435f-9975-517cfaba2ece',3)
// console.log(cart);


// copy-pasted the entire cart
// const businessCart = {
//   cartItems: undefined,
//   loadFromStorage() {
//     this.cartItems = JSON.parse(localStorage.getItem("cart-business")) || [
//       {
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         productQuantity: 2,
//         deliveryOptionId: "1",
//       },
//       {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         productQuantity: 1,
//         deliveryOptionId: "1",
//       },
//     ];
//   },

//   // Save the cart to localStorage
//   saveToStorage() {
//     localStorage.setItem("cart-business", JSON.stringify(this.cartItems));
//   },

//   // Add a function to calculate the cart quantity

//   calculateCartQuantity() {
//     let cartQuantity = 0;
//     this.cartItems.forEach((cartItem) => {
//       cartQuantity += cartItem.productQuantity;
//     });
//     // console.log(cartQuantity);
//     return cartQuantity;
//   },

//   // Add a function to push the matching item in the cart.
//   addToCart(productId, productQuantity) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) matchingItem = cartItem;
//     });
//     if (matchingItem) matchingItem.productQuantity += productQuantity;
//     else {
//       this.cartItems.push({
//         productId,
//         productQuantity,
//         deliveryOptionId: "1",
//       });
//     }
//     this.saveToStorage();
//   },

//   // Add a function to remove the matching item in the cart.
//   removeFromCart(productId) {
//     const newCart = [];
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId !== productId) {
//         newCart.push(cartItem);
//       }
//     });
//     this.cartItems = newCart;
//     this.saveToStorage();
//     // document.querySelector(`.js-cart-item-container-${productId}`).remove();
//     this.renderOrderSummary();
//   },

//   // function to update quantity at checkout
//   updateQuantity(productId, newQuantity) {
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) {
//         cartItem.productQuantity = newQuantity;
//         this.saveToStorage();
//       }
//     });
//   },

//   // Function to update the delivery options

//   updateDeliveryOptions(productId, deliveryOptionId) {
//     let matchingItem;
//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId === productId) matchingItem = cartItem;
//     });
//     matchingItem.deliveryOptionId = deliveryOptionId;
//     // console.log(matchingItem);

//     this.saveToStorage();

//     // console.log(matchingItem);
//   }
// };

// businessCart.loadFromStorage();
// console.log(businessCart);

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

// cart.localStorageKey = 'cart-oop';
// businessCart.localStorageKey = 'business-cart';

cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);


