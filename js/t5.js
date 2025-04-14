const btn = document.querySelector(".change-color");
const span = document.querySelector(".color");
btn.addEventListener(
  "click",
  throttle(() => {
    const color = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0);
    document.querySelector("body").style.backgroundColor = "#" + color;
    span.textContent = color;
  }, 1000)
);
let t = 0;
btn.addEventListener("click", () => {
  console.log("triggered: ", ++t);
});
function throttle(fn, delay) {
  let lastCall = 0;
  let ex = 0;
  return function (...args) {
    const dateNow = Date.now();
    if (dateNow - lastCall >= delay) {
      fn.apply(this, args);
      lastCall = dateNow;
      console.log("executed: ", ++ex);
    }
  };
}
