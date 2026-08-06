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

        editBtn.textContent = "Save Profile";
        editBtn.classList.add("save-mode");

        editMode = true;

        firstname.focus();

        return;
    }

    // Validation

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

    // Update Database

    const { error } = await window.db
        .from("User")
        .update({

            firstname: firstname.value.trim(),
            lastname: lastname.value.trim(),
            address: address.value.trim(),
            payment_method: payment.value

        })
        .eq("user_id", currentUser.user_id);

    if (error) {

        alert(error.message);

        return;

    }

    // Update Local Storage

    currentUser.firstname = firstname.value.trim();
    currentUser.lastname = lastname.value.trim();
    currentUser.address = address.value.trim();
    currentUser.payment_method = payment.value;

    localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    // Update Profile header

    document.getElementById("profile-name").textContent =
        `${currentUser.firstname} ${currentUser.lastname}`;

    document.getElementById("profileFullName").textContent =
        `${currentUser.firstname} ${currentUser.lastname}`;

    
    // Lock fields again after saving

    firstname.readOnly = true;
    lastname.readOnly = true;
    address.readOnly = true;
    payment.disabled = true;

    editBtn.textContent = "Edit Profile";
    editBtn.classList.remove("save-mode");

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