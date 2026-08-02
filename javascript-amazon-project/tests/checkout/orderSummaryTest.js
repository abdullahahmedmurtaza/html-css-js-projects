import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe("Test Suite : renderOrderSummary", () => {
  afterAll(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
  });
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    document.querySelector(".js-test-container").innerHTML = `
  <div class="js-checkout-header"></div>
  <div class="js-order-summary"></div>
  <div class="js-payment-summary"></div>`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
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
      ]);
    });
    loadFromStorage();
  });
  it("displays the cart on the page", (done) => {
    loadProducts(() => {
      renderOrderSummary();
      expect(
        document.querySelectorAll(".js-cart-item-container").length,
      ).toEqual(2);
      expect(cart[0].productQuantity).toEqual(2);
      expect(cart[1].productQuantity).toEqual(1);
      done();
    });
  });
  it('removes a product from the cart',(done)=>{
    loadProducts(() => {
      renderOrderSummary();
      document.querySelector('.js-delete-quantity-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();
      expect(cart.length).toEqual(1);
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
      expect(document.querySelector('.js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')).toEqual(null);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
