async function loadCurrentOrder() {
  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  // Load profile information
  const fullName =
    `${user.firstname || ""} ${user.lastname || ""}`.trim();

  document.getElementById("profileFullName").textContent =
    fullName || "Guest";

  document.getElementById("profileRole").textContent =
    user.role || "User";


  // Get user's latest order
  const { data: orders, error } = await window.db
    .from("Order")
    .select("*")
    .eq("user_id", user.user_id)
    .order("created_at", {
      ascending: false
    })
    .limit(1);

  if (error) {
    console.error("Order Error:", error);

    document.getElementById("orderItems").innerHTML = `
      <div class="empty-order">
        Unable to load your order.
      </div>
    `;

    return;
  }


  // No order found
  if (!orders || orders.length === 0) {

    document.getElementById("orderItems").innerHTML = `
      <div class="empty-order">
        You don't have any orders yet.
      </div>
    `;

    return;
  }


  const order = orders[0];


  // Order information
  document.getElementById("orderId").textContent =
    order.order_id || "-";

  document.getElementById("orderDate").textContent =
    order.created_at
      ? new Date(order.created_at).toLocaleDateString()
      : "-";

  document.getElementById("paymentMethod").textContent =
    order.payment_method || "-";

  document.getElementById("paymentStatus").textContent =
    order.payment_status || "-";

  document.getElementById("orderStatus").textContent =
    order.order_status || "-";

  document.getElementById("orderTotal").textContent =
    Number(order.total_amount || 0).toFixed(2);


  // Load items
  displayOrderItems(order);
}


function displayOrderItems(order) {

  const container =
    document.getElementById("orderItems");

  let items = order.items;


  // Convert JSON string if necessary
  if (typeof items === "string") {

    try {
      items = JSON.parse(items);
    } catch (error) {

      console.error(
        "Unable to parse order items:",
        error
      );

      items = [];
    }
  }


  if (!Array.isArray(items) || items.length === 0) {

    container.innerHTML = `
      <div class="empty-order">
        No items found for this order.
      </div>
    `;

    return;
  }


  container.innerHTML = "";


  items.forEach((item) => {

    const quantity =
      Number(item.quantity || 1);

    const price =
      Number(item.price || 0);

    const subtotal =
      price * quantity;


    container.innerHTML += `
      <div class="order-item">

        <img
          src="${item.image || ""}"
          alt="${item.name || "Product"}"
          class="order-item-image"
        />

        <div class="order-item-name">
          ${item.name || "Unknown Item"}
        </div>

        <div class="order-item-quantity">
          Qty: ${quantity}
        </div>

        <div class="order-item-price">
          ₱${subtotal.toFixed(2)}
        </div>

      </div>
    `;
  });
}


loadCurrentOrder();