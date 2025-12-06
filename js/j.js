const str = "amfnghdhdddhddhdkkaamm";
function countL(str) {
  return makeCount([...str]);
}

console.log(countL(str));
const obj = {
  viktor: ["apple", "grape", "orange", "apple", "banana"],
  kate: ["grape", "orange", "apple", "grape", "banana"],
};
function countF(obj) {
  // return Object.keys(obj).reduce((accObj, key) => {
  //   accObj[key] = makeCount(obj[key]);
  //   return accObj;
  // }, {});
  return Object.entries(obj).map(([key, value]) => {
    return {
      [key]: makeCount(value),
    };
  });
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
  // const set = new Set();
  const ar = [];
  for (const { hobbies } of arr) {
    hobbies.forEach((e) => {
      // set.add(e);
      if (!ar.includes(e)) {
        ar.push(e);
      }
    });
  }
  return ar;
  // return [...set].sort();
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

function safeSum(...args) {
  return args.reduce((sum, el) => {
    if (typeof el === "number") {
      sum += el;
      return sum;
    } else {
      return "Invalid input!";
    }
  }, 0);
}
console.log(safeSum(5, 5));

const letterToCount = "amfnghdhdddhddhdkkaamm";
function countLetters(str) {
  return str.reduce((acc, letter) => {
    // acc[letter] = (acc[letter] || 0) + 1;
    if (Object.keys(acc).includes(letter)) {
      acc[letter]++;
    } else {
      acc[letter] = 1;
    }
    return acc;
  }, {});
}
console.log(countLetters([...letterToCount]));
function countFruits(obj) {
  return Object.values(obj).reduce((acc, el, i) => {
    acc[Object.keys(obj)[i]] = countLetters(el);
    return acc;
  }, []);
}
console.log(countFruits(obj));
