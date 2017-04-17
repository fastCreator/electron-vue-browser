'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`


function favoritesEvent() {
  var fa = require('./favorites');

  ipcMain.on('get-favorites', (event, arg) => {
    fa.getAll().then((data) => {
      event.sender.send('favorites', data);
    });
  });

  ipcMain.on('add-favorites', (event, arg) => {
    fa.setOne(arg.path, arg.key, arg.value).then(function () {
      event.sender.send('favorites-add-success', arg);
    });
  })

  ipcMain.on('delete-favorites', (event, arg) => {
    fa.deleteOne(arg.path, arg.key).then(function () {
      event.sender.send('favorites-delete-success', arg);
    });
  })

}


function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    frame: true
  })

  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // eslint-disable-next-line no-console
  console.log('mainWindow opened');

  mainWindow.webContents.openDevTools();

}

function creatSocket() {
  const WebSocket = require('ws');
  const dealMessage = require('./dealMessage');
  const wss = new WebSocket.Server({ port: 8080 });
  wss.on('connection', function connection(ws) {
    ws.on('message', function(message) {
      dealMessage(ws, message)
    });
  });
}


function ready() {
  createWindow();
  favoritesEvent();
  creatSocket();
}

app.on('ready', ready)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
