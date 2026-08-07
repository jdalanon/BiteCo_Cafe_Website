const paymentDetails = document.getElementById("paymentDetails");
const qrImage = document.getElementById("qrImage");
const accountName = document.getElementById("accountName");
const accountNumber = document.getElementById("accountNumber");
const amount = document.getElementById("paymentAmount");

let selectedPayment = null;

// Load Checkout Total from Local Storage
const checkoutTotal = Number(localStorage.getItem("checkoutTotal")) || 0;

amount.value = `₱${checkoutTotal.toFixed(2)}`;

// Payment Method Selection
document.querySelectorAll("input[name='payment']").forEach((radio) => {
  radio.addEventListener("change", async () => {
    selectedPayment = radio.value;

    const { data, error } = await window.db
      .from("Payment_Settings")
      .select("*")
      .eq("payment_name", selectedPayment)
      .eq("is_active", true)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    qrImage.src = data.qr_image;
    accountName.value = data.account_name;
    accountNumber.value = data.account_number;

    paymentDetails.classList.remove("hidden");
  });
});

// Submit Payment
const submitBtn = document.getElementById("submitPayment");

if (submitBtn) {
  submitBtn.addEventListener("click", async () => {
    const reference = document.getElementById("referenceNumber").value.trim();

    const file = document.getElementById("proofImage").files[0];

    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }

    if (!reference) {
      alert("Please enter the reference number.");
      return;
    }

    if (!file) {
      alert("Please upload your payment receipt.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      alert("Please login first.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("checkoutCart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const total = Number(localStorage.getItem("checkoutTotal")) || 0;

    // Upload receipt
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await window.db.storage
      .from("payments")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);

      alert("Failed to upload receipt.");

      return;
    }

    const { data: imageData } = window.db.storage
      .from("payments")
      .getPublicUrl(fileName);

    const publicUrl = imageData.publicUrl;

    // Save Order
    const { data: order, error: orderError } = await window.db
      .from("Order")
      .insert({
        user_id: user.user_id,
        items: cart,
        total_amount: total,
        payment_method: selectedPayment,
        payment_status: "Pending",
        order_status: "Pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error(orderError);

      alert("Failed to create order.");

      return;
    }

    // Save Order Items
    for (const item of cart) {
      const { error: itemError } = await window.db.from("Order_Items").insert({
        order_id: order.order_id,
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: item.price,
      });

      if (itemError) {
        console.error(itemError);

        alert("Failed to save order items.");

        return;
      }
    }

    // Save Payment Proof
    const { error: proofError } = await window.db.from("Payment_Proof").insert({
      order_id: order.order_id,
      reference_number: reference,
      proof_image: publicUrl,
      payment_name: selectedPayment,
      status: "Pending",
    });

    if (proofError) {
      console.error(proofError);

      alert("Failed to save payment proof.");

      return;
    }

    // Clear Cart
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("checkoutTotal");

    alert("Payment submitted successfully!");

    window.location.href = "home.html";
  });
}
