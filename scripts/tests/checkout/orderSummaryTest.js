import { renderOrderSummary } from "../../checkout/orderSummary";
import { getCart, cart } from "../../../data/cart";
import { products } from "../../../data/products";
import {formatCurrency} from '../../utils/utility.js';
import { renderPaymentSummary } from "../../checkout/paymentSummary.js";
describe('test suite: renderOrderSummary', ()=> {

        const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
        const testContainer = document.querySelector('.js-test-container');
        
    beforeEach(()=> {
        spyOn(localStorage, 'setItem');
        testContainer.innerHTML = `
        <div class="js-checkout-product-container"></div>
        <div class="payment-summary"></div>
        <div class="js-checkout-header"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(
            () => {
                return JSON.stringify([
                    {
                        productId: productId1,
                        quantity: 2,
                         deliveryOptionId: '2'
                    },
                    {
                        productId: productId2,
                        quantity: 1,
                        deliveryOptionId: '1'
                    }
                ]);
            }
        );
        getCart();
        renderOrderSummary();
        renderPaymentSummary();
    });
    afterEach(()=>  {
        testContainer.innerHTML= '';
    })
    it('checking the generation of our cart in the checkout page', ()=> {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
  //      expect(document.querySelector(`.js-iproduct-quantity-${productId1}`)).toContain('Quantity: 2')
    });
    it('removes a product', ()=> {
      document.querySelector(`.js-delete-link-${productId1}`).click();  
      expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
      expect(document.querySelector(`.js-product-container-${productId1}`)).toEqual(null);
      expect(document.querySelector(`.js-product-container-${productId2}`)).not.toEqual(null);
      


    })
    it('checks if it displays the correct name', ()=> {
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual( products[0].name  )
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual( products[1].name  )
    });
    it('checks prices in checkout page', ()=> {
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual( `$${formatCurrency(products[0].priceCents)}`)
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual(`$${formatCurrency(products[1].priceCents)}`)
    });
    it('test on our delivery options', ()=> {
        document.querySelector(`.js-input-delivery-option-${productId1}-${cart[0].deliveryOptionId}`).checked;
        //expect(document.querySelector(`.js-product-shipping-${productId1}-${cart[0].deliveryOptionId}`).innerText).toContain('$4.99')
    })
})