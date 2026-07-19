export const cart = [];

// Add a function to push the matching item in the cart.
function addToCart(productId, productQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.name === productId) matchingItem = cartItem;
  });
  if (matchingItem) matchingItem.productQuantity += productQuantity;
  else {
    cart.push({
      productId,
      productQuantity,
    });
  }
}