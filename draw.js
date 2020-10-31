let $ = function (cm) {
  return (cm * 842) / 29.7;
};

let drawLine = function (doc, point1, point2, width) {
  doc.moveTo($(point1[0]), $(point1[1]));
  doc.lineWidth(width);
  doc.lineTo($(point2[0]), $(point2[1]));
  doc.stroke();
};

let drawPointLabel = function (doc, point, label) {
  let dx = 3 * Math.random() + 0.5;
  let dy = 3 * Math.random() + 0.5;
  let textSize = 0.7;

  doc.moveTo($(point[0]), $(point[1]));
  doc.lineWidth(1);
  doc.lineTo($(point[0] + dx), $(point[1] - dy));
  doc.stroke("red");
  doc.fillColor("red");
  doc.fontSize($(textSize));
  doc.text(
    label,
    $(point[0] + dx + textSize / 3),
    $(point[1] - dy - textSize / 2)
  );
};

let drawPath = function (doc, path, width) {
  doc.lineWidth(width);
  doc.path(path);
  doc.stroke();
};

let getPath = function (point1, point2, point3, point4) {
  let path = `M ${$(point1[0])} ${$(point1[1])} C ${$(point2[0])} ${$(
    point2[1]
  )}, ${$(point3[0])} ${$(point3[1])}, ${$(point4[0])} ${$(point4[1])}`;
  return path;
};

module.exports = {
  drawLine,
  drawPointLabel,
  drawPath,
  getPath,
};
