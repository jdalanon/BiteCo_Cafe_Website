const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Basic password validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!passwordRegex.test(password)) {
    alert(
      "Password must contain at least 8 characters, one uppercase letter, one number, and one special character."
    );
    return;
  }

  try {
    // Create account in Supabase Authentication
    const { data, error } = await window.db.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Registration error:", error);
      alert(error.message);
      return;
    }

    console.log("Supabase Auth User:", data.user);

    // Make sure a user was created
    if (!data.user) {
      alert("Registration failed. Please try again.");
      return;
    }

    // Save additional user information in your User table
    const { error: userError } = await window.db
      .from("User")
      .insert([
        {
          user_id: data.user.id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
        },
      ]);

    if (userError) {
      console.error("User table error:", userError);

      alert(
        "Your account was created, but your profile information could not be saved.\n\n" +
        userError.message
      );

      return;
    }

    // Save user information locally
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        user_id: data.user.id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        role: role,
      })
    );

    alert("Account created successfully!");

    // Redirect to login
    window.location.href = "login.html";
  } catch (err) {
    console.error("Unexpected registration error:", err);
    alert("Something went wrong during registration.");
  }
});