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
cconst user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    window.location.href = "login.html";
}

// Navbar dropdown
document.getElementById("profile-name").textContent =
    `${user.firstname} ${user.lastname}`;

document.getElementById("profile-email").textContent =
    user.email;

// Dashboard
document.getElementById("profileFullName").textContent =
    `${user.firstname} ${user.lastname}`;

document.getElementById("profileRole").textContent =
    user.role.charAt(0).toUpperCase() + user.role.slice(1);

document.getElementById("firstname").value = user.firstname;
document.getElementById("lastname").value = user.lastname;
document.getElementById("email").value = user.email;
document.getElementById("role").value = user.role;

if (user.created_at) {
    document.getElementById("created_at").value =
        new Date(user.created_at).toLocaleDateString();
}

// Logout
logoutBtn.addEventListener("click", async () => {

    await window.db.auth.signOut();

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

});