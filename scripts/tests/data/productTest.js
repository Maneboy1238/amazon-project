import { Product, Clothing, Appliance } from "../../../data/products"
describe('test suite: Running tests on our product classes', ()=> {
    it('tests on our product class', ()=> {
        const product = new Appliance(
              {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: 'appliance',
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  }
         )
        expect(product.extraInfoHTML()).toContain('instructions')
    })
})