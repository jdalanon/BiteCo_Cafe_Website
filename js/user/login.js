const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } =
        await window.db.auth.signInWithPassword({

            email,
            password

        });

    if (error) {
        alert("Invalid email or password.");
        return;
    }

    // Get profile
    const { data: profile } =
        await window.db
        .from("User")
        .select("*")
        .eq("auth_id", data.user.id)
        .single();

    localStorage.setItem(
        "currentUser",
        JSON.stringify(profile)
    );

    if (profile.role === "admin") {
        window.location.href = "../admin/dashboard.html";
    } else {
        window.location.href = "../home.html";
    }

});