const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

// ==========================================
// Profile Dropdown
// ==========================================

if (profileBtn && profileMenu) {

    profileBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        profileMenu.classList.toggle("show");

    });

}


// Close dropdown when clicking outside
window.addEventListener("click", (e) => {

    if (
        profileMenu &&
        !e.target.closest(".profile-dropdown")
    ) {

        profileMenu.classList.remove("show");

    }

});


// ==========================================
// Load Current User
// ==========================================

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


// User is not logged in
if (!currentUser) {

    window.location.href = "login.html";

} else {

    // ==========================================
    // Navbar Profile
    // ==========================================

    const profileName =
        document.getElementById("profile-name");

    const profileEmail =
        document.getElementById("profile-email");


    if (profileName) {

        profileName.textContent =
            `${currentUser.firstname} ${currentUser.lastname}`;

    }


    if (profileEmail) {

        profileEmail.textContent =
            currentUser.email;

    }


    // ==========================================
    // Profile Dashboard
    // ==========================================

    const profileFullName =
        document.getElementById("profileFullName");

    const profileRole =
        document.getElementById("profileRole");

    const firstname =
        document.getElementById("firstname");

    const lastname =
        document.getElementById("lastname");

    const email =
        document.getElementById("email");

    const role =
        document.getElementById("role");

    const createdAt =
        document.getElementById("created_at");


    if (profileFullName) {

        profileFullName.textContent =
            `${currentUser.firstname} ${currentUser.lastname}`;

    }


    if (profileRole && currentUser.role) {

        profileRole.textContent =
            currentUser.role.charAt(0).toUpperCase()
            + currentUser.role.slice(1);

    }


    if (firstname) {

        firstname.value =
            currentUser.firstname;

    }


    if (lastname) {

        lastname.value =
            currentUser.lastname;

    }


    if (email) {

        email.value =
            currentUser.email;

    }


    if (role) {

        role.value =
            currentUser.role;

    }


    if (createdAt && currentUser.created_at) {

        createdAt.value =
            new Date(
                currentUser.created_at
            ).toLocaleDateString();

    }

}


// ==========================================
// Logout
// ==========================================

const logoutButtons =
    document.querySelectorAll(".logoutBtn");


logoutButtons.forEach((button) => {

    button.addEventListener(
        "click",
        async () => {

            try {

                // Logout Supabase session
                if (
                    window.db &&
                    window.db.auth
                ) {

                    const { error } =
                        await window.db.auth.signOut();

                    if (error) {

                        console.error(
                            "Logout error:",
                            error
                        );

                    }

                }

            } catch (error) {

                console.error(
                    "Logout failed:",
                    error
                );

            }


            // Remove local user data
            localStorage.removeItem(
                "currentUser"
            );


            // Redirect to login
            window.location.href =
                "login.html";

        }
    );

});