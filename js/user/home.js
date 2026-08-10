const menuGrid =
    document.getElementById("homepageMenuGrid");

const categoryButtons =
    document.querySelectorAll(".category");

let allMenuItems = [];


/* Load all Menu Items */

async function loadHomepageMenu() {

    try {

        menuGrid.innerHTML = `
            <p class="menu-loading">
                Loading menu...
            </p>
        `;

        const {
            data,
            error
        } = await window.db
            .from("Menu")
            .select("*")
            .order("menu_id", {
                ascending: true
            });

        if (error) {
            console.error(
                "Error loading menu:",
                error
            );

            menuGrid.innerHTML = `
                <p class="menu-error">
                    Unable to load menu.
                </p>
            `;

            return;
        }

        allMenuItems = data || [];

        console.log(
            "Homepage Menu:",
            allMenuItems
        );

        displayMenuItems(allMenuItems);

    } catch (error) {

        console.error(
            "Unexpected error:",
            error
        );

        menuGrid.innerHTML = `
            <p class="menu-error">
                Something went wrong while loading the menu.
            </p>
        `;
    }
}


/* Display Menu Items */

function displayMenuItems(items) {

    if (!items || items.length === 0) {

        menuGrid.innerHTML = `
            <p class="menu-empty">
                No menu items available.
            </p>
        `;

        return;
    }

    menuGrid.innerHTML = items
        .map(item => {

            return `
                <div
                    class="product-card"
                    data-menu-id="${item.menu_id}"
                >

                    <div class="product-image">

                        <img
                            src="${item.image_url || 'images/default-food.png'}"
                            alt="${item.menu_name}"
                        >

                    </div>

                    <div class="product-info">

                        <h3>
                            ${item.menu_name}
                        </h3>

                        <p class="price">
                            ₱${Number(item.price).toFixed(2)}
                        </p>

                    </div>

                </div>
            `;

        })
        .join("");
}


/* Category Filter */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category =
                button.dataset.category;

            if (category === "all") {

                displayMenuItems(
                    allMenuItems
                );

                return;
            }

            const filteredItems =
                allMenuItems.filter(
                    item =>
                        String(item.category_id) ===
                        String(category)
                );

            displayMenuItems(
                filteredItems
            );
        }
    );

});


/* Initial Load */

loadHomepageMenu();