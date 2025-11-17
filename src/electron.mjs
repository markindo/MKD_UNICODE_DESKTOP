// src/electron.js
import { app, BrowserWindow, ipcMain, dialog, Menu, session } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { Notification } from "electron";
import {
  getPrinterController,
  addPrinterController,
  updatePrinterController,
  deletePrinterController
} from './backend/controller/printerController.mjs';
import { uploadData } from './backend/service/upload.mjs';
import { Serialisasi } from './backend/service/Serialisasi.mjs';
import { updatePrinterStatus } from './backend/model/PrinterModel.mjs';
import { getLogByDate } from './backend/model/LogModel.mjs';
import { downloadSession } from './backend/service/DownloadSession.mjs';

let intervakCounter = 0
let dataPrinter = [];
let dataPrinterOld = []
let intv = null
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = !app.isPackaged;
const out = {}
const flag = {
  send: 0
}
let login = true
let win;
//const printer = [{ id: "Vj1", ip: "192.168.103.148", port: 3001 },
//{ id: "Vj2", ip: "192.168.103.148", port: 3002 }]
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'assets/MARKINDO.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });
  //  win.webContents.openDevTools();// OPEN CONSOLE DI FE
  //  win.loadURL('http://localhost:5173');
  Menu.setApplicationMenu(null);
  if (isDev) {
    win.webContents.openDevTools();
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
  //  win.loadURL(isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../build/index.html')}`);

}




app.whenReady().then(() => {
  downloadSession(session)
  createWindow();
  //runFirst()
  const UPLOAD_DIR = path.join(__dirname, "../uploads");

  ipcMain.handle("save-file", async (event, fileInfo) => {
    const printer = dataPrinter.find(printer => printer.id === fileInfo.idPrinter);
    printer?.client?.systemCounter ? printer.client.systemCounter = 0 : printer.system_counter = 0
    printer.system_counter = 0
    new Notification({
      title: "Reading Data",
      body: "Please wait...",
    }).show();
    const status = await uploadData(fileInfo);
    printer.max_message = status.max_message

    return status;
  });

  ipcMain.handle("getPrinter", async () => {
    let data = await getPrinterController();
    return data;
  });

  //koneksi printer
  ipcMain.handle("connect", (_, data) => {
    const printer = dataPrinter.find(printer => printer.id === data);
    console.log("Connecting to printer:", printer);
    printer.client.connect();
  });

  ipcMain.handle("startPrint", (_, data) => {
    const printer = dataPrinter.find(printer => printer.id === data.id);
    console.log("Start Print to printer:", data);
    printer.client.startPrint();
  });

  ipcMain.handle("stopPrint", (_, data) => {
    const printer = dataPrinter.find(printer => printer.id === data.id);
    console.log("Stop Print to printer:", data);
    printer.client.stopPrint();
  });

  ipcMain.handle("addPrinter", async (event, printer) => {
    const add = await addPrinterController(printer);
    const all = await getPrinterController();
    const notInArr = all.filter(item => !dataPrinter.some(printer => printer.id === item.id));
    if (notInArr.length === 0) {
      dialog.showErrorBox("Error", "Printer already exists or invalid data.");
      return;
    }
    notInArr[0].client = new Serialisasi(notInArr[0].ip_address, notInArr[0].port, notInArr[0].port_ack, notInArr[0].id, 0, 0, 0, notInArr[0].product_sum)
    dataPrinter.push(notInArr[0]);
    console.log("notInArr", notInArr);
    dialog.showMessageBox({
      type: "info",
      title: "Success",
      message: "Printer added successfully.",
    });

  });

  ipcMain.handle("editPrinter", async (event, printer) => {
    const index = dataPrinter.findIndex(p => p.id === printer.id)
    const data = dataPrinter[index]
    console.log("Product sum", printer.product_sum)
    dataPrinter[index].client = new Serialisasi(printer.ip_address, printer.port, printer.port_ack, printer.id, data.client.systemCounter, data.client.productCounter, data.client.markingCounter, printer.product_sum, data.client.counter)
    return await updatePrinterController(printer);
  });

  ipcMain.handle("deletePrinter", async (event, id) => {
    return await deletePrinterController(id);
  })

  ipcMain.handle("disconnect", async (event, id) => {
    const printer = dataPrinter.find(printer => printer.id === id);
    printer.client.stop();
  })
  ipcMain.handle("getLog", async (event, printer) => {
    const data = await getLogByDate(printer)
    console.log("data", data)
    return data
  })

  ipcMain.handle("showDialog", async (event, data) => {
    await dialog.showMessageBox({
      type: data.type || "info",
      title: data.title || "Download Selesai",
      message: data.msg || "File berhasil diunduh!",
      buttons: ["OK"]
    });
  });



  handlePrinterBackend()
  async function handlePrinterBackend() {
    dataPrinter = await getPrinterController();
    dataPrinter.forEach((data, index) => {
      console.log("firsst", data)
      dataPrinter[index].client = new Serialisasi(data.ip_address, data.port, data.port_ack, data.id, data.system_counter, data.product_counter, data.marking_counter, data.product_sum, data.counter)
    })
    return dataPrinter;
  }



  app.on('window-all-closed', () => {
    clearInterval(intv);
    savePrinterStatus()
    if (process.platform !== 'darwin') app.quit();
  });
});





//kirim status ke frontend tiap 1 detik
setTimeout(() => {
  intv = setInterval(() => {
    win.webContents.send("status", JSON.stringify(dataPrinter))

    if (intervakCounter >= 50) {
      savePrinterStatus()
      console.log("Save to Database")
      intervakCounter = 0;
      return;
    }
    intervakCounter++
  }, 300)
}, 5000)


function savePrinterStatus() {
  dataPrinter.forEach((data) => {
    const dataSave = {
      message: data.message,
      status: data.status,
      systemCounter: parseInt(data?.client?.systemCounter ? data.client.systemCounter : data.system_counter),
      productCounter: parseInt(data?.client?.productCounter ? data.client.productCounter : data.product_counter),
      markingCounter: parseInt(data?.client?.markingCounter ? data.client.markingCounter : 0),
      counter: parseInt(data?.client?.counter ? data.client.counter : data.counter),

      id: data.id

    }
    updatePrinterStatus(dataSave)
  })
}

