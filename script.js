const thumbnail = document.querySelectorAll("#thumbnail");
const img = document.querySelector("#img");
// const thumbnailImages = document.querySelectorAll("#thumbnail");
const noOfItems = document.querySelector(".noOfItems");
const remove = document.querySelector(".remove");
const add = document.querySelector(".add");
const cart = document.querySelector(".cart");
const displayCartContent = document.querySelector(".cart-content");
const currentPrice = document.querySelector(".current-price");
const addToCartBtn = document.querySelector(".adding-To-Cart");

thumbnail.forEach(element => {
    element.addEventListener("click", function(e){
     
            img.src =e.target.src;
  
        // console.log(e);
    })
});

remove.addEventListener("click", function(e) {
    let items = parseInt(noOfItems.textContent);
    if (items > 0) {
        items--;
    }
    noOfItems.textContent = items;
});

add.addEventListener("click", function(e) {
    let items = parseInt(noOfItems.textContent);
    items++;
    noOfItems.textContent = items;
});

cart.addEventListener("click", function(e) {
    displayCartContent.classList.toggle("active");
});

addToCartBtn.addEventListener("click", function(e) {
    // Parse existing items from local storage or initialize an empty array
    let shoppedItems = JSON.parse(localStorage.getItem("items")) || [];

    // Check if the quantity is greater than 0 before adding to the cart
    const quantity = parseInt(noOfItems.textContent);
    if (quantity > 0) {
        // Calculate the total price based on the quantity
        const price = parseFloat(currentPrice.textContent);
        const total = quantity * price;

        // Create an object representing the item and add it to the array
        const newItem = {
            quantity: quantity,
            price: price,
            total: total,
        };
        shoppedItems.push(newItem);

        // Update local storage with the new array of items
        localStorage.setItem("items", JSON.stringify(shoppedItems));

        // Display items in the cart
        displayCartItems(shoppedItems);
    } else {
        alert("Please add items");
    }
});

// Function to display items in the cart
function displayCartItems(items) {
    const cartItemsContainer = document.querySelector(".cart-items-container");

    // Clear the existing content
    cartItemsContainer.innerHTML = '';

    if (items.length === 0) {
        // Show empty cart message if no items
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        // Disable checkout button if the cart is empty
        document.querySelector(".checkout-button").disabled = true;
    } else {
        // Loop through items and create HTML elements for each
        items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
            <div class="item-details">
            <div class="product-name">Sneakers</div>
            <span class= "total"> $${item.price.toFixed(2)} * ${item.quantity} : $${item.total.toFixed(2)}</span>
            <span class = "delete"> <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg></span>
        </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Enable checkout button when there are items in the cart
        document.querySelector(".checkout-button").disabled = false;
    }
}

function updateCartIcon() {
    const cartIcon = document.querySelector(".cart svg");
    
    // Parse existing items from local storage or initialize an empty array
    const shoppedItems = JSON.parse(localStorage.getItem("items")) || [];
    
    // Calculate the total quantity of items in the cart
    const totalQuantity = shoppedItems.reduce((total, item) => total + item.quantity, 0);
    
    // Update the cart icon content
    cartIcon.textContent = totalQuantity > 0 ? totalQuantity.toString() : '';
}