export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[
    {
        productId:"id-1",
        quantity: 2,
        DeliveryOptionID: '1'
    },
    {
        productId:"id-32",
        quantity:1,
        DeliveryOptionID: '2'
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
            quantity: quantitySelected,
            DeliveryOptionID:'1'
        })
    }
    saveToStorage();
}


export function UpdateCartQuantity(){
    let tq=totalQuantity();
    document.querySelector(`.cart-quantity`).innerHTML=tq;
}


export function totalQuantity(){
    let tq=0;

    cart.forEach((item) => {
        tq+=item.quantity;
    });
    return tq;
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

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}