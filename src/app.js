const electron = require("electron");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const express = require("express");
const { app, BrowserWindow, Menu, MenuItem } = electron;
const url = require("url");
const path = require("path");

//const app = express();

const measures = require("./measures");
const patterns = require("./patterns");

let win;

function createWindow() {
  win = new BrowserWindow({
    //width: 800,
    //height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("./src/index.html");
  win.webContents.openDevTools();
}

function createMenu() {
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function appSetup() {
  createWindow();
  createMenu();
}

app.whenReady().then(appSetup);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    appSetup();
  }
});

let createPattern = function () {
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
  //doc.pipe(res);
  doc.pipe(fs.createWriteStream("file.pdf"));
  doc.end();
};

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Generate",
        accelerator: process.platform == "darwin" ? "Cmd + G" : "Ctrl + G",
        click() {
          createPattern();
        },
      },
      {
        label: "Refresh",
        accelerator: process.platform == "darwin" ? "Cmd + R" : "Ctrl + R",
        click() {
          win.reload();
        },
      },
      {
        label: "Quit",
        accelerator: process.platform == "darwin" ? "Cmd + Q" : "Ctrl + Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];
