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

function throttle(fn, delay) {
  let lastTime = 0;
  let timer = null;
  let lastArgs;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);
    lastArgs = args;

    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, lastArgs);
      }, remaining);
    }
  };
}
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    const callNow = immediate && !timer;

    clearTimeout(timer);

    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args);
      timer = null;
    }, delay);

    if (callNow) fn.apply(this, args);
  };
}
function once(fn) {
  let used = false;
  return function (...args) {
    if (!used) {
      fn(...args);
      used = true;
    }
  };
}
const helloOnce = once(() => console.log("hello"));

helloOnce(); // hello
helloOnce(); // nothing

function createCounter(def) {
  let value = def;

  return {
    inc() {
      value++;
    },
    dec() {
      value--;
    },
    value() {
      console.log(value);
    },
  };
}
const c = createCounter(10);
c.inc();
c.value(); // 11

function createBankAccount(def) {
  let balance = def;
  return {
    balance() {
      console.log(balance);
    },
    withdraw(amountToWithdraw) {
      if (balance - amountToWithdraw >= 0) {
        balance -= amountToWithdraw;
      } else {
        console.log("not enough money!!");
      }
    },
    deposit(amountToDeposit) {
      balance += amountToDeposit;
    },
  };
}
let myBankAcc = createBankAccount(500);
myBankAcc.deposit(400);
myBankAcc.balance();
myBankAcc.withdraw(1000);
myBankAcc.withdraw(900);
myBankAcc.balance();

function createBankAcc(def) {
  let balance = def;
  return function (command, amount) {
    if (command === "deposit") {
      balance += amount;
    } else if (command === "withdraw") {
      if (balance - amount >= 0) {
        balance -= amount;
      } else {
        console.log("not enough money!!!!!");
      }
    } else if (command === "balance") {
      console.log(balance);
    }
  };
}
let bank = createBankAcc(500);
bank("deposit", 400);
bank("balance");
bank("withdraw", 1000);
bank("withdraw", 900);
bank("balance");

function createBankAccc(def) {
  let balance = def;
  return function (command) {
    balance = command(balance);
  };
}

function deposit(amount) {
  return function (balance) {
    return balance + amount;
  };
}
function balance() {
  return function (balance) {
    console.log(balance);
    return balance;
  };
}
function withdraw(amount) {
  return function (balance) {
    if (balance - amount >= 0) {
      return balance - amount;
    } else {
      console.log("not enough money!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      return balance;
    }
  };
}
const acc = createBankAccc(500);

acc(deposit(400)); // balance = 900
acc(balance()); // prints 900
acc(withdraw(1000)); // "not enough money!!!!"
acc(withdraw(900)); // balance = 0
acc(balance()); // prints 0

function counter(def = 0) {
  let c = def;
  return function (command) {
    c = command(c);
  };
}
function inc(inc = 1) {
  return function (c) {
    return (c += inc);
  };
}
function show() {
  return function (c) {
    console.log(c);
    return c;
  };
}
function dec(dec = 1) {
  return function (c) {
    return (c -= dec);
  };
}
let count = counter(10);
count(inc(2));
count(dec(10));
count(show());

// const slider = {
//   value: 0,
//   onMove(e) {
//     this.value = e.clientX;
//     console.log(this.value);
//   },
// };

// window.addEventListener(
//   "mousemove",
//   throttle(slider.onMove.bind(slider), 5000)
// );

function handler(e) {
  console.log(`X: ${e.clientX}, Time: ${Date.now()}`);
}

const throttled = throttle(handler, 1000);

// window.addEventListener("mousemove", throttled);

const obj1 = {
  value: 10,
  method() {
    console.log(this.value);
  },
};
obj1.method();
const f = obj1.method.bind(obj1);
f();

const obj2 = {
  value: 66,
  get() {
    return this.value;
  },
};
setTimeout(obj2.get.bind(obj2), 0);

function counter1(def) {
  let value = def;
  return function (fn) {
    value = fn(value);
  };
}
function incr(n = 1) {
  return function (value) {
    return value + n;
  };
}
function show1() {
  return function (value) {
    console.log(value);
    return value;
  };
}
function decr(n = 1) {
  return function (value) {
    return value - n;
  };
}
const co = counter1(10);
co(incr(5));
co(show1());
co(decr(15));
co(show1());

function logMouse() {
  return function (e) {
    console.log(e.clientX);
  };
}
const throttled2 = throttle(logMouse(), 500);
const debounced = debounce(logMouse(), 2000);

function handleMouseMove(e) {
  throttled2(e);
  debounced(e);
}
window.addEventListener("mousemove", handleMouseMove);

function freeze() {
  Promise.resolve().then(freeze);
}
//freeze();

setTimeout(() => {
  console.log("freeze doesn't work!");
}, 4000);

// async function yieldControl() {
//   await new Promise((r) => setTimeout(r, 0));
//   yieldControl();
// }
// yieldControl();

async function processInChunks(items, handler, chunkSize = 10) {
  if (items.length === 0) return [];

  let array = await Promise.all(items.slice(0, chunkSize).map(handler));

  await new Promise((r) => setTimeout(r, 0));

  const rest = await processInChunks(
    items.slice(chunkSize),
    handler,
    chunkSize
  );

  return array.concat(rest);
}

const result = await processInChunks(
  [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 3, 3, 3, 5,
  ],
  (item) => {
    return item * 4;
  }
);
console.log(result);

function frequency(arr) {
  // return arr.reduce((acc, el) => {
  //   acc[el] = (acc[el] || 0) + 1;
  //   return acc;
  // }, {});
  const res = {};
  for (const el of arr) {
    if (res[el] === undefined) {
      res[el] = 1;
    } else {
      res[el]++;
    }
  }
  return res;
}

console.log(frequency(["q", "d", "m", "v", "k", "q", "k"]));

function unique(arr) {
  const seen = {};
  const uniqueArr = [];
  for (const el of arr) {
    if (!seen[el]) {
      uniqueArr.push(el);
      seen[el] = true;
    }
  }
  return uniqueArr;
}

console.log(unique([1, 2, 2, 3, 2, 2, 2, 3, 3])); // [1, 2, 3]

function reverseString(str) {
  let reversedString = "";

  for (let index = str.length - 1; index >= 0; index--) {
    reversedString += str[index];
  }
  return reversedString;
}
console.log(reverseString("!dlroW olleH"));

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (arr[middle] === target) {
      return middle;
    }
    if (arr[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));

function factorialIterative(n) {
  let it = 1;
  for (let index = 1; index <= n; index++) {
    it *= index;
  }
  return it;
}
console.log(factorialIterative(9));

function factorialRecursive(n) {
  if (n === 0) return 1;
  return n * factorialRecursive(n - 1);
}
console.log(factorialRecursive(9));

function recursiveBinarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  let mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;

  if (arr[mid] < target) {
    return recursiveBinarySearch(arr, target, (left = mid + 1), right);
  } else {
    return recursiveBinarySearch(arr, target, left, (right = mid - 1));
  }
}
const arrr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(recursiveBinarySearch(arrr, 1));

function hasDuplicates(arr) {
  const hasSeen = {};
  for (let i = 0; i < arr.length; i++) {
    if (hasSeen[arr[i]]) return true;
    hasSeen[arr[i]] = true;
  }
  return false;
}
console.log(hasDuplicates([1, 2, 3, 2])); // true
console.log(hasDuplicates([1, 2, 3])); // false
function max(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
console.log(
  max([-3, -1, -7]) // -1
);
