//Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

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
