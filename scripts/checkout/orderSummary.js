import {products} from '../../data/products.js'
import {cart, removeProductFromCart, calcCartQuantity, updateCartQuantityToNewQuantity}  from '../../data/cart.js'
import { formatCurrency } from '../utils/utility.js';
export function renderOrderSummary (){let generateCheckoutHtml = '';
cart.forEach(
    cartItem => {
        let productId = cartItem.productId;
        let matchingProduct = products.find(product => productId === product.id)
        generateCheckoutHtml += `
        <div class="cart-item-container js-product-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
    }
)
document.querySelector('.js-checkout-product-container').innerHTML = generateCheckoutHtml;

const productDeleteBtn = document.querySelectorAll('.js-product-delete-btn');
productDeleteBtn.forEach(
  deleteBtn => {
    deleteBtn.addEventListener('click', ()=>{
        const productId = deleteBtn.dataset.productId;
        removeProductFromCart(productId);
        const container = document.querySelectorAll(`.js-product-container-${productId}`);
        container.forEach(container => container.remove())
        document.querySelector('.js-checkout-items-quantity').innerHTML = `${calcCartQuantity(cart)} items`;
    })
  }
)
document.querySelector('.js-checkout-items-quantity').innerHTML = `${calcCartQuantity(cart)} items`;
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
          
          productQuantity.forEach(cartQuantity => cartQuantity.style.display = 'initial')
          /* recalculating the header */
         document.querySelector('.js-checkout-items-quantity').innerHTML = `${calcCartQuantity(cart)} items`;
          renderOrderSummary();

        })
      })

    })
  }
)
}
