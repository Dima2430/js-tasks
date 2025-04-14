const categories = document.querySelectorAll(".item");
console.log("Number of categories: ", categories.length);
categories.forEach((e) => {
  console.log(e.querySelector("h2").textContent);
  console.log(e.querySelectorAll("li").length);
});
