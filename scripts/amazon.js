import {cart,addToCart,UpdateCartQuantity , saveToStorage,totalQuantity} from '../data/cart.js';
import { products } from '../data/product.js';
import { calculateTotal } from './reciept.js';

let productsHTML="";


products.forEach((product) => {
    productsHTML+= `
    <div class="item-info">
        <div class="item-image-container">
            <img src="${product.image}" class="product-image">
        </div>

        <div class="item-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="item-rating-container">
            <div class="item-rating-stars">
                <img src="images/rating-${product.rating.stars*10}.png" class="item-rating-image">
            </div>
            <div class="item-ratin-no link-primary">${product.rating.count}</div>
        </div>


        <div class="item-price">$${(product.priceCents/100).toFixed(2)}</div>

        <div class="item-amount">
            <select class="js-quantity-select-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>

        <div class="item-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/checkmark.png" class="Add-to-cart-image">added
        </div>


        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>
    `;
});
document.querySelector(`.js-products-grid`).innerHTML=productsHTML;

UpdateCartQuantity();

document.querySelectorAll(`.js-add-to-cart`).forEach((button)=>{
    button.addEventListener('click',()=>{
        const product_id =button.dataset.productId;  
        addToCart(product_id);
        UpdateCartQuantity();

        const addedToCartDocument=document.querySelector(`.js-added-to-cart-${product_id}`).classList;
        addedToCartDocument.add('active-added-to-cart');
        
        setTimeout(() => {
        addedToCartDocument.remove('active-added-to-cart');
        }, 2000);
        calculateTotal();
    })
});





