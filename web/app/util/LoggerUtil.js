'use strict';
/**
 * 日志记录 - 工具类
 */
var log4js = require('log4js'),
    path = require('path'),
    conf = require('../../config').app,
    dirname = conf.rootPath,
    level = conf.log4js.level,
    output = conf.log4js.output;

log4js.configure({
    replaceConsole: true,
    appenders: [
        {type: 'console'},
        {
            type: 'file',
            filename: path.join(dirname, output),
            maxLogSize: 10240,
            catagory: 'normal'
        }
    ]
});

exports.logger = function (name) {
    var logger = log4js.getLogger(name);
    logger.setLevel(level || 'debug');
    return logger;
};
