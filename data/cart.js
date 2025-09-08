
export let  cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
    cart =   [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 2
                }
];

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
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))

}