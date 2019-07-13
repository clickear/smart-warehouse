'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let InventoryService = require('../../../service/report/InventoryService');
let logger = require('../../../util/LoggerUtil').logger('InventoryController.js');
/**
 * 库存查询页面
 */
module.exports.inventoryPage = function () {
    let response = new Response();
    response.render('back/report/inventory/inventory');
    this.resolve(response);
};

/**
 * 批次库存查询页面
 */
module.exports.batchInventoryPage = function () {
    let response = new Response();
    response.render('back/report/inventory/batchInventory');
    this.resolve(response);
};

/**
 * 库存预警查询页面
 */
module.exports.batchInventoryPage = function () {
    let response = new Response();
    response.render('back/report/inventory/InventoryWanning');
    this.resolve(response);
};
/**
 * 库存列表
 */
module.exports.inventoryList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InventoryService.getInventory(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 库存列表
 */
module.exports.inventoryBatchList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InventoryService.inventoryBatchList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 库存列表
 */
module.exports.inventoryWarningList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InventoryService.inventoryWarningList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



/**
 * 库存列表
 */
module.exports.inventoryReportList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await InventoryService.inventoryReportList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

