// Mobile Menu Toggle

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Profile Dropdown Toggle

const profileBtn = document.getElementById("profileBtn");

const profileMenu = document.getElementById("profileMenu");

if (profileBtn && profileMenu) {
  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    profileMenu.classList.toggle("show");
  });
}


// View Order Submenu Toggle

const orderMenuBtn = document.getElementById("orderMenuBtn");

const orderSubmenu = document.getElementById("orderSubmenu");

if (orderMenuBtn && orderSubmenu) {
  orderMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    orderSubmenu.classList.toggle("show");
  });
}


// Close profile dropdown when clicking outside of it

window.addEventListener("click", (event) => {
  if (profileMenu && !event.target.closest(".profile-dropdown")) {
    profileMenu.classList.remove("show");
  }
});


// Logout functionality

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    console.log("Logout button clicked");

    try {
      const { error } = await window.db.auth.signOut();

      if (error) {
        console.error("Logout Error:", error);

        alert("Logout failed: " + error.message);

        return;
      }

      // Remove stored user
      localStorage.removeItem("currentUser");

      // Redirect to login page
      window.location.href = "login.html";
    } catch (error) {
      console.error("Logout Error:", error);
    }
  });
}
