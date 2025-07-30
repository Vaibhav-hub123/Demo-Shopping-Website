export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[
    {
        productId:"id-23",
        quantity: 2,
    },
    {
        productId:"id-32",
        quantity:1,
    }
];
}


export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


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
    saveToStorage();
}

export function UpdateCartQuantity(){
    let tq=0;

    cart.forEach((item) => {
        tq+=item.quantity;
    });

    document.querySelector(`.cart-quantity`).innerHTML=tq;
}


export function removeProduct(productId){
    let newCart=[];

    cart.forEach((cartItems)=>{
        if(cartItems.productId!==productId){
            newCart.push(cartItems);
        }
    });

    cart=newCart
    saveToStorage();
}