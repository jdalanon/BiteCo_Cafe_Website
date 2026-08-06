// Default Cart Display
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image, button) {

    // Menu is Out of Stock
    if (button.disabled) return;

    // Menu has stock
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price: Number(price),
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

    if (count) {
        count.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (!cartItems || !total) return;

    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {

        const subtotal = item.price * item.quantity;

        totalPrice += subtotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img class="cart-image"
                    src="${item.image}"
                    alt="${item.name}">

                <div class="cart-details">

                    <h3>${item.name}</h3>

                    <p class="price">
                        ₱${item.price.toFixed(2)}
                    </p>

                    <div class="quantity-control">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <p class="subtotal">
                        Subtotal:
                        ₱${subtotal.toFixed(2)}
                    </p>

                </div>

            </div>
        `;
    });

    total.innerText = totalPrice.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));
}


// Increase Quantity
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}

// Decrease Quantity
function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}


// Checkout 
async function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const user =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {

        alert("Please login first.");
        return;

    }

    if (!user.address) {

        alert("Please complete your profile.");

        window.location.href = "profile.html";

        return;

    }

    if (!user.payment_method) {

        alert("Please select payment method.");

        window.location.href = "profile.html";

        return;

    }

    if (user.payment_method === "Cash on Delivery") {

        await placeOrder();

    } else {

        const total = cart.reduce((sum, item) => {

            return sum + (item.price * item.quantity);

        }, 0);

        localStorage.setItem(
            "checkoutCart",
            JSON.stringify(cart)
        );

        localStorage.setItem(
            "checkoutTotal",
            total
        );

        window.location.href = "payment.html";

    }

}

updateCart();


// Place Order

async function placeOrder() {

    const user =
        JSON.parse(localStorage.getItem("currentUser"));

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    const { error } =
        await window.db
        .from("Order")
        .insert({

            user_id: user.user_id,
            items: cart,
            total_amount: total,
            payment_method: user.payment_method,
            payment_status: "Pending",
            order_status: "Pending"

        });

    if (error) {

        console.error(error);
        alert("Failed to place order.");

        return;

    }

    alert("Thank you for ordering from Bite Co!");

    cart = [];

    localStorage.removeItem("cart");

    updateCart();

    window.location.href = "home.html";

}


// Save the total amount in cart
const total = cart.reduce((sum, item) => {

    return sum + (item.price * item.quantity);

}, 0);

localStorage.setItem("checkoutTotal", total);
localStorage.setItem("currentOrderId", order.order_id);

window.location.href = "payment.html";



window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.checkout = checkout;
window.placeOrder = placeOrder