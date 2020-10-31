let valueCalculations = require("./valueCalculations");

// Input
let exampleInput = {};
exampleInput.kh = 168;
exampleInput.bu = 92; // Needs to be between 80 and 146
exampleInput.tu = 74;
exampleInput.hu = 98;
exampleInput.alg = 60;
exampleInput.lg = 106;
exampleInput.bt1 = 34;
exampleInput.vl1 = 52;

let marenInput = {};
marenInput.kh = 198;
marenInput.bu = 93; // Needs to be between 80 and 146
marenInput.tu = 74;
marenInput.hu = 105;
marenInput.alg = 67;
marenInput.lg = 106;
marenInput.bt1 = 29;
marenInput.vl1 = 48;

let input = marenInput;

let getValues = function () {
  let values = {};
  values.rh = valueCalculations.rh(input.bu);
  values.rl = valueCalculations.rl(input.kh);
  values.ht = valueCalculations.ht(values.rh, values.rl);
  values.hs = valueCalculations.hs(input.bu);
  values.bt2 = valueCalculations.bt2(input.bu);
  values.vl2 = valueCalculations.vl2(values.rl, input.bu);
  values.rb = valueCalculations.rb(input.bu);
  values.ad = valueCalculations.ad(input.bu);
  values.bb = valueCalculations.bb(input.bu);

  values.kh = input.kh;
  values.bu = input.bu;
  values.tu = input.tu;
  values.hu = input.hu;
  values.alg = input.alg;
  values.lg = input.lg;
  values.bt1 = input.bt1;
  values.vl1 = input.vl1;
  return values;
};

let printValues = function (values) {
  // Print calculated values:
  console.log(" ------------------------------- ");
  console.log("CALCULATED VALUES: ");
  for (let key in values) {
    console.log(`${key}: ${values[key]}`);
  }
  console.log(" ------------------------------- ");
};

module.exports = {
  getValues,
  printValues,
};
