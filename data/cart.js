
export let  cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart =   [];

}
export function getCart() {
    return cart;
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
        quantity
    })}
 console.log(cart);
 saveCartToStorage();   
}
export function removeProductFromCart (productId) {
    cart = cart.filter(cartItem => {return cartItem.productId !== productId})
    saveCartToStorage();
}
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))

}
export function calcCartQuantity (cart) {
    let cartQuantity = 0;
    cart.forEach( cartItem => cartQuantity += cartItem.quantity);
    return cartQuantity;
}