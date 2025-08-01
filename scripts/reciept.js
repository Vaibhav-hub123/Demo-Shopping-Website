import { cart } from "../data/cart.js";
import { products } from "../data/product.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

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
export function deliveryCost(){
    let totalShipping = 0;

  cart.forEach((cartItem) => {
    let matchingOption;

    deliveryOptions.forEach((option) => {
      if (option.id === cartItem.DeliveryOptionID) {
        matchingOption = option;
      }
    });

    totalShipping += matchingOption ? matchingOption.priceCents : 0;
  });

  return totalShipping / 100; 
} 
export function displayCost(total_cost){
    const total_cost_before=Number(total_cost);
    const delivery_charge=deliveryCost();
    const total_before_tax=total_cost_before+delivery_charge;
    const after_tax=total_before_tax/10;
    const order_total=total_before_tax+after_tax;



    document.querySelector(`.js-items-cost`).innerHTML=`$${total_cost_before.toFixed(2)}`
    document.querySelector(`.js-shipping-cost`).innerHTML=`$${delivery_charge.toFixed(2)}`
    document.querySelector(`.js-total-before-tax`).innerHTML=`$${total_before_tax.toFixed(2)}`
    document.querySelector(`.js-estimated-tax`).innerHTML=`$${after_tax.toFixed(2)}`
    document.querySelector(`.js-order-total`).innerHTML=`$${order_total.toFixed(2)}`
}


