import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";

describe("Test Suite : renderOrderSummary", () => {
  afterEach(()=>{
    // document.querySelector('.js-test-container').innerHTML = '';
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
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
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
  it('checks the correct product name',(done)=>{
    loadProducts(()=>{
      renderOrderSummary();
      expect(document.querySelectorAll('.js-product-name')[0].innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
      expect(document.querySelectorAll('.js-product-name')[1].innerText).toEqual('Intermediate Size Basketball');
      done();
    });
  });
  it('checks the correct prices',(done)=>{
    loadProducts(()=>{
      renderOrderSummary();
      expect(document.querySelectorAll('.js-product-price')[0].innerText).toEqual('$10.90');
      expect(document.querySelectorAll('.js-product-price')[1].innerText).toEqual('$20.95');
      expect(document.querySelectorAll('.js-product-price')[0].innerText).toContain('$');
      expect(document.querySelectorAll('.js-product-price')[1].innerText).toContain('$');
      done();
    });
  });

  it('updates the delivery options',(done)=>{
    loadProducts(()=>{
      renderOrderSummary();
      document.querySelector('.delivery-option-input-3-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();
      
      expect(document.querySelector('.delivery-option-input-3-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').checked).toEqual(true);
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].deliveryOptionId).toEqual('3');
      renderPaymentSummary();
      expect(document.querySelector('.js-shipping-price').innerText).toEqual('$9.99');
      expect(document.querySelector('.js-total-price').innerText).toEqual('$58.01');

      done();
    });
  });
});



