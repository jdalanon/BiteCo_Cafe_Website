import { supabase } from "./js/supabase.js";

async function loadMenu() {

    const { data, error } = await supabase
        .from("Menu")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    const menu = document.getElementById("product-list");

    data.forEach(item => {

        menu.innerHTML += `
            <div class="card">

                <img src="${item.image_url}" alt="${item.menu_name}">

                <h3>${item.menu_name}</h3>

                <p class="description">
                    ${item.description}
                </p>

                <p class="price">
                    ₱${item.price}
                </p>

                <button onclick="addToCart('${item.menu_name}', ${item.price}, this)">
                    Buy Now
                </button>

            </div>
        `;

    });

}

loadMenu();