import { cart ,removeProduct, saveToStorage} from "../data/cart.js";
import { products } from "../data/product.js";


let itemList="";


cart.forEach((cartItem)=>{
    const productId=cartItem.productId;

    let matchingItem;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingItem=product;
        }
    });

    itemList+=`<div class="product-order-info-container js-cart-product-container-${cartItem.productId}">
        <div class="delivery--day-date">
            Delivery date: Tuesday,June 21
        </div>
        <div class="product-image-quantity-price-info">
            <div class="checkout-image-container">
                <img src="${matchingItem.image}" class="product-image-in-checkout">
            </div>

            <div class="name-price-quntity">
                <div class="product-name-in-checkout">
                    ${matchingItem.name}
                </div>
                <div class="product-price-checkout">$${(matchingItem.priceCents/100).toFixed(2)}</div>
                <div>
                    <span>
                        Quantity:
                        <span>
                            ${cartItem.quantity}
                        </span>
                    </span>
                    <span class="Update-checkout">Update</span>
                    <span class="Delete-checkout js-delete-checkout" data-product-id="${matchingItem.id}">Delete</span>

                </div>
            </div>

            <div class="shipping-info">
                <div class="delivery-options">Choose a delivery option:</div>
                <div class="shipping-options">
                    <input type="radio" name="checkout-checkbox-${cartItem.productId}" class="shipping-checkbox-checkout">
                    <div class="shipping-details">
                        <div class="shipping-details-time">Tuesday, June 21</div>
                        <div class="shipping-detail-cost">FREE Shipping</div>
                    </div>
                </div>
                <div class="shipping-options">
                    <input type="radio" name="checkout-checkbox-${cartItem.productId}" class="shipping-checkbox-checkout">
                    <div class="shipping-details">
                        <div class="shipping-details-time">Wednesday, June 15</div>
                        <div class="shipping-detail-cost">$4.99-Shipping</div>
                    </div>
                </div>
                <div class="shipping-options">
                    <input type="radio" name="checkout-checkbox-${cartItem.productId}" class="shipping-checkbox-checkout">
                    <div class="shipping-details">
                        <div class="shipping-details-time">Monday, June 13</div>
                        <div class="shipping-detail-cost">$9.99-Shipping</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
});

document.querySelector(`.product-order-info`).innerHTML=itemList;
document.querySelectorAll(`.js-delete-checkout`)
    .forEach((link)=>{
        link.addEventListener('click',()=>{
            const prod_id=link.dataset.productId;
            removeProduct(prod_id);
            document.querySelector(`.js-cart-product-container-${prod_id}`).remove();
            console.log(prod_id);
            
        });
    });