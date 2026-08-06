const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

// Profile Dropdown
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


// Load Current User
const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);


// User is not logged in
if (!currentUser) {

    window.location.href = "login.html";

} else {

    // Navbar Profile
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


    // Profile Dashboard
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

    if(address){

        address.value =
            currentUser.address ?? "";
    }

    if(payment){

        payment.value =
        currentUser.payment_method ?? "";
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


// Edit / Save Profile
const editBtn = document.getElementById("editProfileBtn");

let editMode = false;

editBtn.addEventListener("click", async () => {

    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const address = document.getElementById("address");
    const payment = document.getElementById("payment");

    // Edit Profile details
    if (!editMode) {

        firstname.readOnly = false;
        lastname.readOnly = false;
        address.readOnly = false;
        payment.disabled = false;
        editBtn.textContent = "Save Changes";
        editMode = true;

        firstname.focus();
        return;

    }

    // Switch Edit and Save button text and color
    const editBtn = document.querySelector(".edit-btn");

    editBtn.addEventListener("click", () => {

    if (editBtn.textContent === "Edit Profile") {

        editBtn.textContent = "Save Profile";
        editBtn.classList.add("save-mode");

    } else {

        editBtn.textContent = "Edit Profile";
        editBtn.classList.remove("save-mode");

    }

    });

    // Save the Edited Profile details
    const newFirstname = firstname.value.trim();
    const newLastname = lastname.value.trim();
    const newAddress = address.value.trim();
    const newPayment = payment.value;

    if (newAddress === "") {

        alert("Address is required.");
        return;

    }

    if (newPayment === "") {

        alert("Please select a payment method.");
        return;

    }

    const { error } = await window.db
        .from("User")
        .update({

            firstname: newFirstname,
            lastname: newLastname,
            address: newAddress,
            payment_method: newPayment

        })
        .eq("auth_id", currentUser.auth_id);

    if (error) {

        alert(error.message);
        return;

    }

    // Update local storage

    currentUser.firstname = newFirstname;
    currentUser.lastname = newLastname;
    currentUser.address = newAddress;
    currentUser.payment_method = newPayment;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    // Update Profile Header

    document.getElementById("profile-name").textContent =
        `${newFirstname} ${newLastname}`;

    document.getElementById("profileFullName").textContent =
        `${newFirstname} ${newLastname}`;

    // Disable fields

    firstname.readOnly = true;
    lastname.readOnly = true;
    address.readOnly = true;

    payment.disabled = true;

    editBtn.textContent = "Edit Profile";

    editMode = false;

    alert("Profile updated successfully!");

});


// Logout
const logoutButtons = document.querySelectorAll(".logout-btn");

logoutButtons.forEach(button => {

    button.addEventListener("click", async () => {

        try {

            const { error } = await window.db.auth.signOut();

            if (error) {
                console.error(error);
            }

        } catch (err) {

            console.error(err);

        }

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    });

});