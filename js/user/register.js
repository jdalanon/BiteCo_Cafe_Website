import { supabase } from "../shared/supabase.js";


const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const role = "user";

    // Email validation
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }

    // Password validation
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("Password does not meet the requirements.");
        return;
    }

    // Check duplicate emails
    const { data: existingUser, error: checkError } = await supabase
        .from("User")
        .select("email")
        .eq("email", email)
        .maybeSingle();

    if (checkError) {
        console.error(checkError);
    }

    if (existingUser) {
        alert("Email already exists.");
        return;
    }


    const { error } = await supabase
        .from("User")
        .insert([
            {
                firstname,
                lastname,
                email,
                password,   
                role
            }
        ]);

    console.log(error);

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    alert("Registration successful!");

    // Redirects to Login Page
    window.location.href = "login.html";

});
