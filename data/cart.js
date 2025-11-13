export let cart;
export function getCart() {
      cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart =   [
        {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '2'
        },
        {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '1'
        }
    ];

}

}
export function addToCart (productId, quantity) {
    
   let matchingItem = cart.find(
    cartItem => productId === cartItem.productId
   )
    if (matchingItem) {
        matchingItem.quantity += quantity; 
    } else {
    cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
    })}
 saveCartToStorage();   
}
export function removeProductFromCart (productId) {
    cart = cart.filter(cartItem => {return cartItem.productId !== productId})
    saveCartToStorage();
}
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))

}
export function calcCartQuantity () {
    let cartQuantity = 0;
    cart.forEach( cartItem => cartQuantity += cartItem.quantity);
    return cartQuantity;
}
export function updateCartQuantityToNewQuantity(productId, newQuantity) {
    let matchingItem = cart.find(cartItem => productId === cartItem.productId)
    matchingItem.quantity = newQuantity;
    
    saveCartToStorage();
}
export function updateDeliveryOption (deliveryOptionId, productId) {
    let matchingItem = cart.find(cartItem => cartItem.productId === productId);
    if (['1','2','3'].includes(deliveryOptionId)) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveCartToStorage();
    }
}
export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=> {
        console.log(xhr.response);
        fun();
    })
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}