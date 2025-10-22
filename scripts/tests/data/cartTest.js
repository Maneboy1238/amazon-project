import {cart, getCart, addToCart, removeProductFromCart} from '../../../data/cart.js';

describe('test suite: addToCart', () => {
    beforeEach(()=> {
    spyOn(localStorage, 'setItem');

    })
    it('add a new product to the cart', () => {
        
        spyOn(localStorage, 'getItem').and.callFake(
            () => {
                return JSON.stringify([]);
            }
        );
        getCart();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        //expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            deliveryOptionId: '1'
        }

        ]) )
    });
    it('test for an existing product', ()=> {
        spyOn(localStorage, 'getItem').and.callFake(
            () => {
                return JSON.stringify([{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1, 
                    deliveryOptionId: '1'
                }]);
            }
        );
        getCart();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
        expect(cart[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        //expect(cart[0].).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: null,
            deliveryOptionId: "1"
        }
        ]))
    });
    it('removes product from the cart', ()=> {
            spyOn(localStorage, 'getItem').and.callFake(
            () => {
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
                ]);
            }
        );
        getCart();
      
        removeProductFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        //removeProductFromCart('fdofdofttroerorijhfdfjsfgogjo');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
            [
             {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '1'
        }
                ]
        ))
        });
})