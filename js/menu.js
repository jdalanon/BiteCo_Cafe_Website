import { supabase } from "./supabase.js";

async function loadMenu() {

    // Get category from URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    // Map category name to category_id
    const categoryMap = {
        Drinks: 1,
        Snacks: 2
    };

    // Update page title
    const menuTitle = document.getElementById("menu-title");

    if (menuTitle) {
        menuTitle.textContent = category ? category : "Featured Menu";
    }

    // Build query
    let query = supabase
        .from("Menu")
        .select("*");

    // Filter by category_id
    if (category && categoryMap[category]) {
        query = query.eq("category_id", categoryMap[category]);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Supabase Error:", error);
        return;
    }

    const productList = document.getElementById("product-list");

    productList.innerHTML = "";

    if (!data || data.length === 0) {
        productList.innerHTML = `
            <h3>No menu items found.</h3>
        `;
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

                <button onclick="addToCart('${item.menu_name}', ${item.price}, '${item.image_url}', this)">
                    Buy Now
                </button>

            </div>
        `;
    });

}

loadMenu();