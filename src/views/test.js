const numAry = [1, 3, 4, 6, 8];

function checkNum(num) {
  return numAry;
}

console.log(checkNum(5));

function func2(str) {
  return str.split(",");
}

console.log(func2("a,b,c"));
console.log(func2("hi,hello"));

const a = [1, 3, 4, 6, 8];

const checkSame = (arr) => {
  const newarr = [];
  newarr.push(arr.filter((item) => a.filter((item2) => item == item2)));
  return newarr;
};

console.log(checkSame([3, 4, 9]));
console.log(checkSame([1, 2, 3, 4, 5, 6, 9]));

const lotto = () => {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * 10);
    if (arr.indexOf(num)) arr.push(num);
  }
  return arr;
};

console.log(lotto());
console.log(lotto());
