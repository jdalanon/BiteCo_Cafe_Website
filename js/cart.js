// Default Cart Display
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, button) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    button.textContent = "✓ Added!";
    button.disabled = true;

    setTimeout(() => {
        button.textContent = "Buy Now";
        button.disabled = false;
    }, 1000);
}


// Update Cart 
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const total = document.getElementById("total");
    const count = document.getElementById("cart-count");

    // Update cart icon count on every page
    if (count) {
        count.innerText = cart.length;
    }

    // Stop here if this page doesn't have a cart section
    if (!cartItems || !total) return;

    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {

    const subtotal = item.price * item.quantity;
    totalPrice += subtotal;

    cartItems.innerHTML += `
    <div class="cart-item">

        <div class="cart-info">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-details">
                <h3>${item.name}</h3>
                <p class="price">₱${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p class="subtotal">
                Subtotal: ₱${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>

        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
            🗑 Remove
        </button>

    </div>
    `;
    })
}


// Remove item from cart 
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}


// Checkout 
function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert("Thank you for ordering from Bite Co!");

    cart = [];

    localStorage.removeItem("cart");

    updateCart();
}


updateCart();

window.addToCart = addToCart;
window.removeItem = removeItem;
window.checkout = checkout;