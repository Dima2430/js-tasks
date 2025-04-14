const form = document.querySelector(".login-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value.trim();
  const password = e.currentTarget.elements.password.value.trim();
  if (!email || !password) {
    return alert("Fill in all fields");
  }
  if (password.length < 8) {
    return alert("Password is too short");
  }
  console.log({
    email,
    password,
  });

  form.reset();
});
