const NEW_ROW = "feedback";
const STORAGE = "feedback-storage";
const form = document.querySelector("form");
const table = document.querySelector("table");
form.addEventListener(
  "input",
  debounce((e) => {
    let feedback = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      feedback: form.elements.feedback.value.trim(),
    };
    saveDraft(feedback);
  }, 1000)
);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const feedback = form.elements.feedback.value.trim();
  if (!name || !email || !feedback) {
    return alert("Fill in all fields");
  }
  saveToStorage({ name, email, feedback });
  localStorage.removeItem(NEW_ROW);
  addLastRow();
  form.reset();
});
function saveDraft(feedback) {
  localStorage.setItem(NEW_ROW, JSON.stringify(feedback));
}
function saveToStorage(feedback) {
  const storage = JSON.parse(localStorage.getItem(STORAGE)) ?? [];
  storage.push(feedback);
  localStorage.setItem(STORAGE, JSON.stringify(storage));
}
function restoreInputValues() {
  const nameI = form.elements.name;
  const email = form.elements.email;
  const feedback = form.elements.feedback;
  let data;
  try {
    data = JSON.parse(localStorage.getItem(NEW_ROW)) ?? {
      name: "",
      email: "",
      feedback: "",
    };
  } catch (error) {
    console.log(error);
  }

  nameI.value = data.name;
  email.value = data.email;
  feedback.value = data.feedback;
}
restoreInputValues();

function renderFeedbackTable() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(STORAGE));
    if (!Array.isArray(data)) return;
  } catch (error) {
    console.error("Invalid storage data:", error);
    return;
  }

  data.forEach(({ name, email, feedback }) => {
    table.appendChild(createRow({ name, email, feedback }));
  });
}
renderFeedbackTable();
function addLastRow() {
  const data = JSON.parse(localStorage.getItem(STORAGE)) ?? [];
  const { name, email, feedback } = data.at(-1);
  table.appendChild(createRow({ name, email, feedback }));
}
function createRow({ name, email, feedback }) {
  const row = document.createElement("tr");
  for (const value of [name, email, feedback]) {
    const td = document.createElement("td");
    td.textContent = value;
    row.appendChild(td);
  }
  return row;
}
document.querySelector("#clear-btn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE);
  table.querySelectorAll("tr").forEach((row, i) => {
    if (i !== 0) row.remove();
  });
});

function debounce(fn, delay) {
  let time;
  return function (...args) {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
