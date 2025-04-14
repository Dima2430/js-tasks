const input = document.querySelector("input");
input.addEventListener(
  "input",
  debounceFalse((e) => {
    console.log("Bs: ", e.target.value);
  }, 500)
);
input.addEventListener(
  "input",
  debounce((e) => {
    console.log(e.target.value);
  }, 500)
);
function debounce(fn, delay) {
  let time;
  return function (...args) {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
function debounceFalse(fn, delay) {
  return function (...args) {
    setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
