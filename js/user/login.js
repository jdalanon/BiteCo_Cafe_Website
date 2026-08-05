const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Required fields
    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Find user
    const { data: user, error } = await window.db
        .from("User")
        .select("*")
        .eq("email", email)
        .single();

    if (error || !user) {
        alert("Invalid email or password.");
        return;
    }

    // Verify password
    if (user.password !== password) {
        alert("Invalid email or password.");
        return;
    }

    // Save login session
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Welcome, " + user.firstname + "!");

    // Redirect based on role
    if (user.role === "admin") {
        window.location.href = "../admin/dashboard.html";
    } else {
        window.location.href = "../home.html";
    }

});


// Store Current User
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

console.log(currentUser.firstname);
console.log(currentUser.lastname);
console.log(currentUser.role);