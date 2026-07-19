export let cart = [
  {
    'productId' : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    'productQuantity' : 2
  },
  {
    'productId' : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    'productQuantity' : 1
  }
];

// Add a function to push the matching item in the cart.
export function addToCart(productId, productQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) matchingItem = cartItem;
  });
  if (matchingItem) matchingItem.productQuantity += productQuantity;
  else {
    cart.push({
      productId,
      productQuantity,
    });
  }
}


// Function for deleting the product from the checkout page

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId) newCart.push(cartItem);
  });
  cart = newCart;
  document.querySelector(`.js-data-item-container-${productId}`).remove();
}