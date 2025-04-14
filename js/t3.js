const input = document.querySelector("#name-input");
const span = document.querySelector("#name-output");
input.addEventListener("input", (e) =>
  !e.currentTarget.value.trim()
    ? (span.textContent = "Anonymous")
    : (span.textContent = e.currentTarget.value.trim())
);
