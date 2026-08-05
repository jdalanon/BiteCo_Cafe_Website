const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Create Auth account
    const { data, error } = await window.db.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    // Save additional information
    await window.db
        .from("User")
        .insert({
            auth_id: data.user.id,
            firstname,
            lastname,
            email,
            role: "user"
        });

    alert("Registration successful!");

    window.location.href = "login.html";

});