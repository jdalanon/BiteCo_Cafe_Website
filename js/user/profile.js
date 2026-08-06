const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const logoutBtn = document.getElementById("logoutBtn");

profileBtn.addEventListener("click", () => {
    profileMenu.classList.toggle("show");
});

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

    await window.db.auth.signOut();

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

});