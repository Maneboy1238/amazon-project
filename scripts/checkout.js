import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import "../data/products.js";
Promise.all([
    loadProductsFetch(),
new Promise((resolve)=> {
        loadCart(()=> {
            resolve();
        })
    })
]).then(()=> {
renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
})
/*
new Promise((resolve)=> {
    loadProducts(()=> {
        resolve()
    })
}).then(()=> {
    return new Promise((resolve)=> {
        loadCart(()=> {
            resolve();
        })
    })
}).then(()=> {

    
});
*/ 
/*
loadProducts(()=> {
    loadCart(()=> {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
    })
})
*/
