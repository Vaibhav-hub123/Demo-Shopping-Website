import { cart ,removeProduct, saveToStorage, totalQuantity,updateQuantity,UpdateCartQuantity,updateDeliveryOptions} from "../data/cart.js";
import { products } from "../data/product.js";
import { calculateTotal ,displayCost } from "./reciept.js";
import {deliveryOptions} from "../data/deliveryOptions.js";



let itemList="";
const today=dayjs();
const sevenDays=today.add(7,'days');
const threeDays=today.add(3,'days');
const oneDay=today.add(1,'days');

cart.forEach((cartItem)=>{
    const productId=cartItem.productId;

    let matchingItem;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingItem=product;
        }
    });


    const deliveryOptionId=cartItem.DeliveryOptionID;

    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
            deliveryOption=option;
        }
    });

    const today=dayjs();
    const nextDay=(today.add(deliveryOption.deliveryDays,'days')).format('dddd, MMMM D');

    itemList+=`<div class="product-order-info-container js-cart-product-container-${cartItem.productId}">
        <div class="delivery-day-date">
            Delivery date: ${nextDay}
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
                        <span class="quantity-label js-item-quantity-${matchingItem.id}">
                            ${cartItem.quantity}
                        </span>
                    </span>
                    <span class="Update-checkout link-primary js-update-checkout js-update-${matchingItem.id}" data-product-id="${matchingItem.id}">Update</span>
                    
                    <input type="number" name="newQuantityInput" class="quantity-input js-quantity-input-${matchingItem.id}" min="1">
                    <span class="save-quantity-link link-primary js-save-quantity-input-${matchingItem.id}" data-product-id="${matchingItem.id}">save</span>
                    
                    <span class="Delete-checkout js-delete-checkout link-primary" data-product-id="${matchingItem.id}">Delete</span>

                </div>
            </div>

            <div class="shipping-info">
                <div class="delivery-options">Choose a delivery option:</div>
                ${generateDeliveryOptions(matchingItem,cartItem)}
            </div>
        </div>
    </div>`;
});






function generateDeliveryOptions(matchingItem,cartItem){
    let deliveryDatesHTML='';
    deliveryOptions.forEach((deliveryOption)=>{ 


        const today=dayjs();
        const nextDay=(today.add(deliveryOption.deliveryDays,'days')).format('dddd, MMMM D');
        const price=((deliveryOption.priceCents)/100).toFixed(2);
        const priceString=price == 0 ? 'FREE' : `$${price} - `;


        const isChecked= deliveryOption.id === cartItem.DeliveryOptionID;


        deliveryDatesHTML+=`
        <div class="shipping-options js-delivery-option" 
        data-product-id="${matchingItem.id}" 
        data-delivery-option-id="${deliveryOption.id}">

            <input type="radio" ${ isChecked ? 'checked' : ''} 
            name="checkout-checkbox-${matchingItem.id}" 
            class="shipping-checkbox-checkout">

            <div class="shipping-details">
                <div class="shipping-details-time">
                    ${nextDay}
                </div>
                <div class="shipping-detail-cost">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    });
    return deliveryDatesHTML;
}


document.querySelectorAll(`.js-delivery-option`).forEach((element)=>{
    console.log(element);
    element.addEventListener('click',()=>
    {
        const {productId,deliveryOptionId}=element.dataset; 
        updateDeliveryOptions(productId,deliveryOptionId);

    });
});

displayCost(calculateTotal());
displayTotal();
document.querySelector(`.product-order-info`).innerHTML=itemList;

document.querySelectorAll(`.js-delete-checkout`).forEach((link)=>{
            link.addEventListener('click',()=>{
                const prod_id=link.dataset.productId;


                removeProduct(prod_id);


                document.querySelector(`.js-cart-product-container-${prod_id}`).remove();


                displayTotal();   
                displayCost(calculateTotal());
            }
        );
    }
);

function displayTotal(){
    let itemQuantity=totalQuantity();
    document.querySelector(`.checkout-items-link`).innerHTML=`${itemQuantity} items`;
    document.querySelector(`.order-items-no`).innerHTML=`${itemQuantity}`;
}

document.querySelectorAll(`.js-update-checkout`).forEach((link)=>{
        link.addEventListener('click',()=>{
            const prod_id=link.dataset.productId;
            
            const container = document.querySelector(`.js-cart-product-container-${prod_id}`);
            container.classList.add('is-editing-quantity');
        });
});

document.querySelectorAll(`.save-quantity-link`).forEach((link)=>{
    link.addEventListener('click',()=>{
        const prod_id=link.dataset.productId;  
        
        
        const newQuantity=Number(document.querySelector(`.js-quantity-input-${prod_id}`).value);
        
        
        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }


        updateQuantity(prod_id,newQuantity);
    

        const container = document.querySelector(`.js-cart-product-container-${prod_id}`);
        container.classList.remove('is-editing-quantity');
        

        const quantityLabel = document.querySelector(`.js-item-quantity-${prod_id}`);
        quantityLabel.innerHTML = newQuantity;


        displayTotal();
        displayCost(calculateTotal());
        
    });
});