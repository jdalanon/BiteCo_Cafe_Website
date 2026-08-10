const currentUser = JSON.parse(localStorage.getItem("currentUser"));


// ===============================
// CHECK LOGIN
// ===============================

if (!currentUser) {

    window.location.href = "login.html";

} else {

    loadProfile();

}


// ===============================
// LOAD PROFILE
// ===============================

function loadProfile() {

    // Navbar
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");

    if (profileName) {
        profileName.textContent =
            `${currentUser.firstname} ${currentUser.lastname}`;
    }

    if (profileEmail) {
        profileEmail.textContent =
            currentUser.email;
    }


    // Dashboard
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

    const address =
        document.getElementById("address");

    const payment =
        document.getElementById("payment");

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
            currentUser.role.charAt(0).toUpperCase() +
            currentUser.role.slice(1);

    }


    if (firstname) {
        firstname.value =
            currentUser.firstname || "";
    }


    if (lastname) {
        lastname.value =
            currentUser.lastname || "";
    }


    if (email) {
        email.value =
            currentUser.email || "";
    }


    if (address) {
        address.value =
            currentUser.address || "";
    }


    if (payment) {
        payment.value =
            currentUser.payment_method || "";
    }


    if (role) {
        role.value =
            currentUser.role || "";
    }


    if (createdAt && currentUser.created_at) {

        createdAt.value =
            new Date(
                currentUser.created_at
            ).toLocaleDateString();

    }

}


// ===============================
// EDIT / SAVE PROFILE
// ===============================

const editBtn =
    document.getElementById("editProfileBtn");

let editMode = false;


if (editBtn) {

    editBtn.addEventListener("click", async () => {

        const firstname =
            document.getElementById("firstname");

        const lastname =
            document.getElementById("lastname");

        const address =
            document.getElementById("address");

        const payment =
            document.getElementById("payment");


        // =========================
        // ENABLE EDIT MODE
        // =========================

        if (!editMode) {

            firstname.readOnly = false;
            lastname.readOnly = false;
            address.readOnly = false;
            payment.disabled = false;

            editBtn.textContent =
                "Save Profile";

            editBtn.classList.add(
                "save-mode"
            );

            editMode = true;

            firstname.focus();

            return;

        }


        // =========================
        // VALIDATION
        // =========================

        if (address.value.trim() === "") {

            alert("Address is required.");

            address.focus();

            return;

        }


        if (payment.value === "") {

            alert("Please select a payment method.");

            payment.focus();

            return;

        }


        // =========================
        // UPDATE SUPABASE
        // =========================

        const { error } = await window.db
            .from("User")
            .update({

                firstname:
                    firstname.value.trim(),

                lastname:
                    lastname.value.trim(),

                address:
                    address.value.trim(),

                payment_method:
                    payment.value

            })
            .eq(
                "user_id",
                currentUser.user_id
            );


        if (error) {

            console.error(
                "Profile Update Error:",
                error
            );

            alert(error.message);

            return;

        }


        // =========================
        // UPDATE LOCAL STORAGE
        // =========================

        currentUser.firstname =
            firstname.value.trim();

        currentUser.lastname =
            lastname.value.trim();

        currentUser.address =
            address.value.trim();

        currentUser.payment_method =
            payment.value;


        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );


        // =========================
        // UPDATE DISPLAY
        // =========================

        loadProfile();


        // =========================
        // DISABLE EDIT MODE
        // =========================

        firstname.readOnly = true;
        lastname.readOnly = true;
        address.readOnly = true;
        payment.disabled = true;

        editBtn.textContent =
            "Edit Profile";

        editBtn.classList.remove(
            "save-mode"
        );

        editMode = false;


        alert(
            "Profile updated successfully!"
        );

    });

}