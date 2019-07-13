'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let UnitService = require('../../../service/base/UnitService');
let logger = require('../../../util/LoggerUtil').logger('UnitController.js');
/**
 * 页面
 */
module.exports.unitPage = function () {
    let response = new Response();
    response.render('back/base/unit/unit');
    this.resolve(response);
};
/**
 * 列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await UnitService.getUnit(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



/** 新建货架*/
module.exports.insertUnit = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await UnitService.insertUnit(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 更新货架*/
module.exports.updateUnit = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await UnitService.updateUnit(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/** 删除货架*/
module.exports.deleteUnit = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await UnitService.deleteUnit(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};