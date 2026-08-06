const paymentDetails =
    document.getElementById("paymentDetails");

const qrImage =
    document.getElementById("qrImage");

const accountName =
    document.getElementById("accountName");

const accountNumber =
    document.getElementById("accountNumber");

const amount =
    document.getElementById("paymentAmount");

let selectedPayment = null;


// Load the total amount of order

const checkoutTotal =
    localStorage.getItem("checkoutTotal") || 0;

amount.value =
    `₱${Number(checkoutTotal).toFixed(2)}`;


// Payment selection
document
.querySelectorAll("input[name='payment']")
.forEach(radio=>{

    radio.addEventListener("change",async()=>{

        const paymentName = radio.value;

        selectedPayment = paymentName;

        const { data,error } =
            await window.db
            .from("Payment_Settings")
            .select("*")
            .eq("payment_name",paymentName)
            .eq("is_active",true)
            .single();

        if(error){

            alert(error.message);

            return;
        }

        qrImage.src =
            data.qr_image;

        accountName.value =
            data.account_name;

        accountNumber.value =
            data.account_number;

        paymentDetails.classList.remove("hidden");

    });

});


// Submit Payment

const submitBtn =
    document.getElementById("submitPayment");

if (submitBtn) {

    submitBtn.addEventListener("click", async () => {

        const reference =
        document.getElementById("referenceNumber").value;

    const file =
        document.getElementById("proofImage").files[0];

    if(!selectedPayment){

        alert("Select payment.");

        return;
    }

    if(reference===""){

        alert("Enter reference number.");

        return;
    }

    if(!file){

        alert("Upload receipt.");

        return;
    }

    // Upload image to Supabase Storage here

    // Insert Payment_Proof

    // Update Orders status

    alert("Payment submitted successfully.");

    });

}