// Default Cart Display
// Cart 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, button) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
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
            <div>
                <strong>${item.name}</strong><br>
                Qty: ${item.quantity}
            </div>

            <div>
                ₱${subtotal.toFixed(2)}
            </div>

            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    }); 

    total.innerText = totalPrice.toFixed(2);
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