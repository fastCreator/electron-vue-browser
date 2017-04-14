const fs = require('fs');
const filePath = require('path').join(__dirname, './test.json');

function setOne(path, key, value) {
    return new Promise(function (resolve, reject) {
        getAll().then(function (data) {
            if (!data) {
                data = {}
            }
            if (!data[path]) {
                data[path] = {};
            }
            data[path][key] = value
            write(data).then(() => {
                resolve(data);
            });
        });
    });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) throw (err);
            resolve(data ? JSON.parse(data) : '');
        });
    });
}

function deleteOne(path, key) {
    return new Promise(function (resolve, reject) {
        getAll().then(function (data) {
            if (!data || !data[path]) {
                reject('删除文件失败');
            }
            delete data[path][key];
            write(data).then(() => {
                resolve(data);
            });
        });
    });
}


function write(json) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, JSON.stringify(json), 'utf8', function (err) {
            if (err) throw (err);
            resolve();
        });
    });
}

module.exports = {
    getAll: getAll,
    setOne: setOne,
    deleteOne: deleteOne
}

