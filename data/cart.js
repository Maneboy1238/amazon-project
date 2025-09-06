
export const  cart = [];
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
}