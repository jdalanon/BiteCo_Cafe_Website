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
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user){
    window.location.href="login.html";
}

document.getElementById("firstname").value = user.firstname;
document.getElementById("lastname").value = user.lastname;
document.getElementById("email").value = user.email;
document.getElementById("role").value = user.role;

document.getElementById("profileFullName").textContent =
`${user.firstname} ${user.lastname}`;

document.getElementById("profileRole").textContent =
user.role.toUpperCase();

if(user.created_at){

    document.getElementById("created_at").value =
        new Date(user.created_at).toLocaleDateString();

}

// Logout
logoutBtn.addEventListener("click", async () => {

    await window.db.auth.signOut();

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";

});