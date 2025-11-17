// preload.js
const { contextBridge, ipcRenderer } = require('electron');

//import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('be', {
  getPrinters: () => ipcRenderer.invoke('getPrinter'),
  addPrinter: (printer) => ipcRenderer.invoke('addPrinter', printer),
  editPrinter: (printer) => ipcRenderer.invoke('editPrinter', printer),
  deletePrinter: (id) => ipcRenderer.invoke('deletePrinter', id),

  connect: (printer) => ipcRenderer.invoke('connect', printer),
  disconnect: (printer) => ipcRenderer.invoke('disconnect', printer),

  saveFile: (fileInfo) => ipcRenderer.invoke("save-file", fileInfo),
  startPrint: (printer) => ipcRenderer.invoke('startPrint', printer),
  stopPrint: (printer) => ipcRenderer.invoke('stopPrint', printer),

  //untuk export xls
  getLog: (printer) => ipcRenderer.invoke('getLog', printer),

  ///unttuk status
  onStatus: (callback) => ipcRenderer.on("status", (event, msg) => callback(msg)),

  //untuk notif
  showDialog: (msg) => ipcRenderer.invoke('showDialog', msg),

  //login 
  // login: (data) => ipcRenderer.invoke('login', data),
  // getLogin: (data) => ipcRenderer.invoke('getLogin', data),
  // openFile: () => ipcRenderer.invoke('open-file-dialog'),
  // sendConnect: (msg) => ipcRenderer.send('connect', msg),
  // onStatus: (callback) => ipcRenderer.invoke('status', callback),
  // onStatus: (callback) => ipcRenderer.on("status", (event, msg) => callback(msg)),
  // statusPrint: (data) => ipcRenderer.invoke('statusPrint', data),
  // // IPC calls backend
  // connect: (printer) => ipcRenderer.invoke('connect', printer),
  // disconnect: (printer) => ipcRenderer.invoke('disconnect', printer),
  // sendMessage: (message) => ipcRenderer.invoke('sendMessage', message),
  // selectJob: (job) => ipcRenderer.invoke('selectJob', job),
  // startPrint: (data) => ipcRenderer.invoke('startPrint', data),
  // stopPrint: (data) => ipcRenderer.invoke('stopPrint', data),

  // // IPC calls for printer management
  // getPrinters: () => ipcRenderer.invoke('getPrinter'),

  // editPrinter: (printer) => ipcRenderer.invoke('editPrinter', printer),
  // deletePrinter: (id) => ipcRenderer.invoke('deletePrinter', id),

  // // IPC calls for job management
  // getJobs: () => ipcRenderer.invoke('getJobs'),
  // addJob: (job) => ipcRenderer.invoke('addJob', job),
  // editJob: (job) => ipcRenderer.invoke('editJob', job),
  // deleteJob: (id) => ipcRenderer.invoke('deleteJob', id),
});