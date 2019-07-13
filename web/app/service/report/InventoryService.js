'use strict';
/**
 * @type {*}
 */
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    INVENTORY: '/inventorys/list',/* 查看租赁退板列表 */
    INVENTORY_BATCH:'/inventorys/batch/list',
    INVENTORY_WARNING:'/inventorys/warning/list',
    INVENTORY_REPORT:'/inventory/reports/list',


};

/**
 * 获取-库存列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getInventory = function (thiz, params) {
    return baseService.get(thiz, URI.INVENTORY, params);
};

/**
 * 获取-库存列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.inventoryBatchList = function (thiz, params) {
    return baseService.get(thiz, URI.INVENTORY_BATCH, params);
};


/**
 * 获取-库存列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.inventoryWarningList = function (thiz, params) {
    return baseService.get(thiz, URI.INVENTORY_WARNING, params);
};


/**
 * 获取-报表
 * @param thiz
 * @returns {Promise}
 */
module.exports.inventoryReportList = function (thiz, params) {
    return baseService.get(thiz, URI.INVENTORY_REPORT, params);
};



