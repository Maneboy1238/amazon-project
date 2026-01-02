import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
async function loadPage() {
    try {
        //throw 'error1'
        await Promise.all([
         loadProductsFetch(),
         loadCartFetch()
        ])
} catch(error) {
        console.log(error)
        console.log('unexpected error')
    }
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*Promise.all([
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
    */
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
