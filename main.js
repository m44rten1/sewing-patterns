const fs = require("fs");
const PDFDocument = require("pdfkit");
const express = require("express");
const app = express();

const measures = require("./measures");
const patterns = require("./patterns");

app.get("/", (req, res) => {
  const doc = new PDFDocument({
    layout: "portrait",
    size: "2A0",
  });

  let values = measures.getValues();
  measures.printValues(values);
  let pointsBodice = patterns.getPointsPatternBodice(values);
  patterns.printPoints(pointsBodice);
  patterns.drawPatternBodice(doc, pointsBodice);
  patterns.drawPointLabels(doc, pointsBodice);
  doc.pipe(res);
  doc.end();
});

app.listen(3000);
