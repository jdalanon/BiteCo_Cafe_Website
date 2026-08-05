import { supabase } from "./supabase.js";

async function loadMenu() {

    const { data, error } = await supabase
        .from("Menu")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    const menu = document.getElementById("menu");

    data.forEach(item => {

        menu.innerHTML += `
            <div class="card">
                <img src="${item.image_url}" alt="${item.menu_name}">
                <h3>${item.menu_name}</h3>
                <p>${item.description}</p>
                <p>₱${item.price}</p>
            </div>
        `;

    });

}

loadMenu();