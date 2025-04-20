const input = document.querySelector("input");

input.addEventListener(
  "input",
  debounce((e) => {
    input.classList.remove("debouncing");
    console.log(e.target.value.trim());
  }, 500)
);
function debounce(fn, delay) {
  let time;
  return function (...args) {
    clearTimeout(time);
    this.classList.add("debouncing");
    time = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
