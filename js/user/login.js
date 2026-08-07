const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // Sign in with Supabase Auth
  const { data, error } = await window.db.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  // Get user's profile
  const { data: profile, error: profileError } = await window.db
    .from("User")
    .select("*")
    .eq("user_id", data.user.id) // ✅ Changed from auth_id
    .single();

  if (profileError) {
    console.error(profileError);
    alert("Unable to load user profile.");
    return;
  }

  if (!profile) {
    alert("User profile not found.");
    return;
  }

  // Save current user
  localStorage.setItem("currentUser", JSON.stringify(profile));

  // Redirect based on role
  if (profile.role === "admin") {
    window.location.href = "../admin/dashboard.html";
  } else {
    window.location.href = "../user/home.html";
  }
});
