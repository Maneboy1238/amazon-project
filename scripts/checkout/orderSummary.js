import {products, getProduct} from '../../data/products.js'
import {cart, removeProductFromCart, calcCartQuantity, updateCartQuantityToNewQuantity, updateDeliveryOption}  from '../../data/cart.js'
import { formatCurrency } from '../utils/utility.js';
import {deliveryOptions, getDeliveryDate, getDeliveryOption} from '../../data/deliveryoptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkout-header.js';
import dayjs from 'dayjs'
export function renderOrderSummary (){
let generateCheckoutHtml = '';
cart.forEach(
    cartItem => {
        let productId = cartItem.productId;
        let matchingProduct = getProduct(productId);
        const deliveryOption = getDeliveryOption(cartItem);
        const dateString = getDeliveryDate(deliveryOption);
     generateCheckoutHtml += `
        <div class="cart-item-container js-product-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-product-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-product-update-btn" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-product-quantity-${matchingProduct.id}">
                  save 
                  </span>
                  <span class="delete-quantity-link link-primary js-product-delete-btn"
                  data-product-id="${cartItem.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
              ${generateDeliveryOptions(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
        `
    }
)
function generateDeliveryOptions (matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach(
    
    deliveryOption => {
      const dateString = getDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
      <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input js-input-delivery-option"
                    name="delivery-option-${matchingProduct.id}" 
                    data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}" ${isChecked ? 'checked' : ''}>
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
      `
    }
  )
  return html;
}
document.querySelector('.js-checkout-product-container').innerHTML = generateCheckoutHtml;

const productDeleteBtn = document.querySelectorAll('.js-product-delete-btn');
productDeleteBtn.forEach(
  deleteBtn => {
    deleteBtn.addEventListener('click', ()=>{
        const productId = deleteBtn.dataset.productId;
        removeProductFromCart(productId);
        const container = document.querySelectorAll(`.js-product-container-${productId}`);
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
    })
  }
)

const updateBtn = document.querySelectorAll('.js-product-update-btn');
updateBtn.forEach(
  updateBtn => {
    updateBtn.addEventListener('click', ()=> {
      const productId = updateBtn.dataset.productId;
      const productContainer = document.querySelectorAll(`js-product-container-${productId}`);

      

      const saveBtn = document.querySelectorAll(`.js-save-product-quantity-${productId}`);

      const productQuantity = document.querySelectorAll(`.js-product-quantity-${productId}`);

      const input = document.querySelectorAll(`.js-quantity-input-${productId}`);

      updateBtn.style.display = 'none';
    
      productQuantity.forEach(cartQuantity => cartQuantity.style.display = 'none')

      
    input.forEach(input =>  input.style.display = 'initial')
    
    saveBtn.forEach(btn => {
        btn.style.display = 'initial';

        btn.addEventListener('click', () => {
          let newQuantity = 0;

      input.forEach(input => {
        newQuantity = Number(input.value);
        input.style.display = 'none';
      })
          updateCartQuantityToNewQuantity(productId, newQuantity);
          
          productQuantity.forEach(cartQuantity => cartQuantity.style.display = 'initial');
          renderOrderSummary();
          renderPaymentSummary();
          renderCheckoutHeader();
        })
      })

    })
  }
)
const deliveryOptionInput = document.querySelectorAll('.delivery-option-input');
deliveryOptionInput.forEach(
  element => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(deliveryOptionId, productId);
      renderOrderSummary();
      renderPaymentSummary();
    }
    )
  }
)

}
