'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let CellService = require('../../../service/base/CellService');
let logger = require('../../../util/LoggerUtil').logger('CellController.js');
/**
 * 货位页面
 */
module.exports.cellPage = function () {
    let response = new Response();
    response.render('back/base/cell/cell');
    this.resolve(response);
};
/**
 * 货位列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CellService.getCell(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 货位列表
 */
module.exports.List2 = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CellService.getCell(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 退板详情页
 */
module.exports.detailReturnPage = function () {
    let response = new Response();
    response.render('back/rent/return/detail-return');
    this.resolve(response);
};

/**
 * 新增货位页面
 */
module.exports.addPage = function () {
    let response = new Response();
    response.render('back/base/task/create-task');
    this.resolve(response);
};

/**
 * 批量新增货位页面
 */
module.exports.addAllPage = function () {
    let response = new Response();
    response.render('back/base/task/create-task-all');
    this.resolve(response);
};

/** 新建货位*/
module.exports.createCell = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CellService.createCell(this, params.orderNo);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 批量货位*/
module.exports.createCellAll = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CellService.createCellAll(this, params.orderNo);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 修改*/
module.exports.update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CellService.update(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

