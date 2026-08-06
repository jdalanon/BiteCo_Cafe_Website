// Supabase Configuration
// const SUPABASE_URL = "https://ykldzfsbmlcjftfartax.supabase.co";

// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbGR6ZnNibWxjamZ0ZmFydGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MzEyMDgsImV4cCI6MjEwMTQwNzIwOH0.HRygR3SId4YqtEwTFvE8tb5g7rnZtGJXXPNu7FLYlMs";

// Create ONE global client
// window.db = window.supabase.createClient(
 //    SUPABASE_URL,
//     SUPABASE_ANON_KEY
// );

// console.log("Supabase client initialized:", window.db);

const SUPABASE_URL = "https://ykldzfsbmlcjftfartax.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrbGR6ZnNibWxjamZ0ZmFydGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MzEyMDgsImV4cCI6MjEwMTQwNzIwOH0.HRygR3SId4YqtEwTFvE8tb5g7rnZtGJXXPNu7FLYlMs";

if (!window.supabase) {
    console.error("Supabase CDN not loaded.");
} else {
    window.db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );

    console.log("Supabase initialized:", window.db);
}


// Load Bite Co QR
paymentSelect.addEventListener("change", async () => {

    const payment = paymentSelect.value;

    const { data } = await window.db
        .from("Payment_Settings")
        .select("*")
        .eq("payment_name", payment)
        .single();

    document.getElementById("qrImage").src = data.qr_image;

    document.getElementById("accountName").textContent =
        data.account_name;

    document.getElementById("accountNumber").textContent =
        data.account_number;

});