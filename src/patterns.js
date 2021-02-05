const draw = require("./draw");

function dist(point1, point2) {
  return Math.sqrt(
    Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2)
  );
}

let getPointsPatternBodice = function (values) {
  // Points
  let points = {};
  let frontBackSpacing = 20;
  let referencePoint = [10, 10];

  let offset = 0;

  // Explaining the structure of points in the code.
  // On the reference in the book, the reference point is the top right of the page.
  // x in the book goes positive left, and y in the book goes positive down
  // On the pdf, you start from the top left corner. x goes positive right and y goes positive down

  // points[x] = [x-value, y-value]
  // points[1] = [x-value of point 1, y-value of point 1]
  // x-value of point 1 = points[1][0] (-> start counting at '0'. '0' represents 'x' and '1' represents 'y')
  // y-value of point 1 = points[1][1]
  // y-value of point 2 = y-value of point 1 + values.rh
  // y-value of point 2 = points[1][1] + values.rh

  points[1] = referencePoint;
  points[2] = [points[1][0], points[1][1] + values.rh];
  points[3] = [points[1][0], points[1][1] + values.rl];
  points[4] = [points[1][0], points[1][1] + values.ht];
  points[5] = [points[1][0], points[1][1] + values.lg];
  points[6] = [points[3][0] + 2, points[3][1]];
  points[7] = [points[4][0] + 2, points[4][1]];
  points[8] = [points[5][0] + 2, points[5][1]];
  points[9] = [
    points[1][0] +
      ((points[6][0] - points[3][0]) * (points[2][1] - points[1][1])) /
        (points[3][1] - points[1][1]),
    points[2][1],
  ];

  points[10] = [points[9][0] + values.rb, points[9][1]];
  points[11] = [points[10][0] + (2 / 3) * values.ad, points[10][1]];
  points["11A"] = [points[11][0] + frontBackSpacing, points[11][1]];
  points[12] = [points["11A"][0] + (1 / 3) * values.ad, points["11A"][1]];
  points[13] = [points[12][0] + values.bb, points[12][1]]; // CHECK IF 13 to 11A and 11 to 9 must be half bu
  points[14] = [points[13][0] - ((1 / 10) * values.bu + 0.5), points[13][1]];
  points[15] = [points[1][0] + values.hs, points[1][1]];
  points[16] = [points[15][0], points[15][1] - 2];
  points[17] = [points[10][0], points[15][1]];
  points[18] = [points[17][0], points[17][1] + 1.5];

  let dis16_18 = dist(points[16], points[18]);

  points[19] = [
    points[16][0] +
      ((points[18][0] - points[16][0]) * (dis16_18 + 1.5)) / dis16_18,
    points[16][1] +
      ((points[18][1] - points[16][1]) * (dis16_18 + 1.5)) / dis16_18,
  ];
  points[20] = [
    points[10][0],
    points[10][1] - (1 / 4) * (points[10][1] - points[18][1]),
  ];
  points[21] = [points[20][0] + 1.3, points[20][1]];
  points[22] = [points[12][0], points[21][1]];
  points[23] = [points[12][0], points[18][1] + 2];
  points[24] = [points[14][0], points[3][1]];

  points[25] = [points[24][0], points[24][1] - values.vl2];
  points[26] = [points[25][0], points[25][1] + values.bt2];

  let dis12_23 = points[12][1] - points[23][1];
  let beta = Math.PI / 2 - 2 * Math.asin(values.bu / (40 * dis12_23));

  points[27] = [
    points[12][0] - dis12_23 * Math.cos(beta),
    points[12][1] - dis12_23 * Math.sin(beta),
  ];

  let A = points[26][1] - points[25][1];
  let dis16_19 = dist(points[16], points[19]);
  let B = dis16_19 - 1;
  let C = dist(points[27], points[26]);
  beta = Math.acos((A * A + C * C - B * B) / (2 * A * C));
  let alpha = Math.atan(
    (points[26][1] - points[27][1]) / (points[26][0] - points[27][0])
  );

  points[28] = [
    points[26][0] - A * Math.cos(alpha + beta),
    points[26][1] - A * Math.sin(alpha + beta),
  ];
  points[29] = [points[13][0], points[25][1]];
  points[30] = [points[29][0] - values.hs, points[29][1]];
  points[31] = [points[29][0], points[29][1] + values.hs + 1];

  A = dist(points[30], points[25]);
  alpha = Math.atan(
    (points[27][1] - points[28][1]) / (points[28][0] - points[27][0])
  );

  points[32] = [
    points[28][0] - A * Math.cos(alpha),
    points[28][1] + A * Math.sin(alpha),
  ];
  points[33] = [points[26][0], points[26][1] - dist(points[32], points[26])];
  points[34] = [points[12][0], points[3][1]];
  points[35] = [points[34][0] + ((1 / 4) * values.tu - 1), points[34][1]];
  points[36] = [
    points[35][0] - (0.5 * values.tu + 3) - (points["11A"][0] - points[11][0]),
    points[6][1],
  ];
  points[37] = [points[13][0], points[35][1]];
  points[38] = [points[34][0], points[7][1]];
  points[39] = [points[35][0] + 2, points[38][1]];
  points[40] = [
    points[39][0] - (values.hu / 2 + 2.5) - (points["11A"][0] - points[11][0]),
    points[4][1],
  ];
  points[41] = [points[37][0], points[4][1]];
  points[42] = [points[26][0], points[4][1]];

  let tuTakeAway = dist(points[36], points[6]) / 5; //TODO: Shorten sides 1.5 fix & darts with 1 / 3 and 2 / 3
  let huAddOn = dist(points[7], points[40]) / 2;

  points[43] = [points[11][0] - tuTakeAway, points[6][1] - 1];
  points["43A"] = [points["11A"][0] + tuTakeAway, points[6][1] - 1];
  points[44] = [points[11][0] + huAddOn, points[4][1]];
  points["44A"] = [points["11A"][0] - huAddOn, points[4][1]];
  points[45] = [points[44][0], points[8][1]];
  points["45A"] = [points["44A"][0], points[8][1]];

  points[48] = [points[13][0], points[8][1]];

  offset = dist(points[35], points[37]) / 2;

  points["24A"] = [points[24][0] + offset, points[24][1]];
  points["24B"] = [points[24][0] - offset, points[24][1]];

  offset = 0.5 * dist(points[39], points[41]);
  //TODO: Darts symmetrically and check 39 and 41
  points["42A"] = [points[42][0] + offset, points[42][0]];
  points["42B"] = [points[42][0] - offset, points[42][0]];

  points[46] = [points["42B"][0], points[8][1]];
  points[47] = [points["42A"][0], points[8][1]];

  points[49] = [points[10][0], points[6][1] - 0.5];
  points["49A"] = [points[10][0] + tuTakeAway / 2, points[6][1] - 0.5];
  points["49B"] = [points[10][0] - tuTakeAway / 2, points[6][1] - 0.5];
  points["50B"] = [points[6][0] + (1 / 3) * values.rb + 1, points[6][1]];
  points["50A"] = [points["50B"][0] + 2 * tuTakeAway, points[6][1]];
  points[50] = [(points["50B"][0] + points["50A"][0]) / 2, points[6][1]];
  points[51] = [points[50][0], points[15][1]];
  points[52] = [points[50][0], points[50][1] - 15];
  points[53] = [points[50][0], points[50][1] + 15];
  points[54] = [points[49][0], points[49][1] - 13];
  points[55] = [points[49][0], points[49][1] + 13];
  points[56] = [
    points[51][0],
    points[18][1] + 0.5 * dist(points[18], points[10]),
  ];
  points[57] = [points[19][0], points[56][1] - 0.75];
  points[58] = [points[19][0], points[56][1] + 0.75];

  return points;
};

let drawPatternBodice = function (doc, points) {
  let thin = 1;
  let thick = 6;
  let path = "";

  // Thin lines
  draw.drawLine(doc, points[1], points[5], thin);
  draw.drawLine(doc, points[1], points[17], thin);
  draw.drawLine(doc, points[15], points[16], thin);
  draw.drawLine(doc, points[17], points[55], thin);
  draw.drawLine(doc, points[20], points[21], thin);
  draw.drawLine(doc, points[2], points[11], thin);
  draw.drawLine(doc, points[36], points[35], thin);
  draw.drawLine(doc, points[13], points[2], thin);
  draw.drawLine(doc, points[37], points[3], thin);
  draw.drawLine(doc, points[40], points[41], thin);
  draw.drawLine(doc, points[5], points[48], thin);

  // Thick lines
  // BACK
  draw.drawLine(doc, points[8], points[6], thick);
  draw.drawLine(doc, points[6], points[1], thick);

  path = draw.getPath(
    points[1],
    [
      points[15][0] - (1 / 2) * (points[15][0] - points[1][0]),
      points[15][1] - (1 / 6) * (points[15][1] - points[16][1]),
    ],
    [
      points[15][0] - (1 / 2) * (points[15][0] - points[1][0]),
      points[15][1] - (1 / 6) * (points[15][1] - points[16][1]),
    ],
    points[16]
  );

  draw.drawPath(doc, path, thick);

  //draw.drawLine(doc, points[16], points[1], thick); // ARC
  draw.drawLine(doc, points[16], points[19], thick);

  path = draw.getPath(
    points[11],
    [points[21][0], points[11][1]],
    [points[21][0], points[11][1]],
    points[19]
  );

  draw.drawPath(doc, path, thick);

  draw.drawLine(doc, points[7], points[4], thick);
  draw.drawLine(doc, points[6], points[36], thick);
  draw.drawLine(doc, points[35], points[37], thick);
  draw.drawLine(doc, points[11], points[43], thick);

  path = draw.getPath(
    points[44],
    [points[44][0], points[44][1] - (1 / 2) * (points[44][1] - points[43][1])],
    points[43],
    points[43]
  );

  draw.drawPath(doc, path, thick);

  draw.drawLine(doc, points[44], points[45], thick);
  draw.drawLine(doc, points[8], points[45], thick);
  //draw.drawLine(doc, points[9], points[6], thick);
  //draw.drawLine(doc, points[9], points[1], thick);

  // Thick lines
  // FRONT
  draw.drawLine(doc, points[31], points[48], thick);
  draw.drawLine(doc, points["45A"], points[48], thick);
  draw.drawLine(doc, points["45A"], points["44A"], thick);

  path = draw.getPath(
    points["44A"],
    [
      points["44A"][0],
      points["44A"][1] - (1 / 2) * (points["44A"][1] - points["43A"][1]),
    ],
    points["43A"],
    points["43A"]
  );

  draw.drawPath(doc, path, thick);

  draw.drawLine(doc, points["43A"], points["11A"], thick);

  path = draw.getPath(
    points["11A"],
    [
      points[12][0] - (1 / 4) * (points[12][0] - points["11A"][0]),
      points[12][1],
    ],
    [points[12][0], points[12][1] - (1 / 4) * (points[12][1] - points[22][1])],
    points[22]
  );

  draw.drawPath(doc, path, thick);

  path = draw.getPath(
    points[22],
    [points[22][0], points[22][1] - (1 / 2) * (points[22][1] - points[27][1])],
    points[27],
    points[27]
  );

  draw.drawPath(doc, path, thick);

  draw.drawLine(doc, points[32], points[27], thick);
  draw.drawLine(doc, points[32], points[26], thick);
  draw.drawLine(doc, points[33], points[26], thick);
  draw.drawLine(doc, points[33], points[30], thick);

  path = draw.getPath(
    points[30],
    points[30],
    [points[30][0], points[31][1] - (1 / 3) * (points[31][1] - points[30][1])],
    points[31]
  );

  draw.drawPath(doc, path, thick);
  draw.drawLine(doc, points[26], points["24A"], thick);
  draw.drawLine(doc, points["42A"], points["24A"], thick);
  draw.drawLine(doc, points["42A"], points[47], thick);
  draw.drawLine(doc, points[26], points["24B"], thick);
  draw.drawLine(doc, points["42B"], points["24B"], thick);
  draw.drawLine(doc, points["42B"], points[46], thick);

  draw.drawLine(doc, points[51], points[53], thin);
  draw.drawLine(doc, points[52], points["50B"], thick);
  draw.drawLine(doc, points[53], points["50B"], thick);
  draw.drawLine(doc, points[53], points["50A"], thick);
  draw.drawLine(doc, points[52], points["50A"], thick);
  draw.drawLine(doc, points[54], points["49B"], thick);
  draw.drawLine(doc, points[55], points["49B"], thick);
  draw.drawLine(doc, points[55], points["49A"], thick);
  draw.drawLine(doc, points[54], points["49A"], thick);
  draw.drawLine(doc, points[56], points[57], thick);
  draw.drawLine(doc, points[56], points[58], thick);
  draw.drawLine(doc, points["49A"], points["49B"], thin);

  //draw.drawLine(doc, points[31], points[30], thick);
};

let printPoints = function (points) {
  // Print calculated values:
  console.log(" ------------------------------- ");
  console.log("CALCULATED VALUES: ");
  for (let point in points) {
    console.log(
      `Point ${point.toString().padEnd(3)}:     X: ${(
        Math.round(10 * points[point][0]) / 10
      )
        .toString()
        .padEnd(5)}-  Y: ${(Math.round(10 * points[point][1]) / 10)
        .toString()
        .padEnd(5)}`
    );
  }
  console.log(" ------------------------------- ");
};

let drawPointLabels = function (doc, points) {
  for (let point in points) {
    draw.drawPointLabel(
      doc,
      points[point],
      point +
        ", x: " +
        Math.round(points[point][0] - points[1][0]) +
        ", y: " +
        Math.round(points[point][1] - points[1][1])
    );
  }
};

module.exports = {
  getPointsPatternBodice,
  drawPatternBodice,
  printPoints,
  drawPointLabels,
};
