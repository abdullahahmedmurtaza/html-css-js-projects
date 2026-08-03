import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import  convertCurrency from "../utils/money.js";

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        productPriceCents += cartItem.productQuantity * product.priceCents;
        shippingPriceCents += deliveryOption.priceCents;
        // console.log(product);
        // console.log(deliveryOption);
        
    }); 
    // console.log(productPriceCents);
    // console.log(shippingPriceCents);
       const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    //    console.log(totalBeforeTaxCents);
       const totalAfterTaxCents = totalBeforeTaxCents * 0.1;
    //    console.log(totalAfterTaxCents);
       const totalCents = totalBeforeTaxCents + totalAfterTaxCents;
    //    console.log(totalCents);
       

       const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${convertCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-price">$${convertCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convertCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${convertCurrency(totalAfterTaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money  js-total-price">$${convertCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
       `
       document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
       
}