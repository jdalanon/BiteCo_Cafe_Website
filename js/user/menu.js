import { supabase } from "../supabase.js";

async function loadMenu() {

    // Get category from URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    // Return to homepage if no category is selected
    if (!category) {
        window.location.href = "home.html";
        return;
    }

    // Change page title
    const menuTitle = document.getElementById("menu-title");
    if (menuTitle) {
        menuTitle.textContent = category;
    }

    // Map category names to IDs
    const categoryMap = {
        Drinks: 1,
        Snacks: 2
    };

    // Validate category
    if (!categoryMap[category]) {
        window.location.href = "home.html";
        return;
    }

    // Query menu items
    const { data, error } = await supabase
        .from("Menu")
        .select("*")
        .eq("category_id", categoryMap[category]);

    if (error) {
        console.error("Supabase Error:", error);
        return;
    }

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (!data || data.length === 0) {
        productList.innerHTML = "<h3>No menu items found.</h3>";
        return;
    }

    data.forEach(item => {

        productList.innerHTML += `
            <div class="card">

                <img src="${item.image_url}" alt="${item.menu_name}">

                <h3>${item.menu_name}</h3>

                <p class="description">
                    ${item.description}
                </p>

                <p class="price">
                    ₱${Number(item.price).toFixed(2)}
                </p>

                <button onclick="addToCart('${item.menu_name}', ${item.price}, '${item.image_url}', this)"
                    ${!item.availability ? "disabled" : ""}
                        class="${!item.availability ? "disabled-btn" : ""}">
                            ${item.availability ? "Buy Now" : "Out of Stock"}
                </button>

            </div>
        `;
    });
}

loadMenu();