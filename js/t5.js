const btn = document.querySelector(".change-color");
const span = document.querySelector(".color");
btn.addEventListener("click", (e) => {
  const color = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0);
  document.querySelector("body").style.backgroundColor = "#" + color;
  span.textContent = color;
});
