async function logout() {

    const { error } = await window.db.auth.signOut();

    if (error) {
        console.error(error);
        return;
    }

    localStorage.removeItem("currentUser");

    window.location.href = "../user/login.html";
}

async function getCurrentUser() {

    const {
        data: { user }
    } = await window.db.auth.getUser();

    return user;
}

async function resetPassword(email) {

    const { error } = await window.db.auth.resetPasswordForEmail(email);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Password reset email sent.");
}

window.logout = logout;
window.getCurrentUser = getCurrentUser;
window.resetPassword = resetPassword;