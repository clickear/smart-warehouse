'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let WarehouseService = require('../../../service/base/WarehouseService');
let logger = require('../../../util/LoggerUtil').logger('WarehouseController.js');
/**
 * 仓库页面
 */
module.exports.warehousePage = function () {
    let response = new Response();
    response.render('back/base/warehouse/warehouse');
    this.resolve(response);
};
/**
 * 仓库列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await WarehouseService.getWare(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 新建仓库页面
 */
module.exports.wareAddPage = function () {
    let response = new Response();
    response.render('back/base/warehouse/create-ware');
    this.resolve(response);
};

/** 新建仓库接口*/
module.exports.createWare = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await WarehouseService.createWare(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 修改仓库接口*/
module.exports.updateWare = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await WarehouseService.updateWare(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 删除仓库接口*/
module.exports.deleteWare = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await WarehouseService.deleteWare(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
