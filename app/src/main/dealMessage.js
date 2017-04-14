var fa = require('./favorites');
const { BrowserWindow } = require('electron')

module.exports = function (ws, msg) {
    var data = JSON.parse(msg);
    switch (data.key) {
        case 'favorites-get':
            favoritesGet(ws);
            break;
        case 'extension-get':
            extensionGet(ws);
            break;
        case 'extension-add':
            extensionAdd(ws,data.value);
            break;
        case 'extension-remove':
            extensionRemove(ws,data.value);
            break;
    }
}

function favoritesGet(ws) {
    fa.getAll().then((data) => {
        ws.send(JSON.stringify(data));
    });
}
function extensionGet(ws) {
    var tools = BrowserWindow.getDevToolsExtensions();
    ws.send(JSON.stringify({ key: 'extension-get', value: tools }));
}
function extensionAdd(ws,path) {
    BrowserWindow.addDevToolsExtension(path); 
}

function extensionRemove(ws,name) {
    console.log(name);
    BrowserWindow.removeDevToolsExtension(name); 
}