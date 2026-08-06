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

    // Save profile
    const { error: insertError } = await window.db
        .from("User")
        .insert({
            user_id: data.user.id,
            firstname,
            lastname,
            email,
            role: "user"
        });

    if (insertError) {
        console.error(insertError);
        alert(insertError.message);
        return;
    }

    alert("Registration successful!");
    window.location.href = "login.html";

});