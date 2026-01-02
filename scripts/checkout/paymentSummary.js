import { products, getProduct } from "../../data/products.js";
import { calcCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import {formatCurrency } from '../utils/utility.js'
import { addOrder } from "../../data/order.js";
export function renderPaymentSummary () {
  let html = '';
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let productId;
    let deliveryOptionId;
    cart.forEach(
        
        cartItem => {
          const productIds =[];
          const deliveryOptionIds = [];
            const  matchingProduct = getProduct(cartItem.productId);
            productPriceCents += matchingProduct.priceCents * cartItem.quantity;
            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
            shippingPriceCents += deliveryOption.priceCents;
            productIds.push(cartItem.productId);
            deliveryOptionIds.push(cartItem.deliveryOptionId);
            for (let i = 0; i < productIds; i++) {
              productId = productIds[i]
            }
            for (let i = 0; i < deliveryOptionIds; i++ ) {
              deliveryOptionId = deliveryOptionIds[i]
            }
        }
    )
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;
    const cartQuantity = calcCartQuantity();
    html += `
              <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-product-shipping-${productId}-${deliveryOptionId}">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;

    document.querySelector('.payment-summary').innerHTML = html;
  
    const orderBtn = document.querySelector('.js-place-order');
    orderBtn.addEventListener('click', async ()=> {
      if (!cart || cart.length <= 0) {
        alert('Make sure you have items in your cart before placing an order');
        return;
      }
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            cart: cart
          }
        )
      })
      const order = await response.json()
      addOrder(order);
      localStorage.setItem('cart', JSON.stringify([]))
      window.location.href = 'orders.html';
    })
  }