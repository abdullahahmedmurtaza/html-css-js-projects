import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { convertCurrency } from "./utils/money.js";

//Add a function to display the added popup

function displayAddedPopup(productId) {
  document
    .querySelector(`.js-added-to-cart-${productId}`)
    .classList.add("js-add-to-cart-clicked");
  let timeoutId;
  timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    document
      .querySelector(`.js-added-to-cart-${productId}`)
      .classList.remove("js-add-to-cart-clicked");
  }, 2000);
}

let productsHTML = "";
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${convertCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;


// Call all the functions defined above on the click of the "Add To Cart Button"
document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const productQuantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value,
    );
    addToCart(productId, productQuantity);
    document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
    displayAddedPopup(productId);
  });
});
