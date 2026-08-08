const products = {
  drinks: [
    { name: "Spanish Latte", price: "₱150", type: "latte" },
    { name: "Matcha Ice Latte", price: "₱160", type: "matcha" },
    { name: "Caramel Latte", price: "₱150", type: "caramel" },
    { name: "Hazelnut Ice Coffee", price: "₱155", type: "hazelnut" },
    { name: "Pure Matcha Ice", price: "₱165", type: "pure-matcha" }
  ],
  snacks: [
    { name: "Sausage Seaweed Roll", price: "₱120", type: "food" },
    { name: "Garlic Butter Parmesan", price: "₱140", type: "food" },
    { name: "Crab Rangoon", price: "₱135", type: "food" },
    { name: "Chicken Bites", price: "₱145", type: "food" },
    { name: "Cheese Sticks", price: "₱125", type: "food" }
  ],
  desserts: [
    { name: "Chocolate Brownie", price: "₱110", type: "dessert" },
    { name: "Cheesecake", price: "₱135", type: "dessert" },
    { name: "Cookies & Cream", price: "₱120", type: "dessert" },
    { name: "Matcha Cake", price: "₱140", type: "dessert" },
    { name: "Cinnamon Roll", price: "₱115", type: "dessert" }
  ]
};

const grid = document.getElementById("productGrid");
const buttons = document.querySelectorAll(".category");

function renderProducts(category) {
  grid.innerHTML = "";

  products[category].forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const visual = product.type === "food" || product.type === "dessert"
      ? `<div class="product-food"></div>`
      : `<div class="product-cup ${product.type}"></div>`;

    card.innerHTML = `
      <div class="product-image">${visual}</div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="price">${product.price}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.category);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts("drinks");
