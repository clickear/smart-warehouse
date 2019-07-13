'use strict';
var json2csv = require('json2csv'),
    nodeExcel = require('excel-export'),
    StatusCode = require('../model/StatusCode'),
    DateUtil = require('./DateUtil'),
    fs = require('fs'),
    request = require('request');


var getContentDisposition = function (userAgent, filename) {
    let disposition;
    let suffix = filename.match(/.[\w|\W]$/);
    let index = suffix.index;
    // 加上系统时间
    filename = [filename.substring(0, index), '_', DateUtil.date2String(Date.now(), 'YYYYMMDDHHmmss'), suffix[0]].join('');

    if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) {
        disposition = 'attachment; filename=' + encodeURIComponent(filename);
    } else if (userAgent.indexOf('firefox') >= 0) {
        disposition = 'attachment; filename*="utf8\'\'' + encodeURIComponent(filename) + '"'
    } else {
        disposition = 'attachment; filename=' + new Buffer(filename).toString('binary');
    }

    return disposition;
};

/**
 * 导出CSV文件
 * @param req
 * @param res
 * @param fileName 文件名
 * @param data{Object} 数据(JSON格式)
 * @param fields{Array} 对应JSON数据中的key
 * @param fieldNames 需要显示的字段名称，对应于fields
 * @return {String}
 */
var exportCSV = function (req, res, fileName, data, fields, fieldNames) {
    res.set({
        'Content-Type': 'application/octet-stream;charset=utf-8',
        'Content-Disposition': getContentDisposition((req.headers['user-agent'] || '').toLowerCase(), fileName),
        'Pragma': 'no-cache',
        'Expires': 0
    });
    var option = {
        fields: fields,
        fieldNames: fieldNames,
        data: data,
        quotes: '"'
    };
    var str = json2csv(option);
    var buffer = Buffer.concat([new Buffer('\xEF\xBB\xBF', 'binary'), new Buffer(str)]);
    var content = Buffer.prototype.toString.apply(buffer);
    res.send(content);
};

/**
 * 导出xls文件
 * @param req
 * @param res
 * @param fileName
 * @param title
 * @param data
 */
var exportXLS = function (req, res, fileName, title, data) {
    var conf = {};
    conf.cols = [];
    conf.cols.push({caption: '序列', type: 'string'});
    for (var field in title) {
        conf.cols.push({caption: title[field], type: 'string'});
    }
    if (data && data.length > 0) {
        conf.rows = [];
        data.forEach(function (item, index) { //加载列表
            var rowData = [];
            rowData.push((index + 1) + '');
            for (var field in title) {
                if (field in item) {
                    rowData.push(item[field].toString());
                } else {
                    rowData.push('');
                }
            }
            conf.rows.push(rowData);
        });
    }
    var str = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", getContentDisposition((req.headers['user-agent'] || '').toLowerCase(), fileName));
    res.end(str, 'binary');
};

module.exports = {
    exportCsv: exportCSV,
    exportExcel: exportXLS
};