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
