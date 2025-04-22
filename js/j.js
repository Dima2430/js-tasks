const str = "aaabffhdddhh";
function countL(str) {
  str = Array.from(str);
  return makeCount(str);
}

console.log(countL(str));
const obj = {
  viktor: ["apple", "grape", "orange", "apple", "banana"],
  kate: ["grape", "orange", "apple", "grape", "banana"],
};
function countF(obj) {
  return Object.keys(obj).reduce((accObj, key) => {
    accObj[key] = makeCount(obj[key]);
    return accObj;
  }, {});
}
console.log(countF(obj));
function makeCount(arr) {
  return arr.reduce((obj, el) => {
    obj[el] = (obj[el] || 0) + 1;
    return obj;
  }, {});
}

function countAll(obj) {
  // const merged = Object.values(obj).reduce((acc, arr) => acc.concat(arr), []);
  // return makeCount(merged);
  return makeCount(Object.values(obj).flat());
}
console.log(countAll(obj));
const users = [
  { name: "Anna", hobbies: ["reading", "coding"] },
  { name: "Ben", hobbies: ["gaming", "coding"] },
  { name: "Cara", hobbies: ["traveling", "reading"] },
];

function countH(arr) {
  const set = new Set();
  for (const { hobbies } of arr) {
    hobbies.forEach((e) => {
      set.add(e);
    });
  }
  return [...set].sort();
}
console.log(countH(users));

class Cart {
  #arr = [];
  add(obj) {
    this.#arr.push(obj);
  }
  remove(name) {
    const i = this.#arr.findIndex((o) => o.name === name);
    if (i !== -1) {
      this.#arr.splice(i, 1);
    }
  }
  total() {
    return this.#arr.reduce((sum, it) => sum + it.price, 0);
  }
}
const cart = new Cart();

cart.add({ name: "Apple", price: 2 });
cart.add({ name: "Banana", price: 1 });
cart.add({ name: "Apple", price: 2 });

cart.remove("Apple");
console.log(cart.total());
