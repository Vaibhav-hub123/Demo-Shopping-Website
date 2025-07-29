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
            <select>
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
        <div class="added-to-cart">
            <img src="image/checkmark.png" class="Add-to-cart-image">added
        </div>


        <button class="add-to-cart-button button-primary">
            Add to Cart
        </button>
    </div>
    `;
});
console.log(productsHTML);
document.querySelector(`.js-products-grid`).innerHTML=productsHTML;