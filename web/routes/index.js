'use strict';
var fs = require('fs'),
    util = require('util'),
    logger = require('../app/util/LoggerUtil').logger('routes'),
    dir = __dirname;
const ROUTERS = {};
/**
 * 自动扫描routes文件夹
 */
var autoScanner = function (path, ROUTERS) {
    var fileList = fs.readdirSync(path) || [];
    var key, reg = /\.+\w+$/;
    fileList.forEach(function (fileName) {
        if (fs.lstatSync([path, fileName].join('/')).isDirectory()) {
            ROUTERS[fileName] = {};
            autoScanner([path, fileName].join('/'), ROUTERS[fileName]);
        } else {
            if (fileName !== 'index.js') {
                key = fileName.replace(reg, '');
                ROUTERS[key] = require([path, fileName].join('/'));
            }
        }
    });
};
let start = Date.now();
logger.debug('Scanning routes...');
autoScanner(dir, ROUTERS);
let end = Date.now();
logger.debug('Scan routes done! It takes [%d]ms', end - start);
module.exports = ROUTERS;
