const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
        return;
    }

    alert("Registration successful!");

    // Insert into Supabase here
});