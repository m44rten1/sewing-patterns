// bu levels
let bu10 = 80;
let bu13 = 92;
let bu15 = 96;
let bu18 = 100;
let bu20 = 116;
let bu25 = 128;
let bu30 = 146;

let rh = function (bu) {
  if (bu >= bu10 && bu < bu20) {
    return bu / 10 + 11;
  }
  if (bu >= bu20 && bu < bu30) {
    return bu / 10 + 10.5;
  }

  throw new Error(`"Bu" needs to be between ${bu10} and ${bu30}`);
};

let rl = function (kh) {
  return kh / 4;
};

let ht = function (rh, rl) {
  return rh + rl;
};

let hs = function (bu) {
  return bu / 20 + 2;
};

let bt2 = function (bu) {
  if (bu >= bu10 && bu < bu15) {
    return bu / 4 + 6;
  }
  if (bu >= bu15 && bu < bu20) {
    return bu / 4 + 5;
  }

  if (bu >= bu20 && bu < bu30) {
    return bu / 4 + 4;
  }

  throw new Error(`"Bu" needs to be between ${bu10} and ${bu30}`);
};

let vl2 = function (rl, bu) {
  let overSize = bu >= 100 ? bu - 100 : 0;

  if (bu >= bu10 && bu < bu13) {
    return rl + (3.4 + 4) / 2;
  }

  if (bu >= bu13 && bu < bu20) {
    return rl + (4.5 + 5) / 2 + overSize / 10;
  }

  if (bu >= bu20 && bu < bu25) {
    return rl + 5.5 + overSize / 10;
  }

  if (bu >= bu25 && bu < bu30) {
    return rl + 6 + overSize / 10;
  }

  throw new Error(`"Bu" needs to be between ${bu10} and ${bu30}`);
};

let rb = function (bu) {
  return bu / 8 + 5.5;
};

let ad = function (bu) {
  if (bu >= bu10 && bu < bu18) {
    return bu / 8 - 1.5;
  }

  if (bu >= bu18 && bu < bu20) {
    return bu / 8 - 0.5;
  }

  if (bu >= bu20 && bu < bu30) {
    return bu / 4 + 0.5;
  }

  throw new Error(`"Bu" needs to be between ${bu10} and ${bu30}`);
};

let bb = function (bu) {
  if (bu >= bu10 && bu < bu18) {
    return bu / 4 - 4;
  }

  if (bu >= bu18 && bu < bu20) {
    return bu / 4 - 5;
  }

  if (bu >= bu20 && bu < bu30) {
    return bu / 4 - 6;
  }

  throw new Error(`"Bu" needs to be between ${bu10} and ${bu30}`);
};

module.exports = {
  rh,
  rl,
  ht,
  hs,
  bt2,
  vl2,
  rb,
  ad,
  bb,
};
