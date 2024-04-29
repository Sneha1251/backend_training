const math = require("lodash");

const add = (num1, num2) => {
  return math.add(num1, num2);
};

const sub = (num1, num2) => {
  return math.subtract(num1, num2);
};

const mult = (num1, num2) => {
  return math.multiply(num1, num2);
};

const div = (num1, num2) => {
  return math.divide(num1, num2);
};

module.exports=  {add, sub, mult, div };