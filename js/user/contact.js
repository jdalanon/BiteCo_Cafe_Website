//Contact Form
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Thank you! Your message has been sent.");

    this.reset();
  });
}
