// Toggle profile dropdown
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const logoutBtn = document.getElementById("logoutBtn");

profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle("show");
});

// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-dropdown")) {
        profileMenu.classList.remove("show");
    }
});

// Load current user
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    document.getElementById("profile-name").textContent =
        `${currentUser.firstname} ${currentUser.lastname}`;

    document.getElementById("profile-email").textContent =
        currentUser.email;
}

// Logout
logoutBtn.addEventListener("click", async () => {

    try {

        // Sign out from Supabase Auth
        const { error } = await window.db.auth.signOut();

        if (error) {
            console.error(error);
        }

    } catch (err) {
        console.error("Logout Error:", err);
    }

    // Clear local storage
    localStorage.removeItem("currentUser");

    // Redirect to login page
    window.location.href = "login.html";

});