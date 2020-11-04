const electron = require("electron");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const express = require("express");
const { app, BrowserWindow, Menu, MenuItem } = electron;
const url = require("url");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

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
  //win.webContents.openDevTools();
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

let createBodice = function () {
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

let connectToDB = async function () {
  const uri =
    "mongodb+srv://admin:cusvLuOSsnq7kATe@cluster0.d9ufi.mongodb.net/sewing-pattern?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // client.connect((err) => {
  //   const collection = client.db("sewing_pattern").collection("measurements");
  //   // perform actions on the collection object
  //   console.log("Collection: ", collection);
  //   client.close();
  // });

  try {
    await client.connect();

    //await listDatabases(client);
    const db = client.db("sewing_pattern");
    console.log("DB: ", db);
    const measurements = db.collection("measurements");
    const results = await measurements
      .find(ObjectId("5f9e998e477b8f84a38d4cb2"))
      .toArray();

    console.log("Results: ", results);
    // await measurements.insertOne({
    //   a: 45,
    //   b: 78,
    // });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Generate",
        accelerator: process.platform == "darwin" ? "Cmd + G" : "Ctrl + G",
        click() {
          createBodice();
          //connectToDB().catch(console.error);
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
