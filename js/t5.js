const btn = document.querySelector(".change-color");
const span = document.querySelector(".color");

btn.addEventListener(
  "click",
  throttle(() => {
    const color = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0);
    document.body.style.backgroundColor = "#" + color;
    span.textContent = "#" + color;

    // Visual feedback
    btn.classList.add("throttled");
    setTimeout(() => {
      btn.classList.remove("throttled");
    }, 1000);
  }, 1000)
);

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    let now = Date.now();
    if (now - lastCall >= delay) {
      fn(...args);
      lastCall = now;
    }
  };
}
