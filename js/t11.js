const input = document.querySelector("input");
const btn = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
let timer = null;

btn.addEventListener("click", () => {
  const time = input.value;
  if (!time) {
    return Swal.fire({
      icon: "warning",
      title: "Missing date",
      text: "Please pick a date before starting the timer!",
    });
  }

  const pickedDate = new Date(time);
  const now = new Date();

  if (pickedDate <= now) {
    return Swal.fire({
      icon: "error",
      title: "Invalid Date",
      text: "Please select a date in the future.",
    });
  }

  localStorage.setItem("targetTime", pickedDate.getTime());
  startTimer(pickedDate.getTime());
  Swal.fire({
    icon: "success",
    title: "Timer Started",
    text: `Countdown to ${pickedDate.toLocaleString()} has started!`,
    timer: 4000,
    showConfirmButton: false,
  });
  input.value = "";
});

btnStop.addEventListener("click", stopTimer);

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("targetTime");
  if (!saved) return;

  const target = parseInt(saved, 10);
  const now = Date.now();

  if (target > now) {
    startTimer(target);
  } else {
    localStorage.removeItem("targetTime");
    passMiliseconds(0);
  }
});

function startTimer(targetTime) {
  disableInput(true);

  let timeToSpare = targetTime - Date.now();
  passMiliseconds(timeToSpare);

  timer = setInterval(() => {
    timeToSpare -= 1000;

    if (timeToSpare <= 0) {
      Swal.fire({
        icon: "info",
        title: "Time's Up!",
        text: "The countdown has finished.",
      });
      stopTimer();
      passMiliseconds(0);
      return;
    }

    passMiliseconds(timeToSpare);
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  localStorage.removeItem("targetTime");
  passMiliseconds(0);
  disableInput(false);
}

function disableInput(disabled) {
  input.disabled = disabled;
  btn.disabled = disabled;
}

function passMiliseconds(mil) {
  const days = Math.floor(mil / (1000 * 60 * 60 * 24));
  const hours = Math.floor((mil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((mil % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((mil % (1000 * 60)) / 1000);

  document.querySelector("[data-days]").textContent = days
    .toString()
    .padStart(2, "0");
  document.querySelector("[data-hours]").textContent = hours
    .toString()
    .padStart(2, "0");
  document.querySelector("[data-minutes]").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.querySelector("[data-seconds]").textContent = seconds
    .toString()
    .padStart(2, "0");
}
