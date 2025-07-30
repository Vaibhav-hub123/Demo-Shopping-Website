export const cart = [];


export function addToCart(product_id){
    let matchingItem;

    cart.forEach((item)=>{
        if(product_id === item.productId){
            matchingItem=item;        
        }
    })

    const quantitySelected=Number(document.querySelector(`.js-quantity-select-${product_id}`).value);

    if(matchingItem){
        matchingItem.quantity+=quantitySelected;
    }else{
        cart.push({
            productId:product_id,
            quantity: quantitySelected
        })
    }
}

export function UpdateCartQuantity(){
    let tq=0;

    cart.forEach((item) => {
        tq+=item.quantity;
    });

    document.querySelector(`.cart-quantity`).innerHTML=tq;
}