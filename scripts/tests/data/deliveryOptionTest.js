import {cart, getCart, updateDeliveryOption} from "../../../data/cart.js"
describe('test suite: deliveryOption', ()=> {
    it('basic test for deliveryOption', ()=> {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(
            ()=> {
            return JSON.stringify([
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
            ])
        }
        );
        getCart();  
        updateDeliveryOption('2', "15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(cart[1].deliveryOptionId).toEqual('2');
        updateDeliveryOption('5', "e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    })
})