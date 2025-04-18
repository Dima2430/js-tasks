const STORAGE_KEY = "feedback";
const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageInput = form.elements.message;

form.addEventListener("submit", throttle(onSubmit));
form.addEventListener("input", onChange);
function restore() {
  const { email, message } = retrive() ?? { email: "", message: "" };
  emailInput.value = email;
  messageInput.value = message;
}
restore();
function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function retrive() {
  const data = localStorage.getItem(STORAGE_KEY);
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return data;
  }
}
function onSubmit(e) {
  e.preventDefault();
  const { email, message } = retrive() ?? { email: "", message: "" };

  if (!email || !message) {
    return alert("Fill in all fields");
  }
  console.log({ email, message });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}
function onChange() {
  email = emailInput.value.trim();
  message = messageInput.value.trim();
  if (!email && !message) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    save({
      email,
      message,
    });
  }
}
function throttle(fn, delay = 3600) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= delay) {
      fn.apply(this, args);
      last = now;
    }
  };
}
