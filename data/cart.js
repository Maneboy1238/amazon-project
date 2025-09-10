
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
 saveToStorage();   
}
export function removeProductFromCart (productId) {
    cart = cart.filter(cartItem => {return cartItem.productId !== productId})
    saveToStorage();
}
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))

}
