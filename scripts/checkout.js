import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { loadProducts } from "../data/products.js";
import "../data/backend-practice.js";
loadProducts(()=> {
renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
})
