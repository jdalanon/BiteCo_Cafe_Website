// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

}


// =====================================================
// PROFILE DROPDOWN
// =====================================================

const profileBtn =
    document.getElementById("profileBtn");

const profileMenu =
    document.getElementById("profileMenu");


if (profileBtn && profileMenu) {

    profileBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        profileMenu.classList.toggle("show");

    });

}


// =====================================================
// ORDER SUBMENU
// =====================================================

const orderMenuBtn =
    document.getElementById("orderMenuBtn");

const orderSubmenu =
    document.getElementById("orderSubmenu");


if (orderMenuBtn && orderSubmenu) {

    orderMenuBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        orderSubmenu.classList.toggle("show");

    });

}


// =====================================================
// CLOSE PROFILE DROPDOWN
// =====================================================

window.addEventListener("click", (event) => {

    if (
        profileMenu &&
        !event.target.closest(".profile-dropdown")
    ) {

        profileMenu.classList.remove("show");

    }

});


// =====================================================
// LOGOUT
// =====================================================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", async (event) => {

        event.preventDefault();

        console.log("Logout button clicked");


        try {

            const { error } =
                await window.db.auth.signOut();


            if (error) {

                console.error(
                    "Logout Error:",
                    error
                );

                alert(
                    "Logout failed: " +
                    error.message
                );

                return;

            }


            // Remove stored user
            localStorage.removeItem(
                "currentUser"
            );


            // Redirect
            window.location.href =
                "login.html";


        } catch (error) {

            console.error(
                "Logout Error:",
                error
            );

        }

    });

}