const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    // Example login
    // Replace this with your Supabase authentication logic

    console.log({
        email,
        password
    });

    alert("Login successful!");

    // Redirect to homepage
    window.location.href = "./user/home.html";

});