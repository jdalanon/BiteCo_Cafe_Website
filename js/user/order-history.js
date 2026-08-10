// =====================================================
// ORDER HISTORY
// =====================================================

const orderHistoryList = document.getElementById("orderHistoryList");

const orderLoading = document.getElementById("orderLoading");

const emptyOrders = document.getElementById("emptyOrders");

// =====================================================
// LOAD CURRENT USER
// =====================================================

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// =====================================================
// DISPLAY PROFILE
// =====================================================

if (currentUser) {
  const fullName =
    `${currentUser.firstname || ""} ${currentUser.lastname || ""}`.trim();

  const profileName = document.getElementById("profileFullName");

  const profileRole = document.getElementById("profileRole");

  const navbarName = document.getElementById("profile-name");

  const navbarEmail = document.getElementById("profile-email");

  if (profileName) {
    profileName.textContent = fullName || "Guest";
  }

  if (profileRole) {
    profileRole.textContent = currentUser.role || "Customer";
  }

  if (navbarName) {
    navbarName.textContent = fullName || "Guest";
  }

  if (navbarEmail) {
    navbarEmail.textContent = currentUser.email || "";
  }
}

// =====================================================
// LOAD ORDER HISTORY
// =====================================================

async function loadOrderHistory() {
  if (!currentUser) {
    orderLoading.style.display = "none";

    emptyOrders.style.display = "block";

    emptyOrders.querySelector("h3").textContent = "Please Login";

    emptyOrders.querySelector("p").textContent =
      "Please login to view your order history.";

    return;
  }

  try {
    const { data, error } = await window.db
      .from("Order")
      .select("*")
      .eq("user_id", currentUser.user_id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Order History Error:", error);

      orderLoading.style.display = "none";

      orderHistoryList.innerHTML = `
        <div class="empty-orders">

          <div class="empty-icon">
            ⚠️
          </div>

          <h3>
            Unable to Load Orders
          </h3>

          <p>
            Something went wrong while loading your orders.
          </p>

        </div>
      `;

      return;
    }

    orderLoading.style.display = "none";

    // No orders

    if (!data || data.length === 0) {
      emptyOrders.style.display = "block";

      return;
    }

    // Display orders

    orderHistoryList.innerHTML = "";

    data.forEach((order) => {
      orderHistoryList.innerHTML += createOrderCard(order);
    });
  } catch (error) {
    console.error("Unexpected Error:", error);

    orderLoading.style.display = "none";
  }
}

// =====================================================
// CREATE ORDER CARD
// =====================================================

function createOrderCard(order) {
  const orderId = order.order_id || "N/A";

  const createdDate = formatDate(order.created_at);

  const orderStatus = order.order_status || "Pending";

  const paymentStatus = order.payment_status || "Pending";

  const paymentMethod = order.payment_method || "N/A";

  const totalAmount = Number(order.total_amount || 0);

  const statusClass = getStatusClass(orderStatus);

  const items = parseOrderItems(order.items);

  let itemsHTML = "";

  if (items.length > 0) {
    items.forEach((item) => {
      const name = item.name || item.menu_name || "Item";

      const quantity = Number(item.quantity || 1);

      const price = Number(item.price || 0);

      const subtotal = price * quantity;

      itemsHTML += `

        <div class="order-item">

          <div>

            <span class="order-item-name">
              ${escapeHTML(name)}
            </span>

            <span class="order-item-quantity">
              × ${quantity}
            </span>

          </div>

          <span class="order-item-price">
            ₱${subtotal.toFixed(2)}
          </span>

        </div>

      `;
    });
  } else {
    itemsHTML = `

      <div class="order-item">

        <span class="order-item-name">
          Order items unavailable
        </span>

      </div>

    `;
  }

  return `

    <div class="order-card">

      <!-- Order Header -->

      <div class="order-card-header">

        <div>

          <div class="order-number">
            Order #${escapeHTML(String(orderId))}
          </div>

          <div class="order-date">
            ${createdDate}
          </div>

        </div>

        <span class="order-status ${statusClass}">
          ${escapeHTML(orderStatus)}
        </span>

      </div>


      <!-- Order Body -->

      <div class="order-card-body">

        <div class="order-items">

          ${itemsHTML}

        </div>


        <!-- Footer -->

        <div class="order-card-footer">

          <div class="payment-info">

            <span class="payment-label">
              Payment Method
            </span>

            <span class="payment-method">
              ${escapeHTML(paymentMethod)}
            </span>

            <span class="payment-label">
              Payment Status: ${escapeHTML(paymentStatus)}
            </span>

          </div>


          <div class="order-total">

            <div class="total-label">
              Total Amount
            </div>

            <div class="total-price">
              ₱${totalAmount.toFixed(2)}
            </div>

          </div>

        </div>

      </div>

    </div>

  `;
}

// =====================================================
// PARSE ORDER ITEMS
// =====================================================

function parseOrderItems(items) {
  if (!items) {
    return [];
  }

  // Already an array

  if (Array.isArray(items)) {
    return items;
  }

  // JSON string

  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Unable to parse order items:", error);

      return [];
    }
  }

  return [];
}

// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateValue) {
  if (!dateValue) {
    return "Date unavailable";
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// =====================================================
// STATUS CLASS
// =====================================================

function getStatusClass(status) {
  const normalized = String(status).toLowerCase().trim();

  if (normalized.includes("complete") || normalized.includes("delivered")) {
    return "status-completed";
  }

  if (normalized.includes("cancel")) {
    return "status-cancelled";
  }

  if (normalized.includes("process")) {
    return "status-processing";
  }

  return "status-pending";
}

// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {
  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML;
}

// =====================================================
// START
// =====================================================

loadOrderHistory();
