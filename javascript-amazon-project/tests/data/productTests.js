import { Product, Clothing, loadProducts } from "../../data/products.js";

describe('Test Suite : extraInfoHTML',()=>{
    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML = `    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-checkout-header"></div>`;
    });
    it('checks the inner HTML according to the product type (Product)',(done)=>{
              const productDetails = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"],
  }
        loadProducts(()=>{
            const testObj1 = new Product(productDetails);
            expect(testObj1).toEqual(jasmine.any(Product));
            const returnedHTML = testObj1.extraInfoHTML();
            expect(returnedHTML).toEqual(``);
            done();
        });
    });
    it('checks the inner HTML according to the product type (Clothing)',(done)=>{
  const productDetails = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  }
        loadProducts(()=>{
            const testObj2 = new Clothing(productDetails);
            expect(testObj2).toEqual(jasmine.any(Clothing));
            const returnedHTML = testObj2.extraInfoHTML();
            console.log(returnedHTML);
            expect(returnedHTML).toEqual(`<a href='images/clothing-size-chart.png' target='_blank'>Size Chart</a>`);
            done();
        });
    });
});