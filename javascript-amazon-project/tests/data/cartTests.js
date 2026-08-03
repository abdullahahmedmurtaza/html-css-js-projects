import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
  updateDeliveryOptions,
} from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe("Test Suite : addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });
  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].productQuantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 1,
          deliveryOptionId: "1",
        },
      ]),
    );
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          productQuantity: 2,
          deliveryOptionId: "1",
        },
      ]),
    );
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].productQuantity).toEqual(2);
  });
});

describe("Test Suite : removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
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
    document.querySelector(".js-test-container").innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-checkout-header"></div>
    `;
    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("removes a product IN the cart", (done) => {
    loadProducts(() => {
      removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            productQuantity: 1,
            deliveryOptionId: "1",
          },
        ]),
      );
      done();
    });
  });

  it("does not remove a product NOT IN the cart", (done) => {
    loadProducts(() => {
      removeFromCart("1234-5678-9876-4321");
      expect(cart.length).toEqual(2);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([
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
        ])
      );
      done();
    });
  });
});

describe('Test Suite : updateDeliveryOption',()=>{
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
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
    document.querySelector('.js-test-container').innerHTML = `
  <div class="js-checkout-header"></div>
  <div class="js-order-summary"></div>
  <div class="js-payment-summary"></div>
    `;
    loadFromStorage();
  });
  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
  });
  it('updates the delivery option of a product in the cart',()=>{
      updateDeliveryOptions('e43638ce-6aa0-4b85-b27f-e1d07eb678c6','3');
      expect(cart[0].deliveryOptionId).toEqual('3');
  });
  it('does not update the delivery option of a product NOT in the cart',()=>{
    updateDeliveryOptions('1234-5678-9876-5432','2');
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[1].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
