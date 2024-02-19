document.addEventListener("DOMContentLoaded", function() {
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
    const openMenu = document.querySelector(".open-menu"); 
    const closeMenu = document.querySelector(".close-menu");
    const menuContainer = document.querySelector(".open-menu-container");
    const nextSlider = document.querySelector(".next");
    const previousSlider = document.querySelector(".previous");
    let shoppedItems = JSON.parse(localStorage.getItem("items")) || [];
    // let cartItemCount = 0;
    updateCartIcon(shoppedItems[0]?.quantity || 0);
    displayCartItems(shoppedItems);


    // opening and closing menu for mobile
    openMenu.addEventListener("click", function(e){
        menuContainer.style.visibility = "visible";
    })

    closeMenu.addEventListener("click", function(e){
        menuContainer.style.visibility = "hidden";
    })

    nextSlider.addEventListener("click", function(e){
        displayNextImage();
    });
    previousSlider.addEventListener("click", function(e){
        displayPreviousImage();
    })


    function displayNextImage() {
        const nextimgSrc = img.src;
        // console.log(nextimgSrc);
    
        switch (nextimgSrc) {
            case "./images/image-product-1.jpg":
                img.src = "./images/image-product-2.jpg";
                break;
            case "./images/image-product-2.jpg":
                img.src = "./images/image-product-3.jpg";
                break;
            case "./images/image-product-3.jpg":
                img.src = "./images/image-product-4.jpg";
                break;
            default:
                img.src = "./images/image-product-4.jpg";
                break;
        }
    }

    function displayPreviousImage(){
        const previousimgSrc = img.src;
        // console.log(previousimgSrc);

        switch (previousimgSrc){
            case "./images/image-product-4.jpg":
                img.src = "./images/image-product-3.jpg";
                break;
            case "./images/image-product-3.jpg":
                img.src = "./images/image-product-2.jpg";
                break;
            case "./images/image-product-2.jpg":
                img.src = "./images/image-product-1.jpg";
                break;
            default:
                img.src = "./images/image-product-1.jpg";
                break;
        }
    }

    //to change image to another image when thumbnail is clicked
    thumbnail.forEach(element => {
        element.addEventListener("click", function(e){
                img.src =e.target.src;
        })
    });


    //adding items to cart
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

    // Function to display items in the cart

    function displayCartItems(items) {
        const cartItemsContainer = document.querySelector(".cart-items-container");

        // Clear the existing content
        cartItemsContainer.innerHTML = '';
        const checkoutButton = document.querySelector(".checkout-button");

        if (items.length === 0) {
            // Show empty cart message if no items
            alert("add items to cart")
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty';
            cartItemsContainer.appendChild(emptyCartMessage);

            // Disable checkout button if the cart is empty
            if (checkoutButton) {
                checkoutButton.disabled = true;
            }
        } else {
            // Create cart item container outside the loop
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

               // Loop through items and update HTML content for each
            items.forEach(item => {
                cartItem.innerHTML = `
                    <div class="item-details">
                        <div class="product-name">Sneakers</div>
                        <div class="product-details">
                            <span class="total">$${item.price.toFixed(2)} * ${item.quantity} : $${item.total.toFixed(2)}</span>
                            <span class="delete">
                                <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
                                    </defs>
                                    <use fill="hsl(25, 100%, 94%)" fill-rule="nonzero" xlink:href="#a"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                `;

                // Append the updated cartItem to the container
                cartItemsContainer.appendChild(cartItem);
            });

            // Check the existence of the checkout button before setting 'disabled'
            if (checkoutButton) {
                checkoutButton.disabled = false;
            }

            // Append the updated cartItem to the container
            cartItemsContainer.appendChild(cartItem);
            //event listener for deleting icon
            const deleteItems = document.querySelector(".delete");
            deleteItems.addEventListener("click", function(){
                deleteCartItems();
            });
        }
        // cartItemsContainer.appendChild(checkoutButton);
    }


    addToCartBtn.addEventListener("click", function(e) {
        // Parse existing items from local storage or initialize an empty array
        let shoppedItems = JSON.parse(localStorage.getItem("items")) || [];

        // Check if the quantity is greater than 0 before adding to the cart
        const quantity = parseInt(noOfItems.textContent);
        if (quantity > 0) {
            // Calculate the total price based on the quantity
            const price = parseFloat(currentPrice.textContent);
            const total = quantity * price;

            // Check if the item is already in the cart
            const existingItemIndex = shoppedItems.findIndex(item => item.price === price);

            if (existingItemIndex !== -1) {
                // If the item exists, update its quantity and total
                shoppedItems[existingItemIndex].quantity += quantity;
                shoppedItems[existingItemIndex].total += total;
            } else {
                // If the item is not in the cart, add it
                const newItem = {
                    quantity: quantity,
                    price: price,
                    total: total,
                };
            shoppedItems.push(newItem);
            }
            // Update local storage with the new array of items
            localStorage.setItem("items", JSON.stringify(shoppedItems));

            console.log(shoppedItems);
            // Update the cart icon
            updateCartIcon(shoppedItems[0]?.quantity || 0);

            // Display items in the cart
            displayCartItems(shoppedItems);
        } else {
        alert("Please add items");
        }
    });

    function updateCartIcon(shoppedItems) {
        // Get the cart icon element
        const cartIcon = document.querySelector(".cart");
    
        // Update the cart icon with the item count
        cartIcon.innerHTML = `
        <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#69707D" fill-rule="nonzero"/>
        </svg>
        <span class="cart-item-count">${shoppedItems}</span>
        `;
    }    

    //function called when delete icon is clicked
    function deleteCartItems(price){
        localStorage.removeItem("items");

        // Update the cart icon
        updateCartIcon(0);

        // Display items in the cart
        displayCartItems([]);
    }
});