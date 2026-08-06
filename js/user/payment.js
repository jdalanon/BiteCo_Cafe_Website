const form =
document.getElementById("paymentForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user =
    JSON.parse(localStorage.getItem("currentUser"));

    const cart =
    JSON.parse(localStorage.getItem("checkoutCart"));

    if(!user || !cart){

        alert("Checkout session expired.");

        window.location.href="cart.html";

        return;

    }

    const reference =
    document.getElementById("referenceNumber").value;

    const file =
    document.getElementById("proofImage").files[0];

    if(!file){

        alert("Please upload proof of payment.");

        return;

    }

    //--------------------------------------------------
    // Upload image to Supabase Storage
    //--------------------------------------------------

    const filename =
    Date.now() + "_" + file.name;

    const { error: uploadError } =
    await window.db.storage
    .from("payments")
    .upload(filename,file);

    if(uploadError){

        alert(uploadError.message);

        return;

    }

    //--------------------------------------------------
    // Get public URL
    //--------------------------------------------------

    const {
        data:urlData
    } =
    window.db.storage
    .from("payments")
    .getPublicUrl(filename);

    //--------------------------------------------------
    // Compute Total
    //--------------------------------------------------

    let total=0;

    cart.forEach(item=>{

        total+=item.price*item.quantity;

    });

    //--------------------------------------------------
    // Save Order
    //--------------------------------------------------

    const { error } =
    await window.db
    .from("Orders")
    .insert({

        user_id:user.user_id,

        items:cart,

        total_amount:total,

        payment_method:"Fund Transfer",

        payment_status:"Pending Verification",

        order_status:"Pending",

        reference_number:reference,

        proof_image:urlData.publicUrl

    });

    if(error){

        alert(error.message);

        return;

    }

    alert("Payment submitted successfully!");

    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutCart");

    window.location.href="home.html";

});


async function loadPaymentMethods() {

    const { data, error } =
        await window.db
        .from("Payment_Settings")
        .select("*")
        .eq("is_active", true);

    if (error) {

        console.error(error);
        return;

    }

    const container =
        document.getElementById("paymentMethods");

    container.innerHTML = "";

    data.forEach(payment => {

        container.innerHTML += `

        <div class="payment-option">

            <img
                src="${payment.qr_code}"
                alt="${payment.payment_name}">

            <h3>${payment.payment_name}</h3>

            <p>

                <strong>Account Name:</strong><br>

                ${payment.account_name}

            </p>

            <p>

                <strong>Account Number:</strong><br>

                ${payment.account_number}

            </p>

            <small>

                ${payment.instructions}

            </small>

        </div>

        `;

    });

}

loadPaymentMethods();