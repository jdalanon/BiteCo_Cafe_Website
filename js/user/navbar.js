//Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

const orderMenuBtn = document.getElementById("orderMenuBtn");
const orderSubmenu = document.getElementById("orderSubmenu");

const logoutBtn = document.getElementById("logoutBtn");


if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Menu Redirection
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document
  .querySelectorAll(".card, .about-content, .contact form")
  .forEach((el) => {
    if (el) observer.observe(el);
  });

// Active Page
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  // Remove previous active classes
  document.querySelectorAll(".nav-links a, .dropdown-btn").forEach((item) => {
    item.classList.remove("active");
  });

  // Highlight Home, About, Contact, Cart
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // Highlight Menu if on menu.html
  if (currentPage === "menu.html") {
    document.querySelector(".dropdown-btn").classList.add("active");
  }
});


/* =====================================================
   PROFILE DROPDOWN
===================================================== */

if (profileBtn && profileMenu) {

  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle("show");
  });

}


/* =====================================================
   ORDER SUBMENU
===================================================== */

if (orderMenuBtn && orderSubmenu) {
  orderMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    orderSubmenu.classList.toggle("show");
  });

}


/* =====================================================
   CLOSE DROPDOWN
===================================================== */

window.addEventListener("click", (event) => {

  if (
    profileMenu &&
    !event.target.closest(".profile-dropdown")
  ) {

    profileMenu.classList.remove("show");

    if (orderSubmenu) {
      orderSubmenu.classList.remove("show");
    }

  }

});


/* Logout Button in Profile */

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    try {

      const { error } = await window.db.auth.signOut();

      if (error) {
        console.error("Logout Error:", error);
        return;
      }

      localStorage.removeItem("currentUser");

      window.location.href = "login.html";

    } catch (error) {

      console.error("Logout Error:", error);

    }

  });

}