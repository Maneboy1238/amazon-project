function Cart(localStorageKey) {
    const cart = {
        cartItem: undefined,
        getCart() {
              this.cartItem = JSON.parse(localStorage.getItem(localStorageKey));
        if (!this.cartItem) {
            this.cartItem =   [
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
        
        },
    addToCart(productId, quantity) {
        console.log(this.cartItem)        
       let matchingItem = this.cartItem.find(
        cartItem => productId === cartItem.productId
       )
        if (matchingItem) {
            matchingItem.quantity += quantity; 
        } else {
        this.cartItem.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        })}
     this.saveCartToStorage();   
    },
    removeProductFromCart (productId) {
        this.cartItem = this.cartItem.filter(cartItem => {return cartItem.productId !== productId})
        this.saveCartToStorage();
    },
    saveCartToStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem))
    },
    calcCartQuantity () {
        let cartQuantity = 0;
        this.cartItem.forEach( cartItem => cartQuantity += cartItem.quantity);
        return cartQuantity;
    },
    updateCartQuantityToNewQuantity(productId, newQuantity) {
        let matchingItem = this.cartItem.find(cartItem => productId === cartItem.productId)
        matchingItem.quantity = newQuantity;
        
        this.saveCartToStorage();
    },
    updateDeliveryOption (deliveryOptionId, productId) {
        let matchingItem = this.cartItem.find(cartItem => cartItem.productId === productId);
        if (['1','2','3'].includes(deliveryOptionId)) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveCartToStorage();
        }
    }
}
return cart;
}
const cart = Cart('cart-oop');
cart.getCart();
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e")
const businessCart = Cart('cart-business');
businessCart.getCart();
console.log(cart);
console.log(businessCart);