import { cart } from "../data/cart.js";
import { products } from "../data/product.js";

export function calculateTotal(){
    let total_cost=0;
    cart.forEach((cartItem)=>{
        const productId=cartItem.productId;

        let matchingItem;
        products.forEach((product)=>{
            if(product.id === productId){
                matchingItem=product;
            }
        });

        total_cost+=(matchingItem.priceCents/100)*cartItem.quantity;
        

    });
    return total_cost.toFixed(2);
}
export function displayCost(total_cost){
    document.querySelector(`.js-items-cost`).innerHTML=`$${total_cost}`;
    document.querySelector(`.js-total-before-tax`).innerHTML=`$${total_cost}`;
    document.querySelector(`.js-estimated-tax`).innerHTML=`$${(total_cost/10).toFixed(2)}`;
    document.querySelector(`.js-order-total`).innerHTML=`$${(Number(total_cost)+Number((total_cost/10).toFixed(2))).toFixed(2)}`;
}


