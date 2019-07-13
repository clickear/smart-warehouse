'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let PlletService = require('../../../service/base/PlletService');
let logger = require('../../../util/LoggerUtil').logger('PlletController.js');
/**
 * 页面
 */
module.exports.plletPage = function () {
    let response = new Response();
    response.render('back/base/pllet/pllet');
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
        let result = await PlletService.getPllet(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 列表
 */
module.exports.batch = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PlletService.batch(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/** 新建货架*/
module.exports.insertPllet = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PlletService.insertPllet(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 更新货架*/
module.exports.updatePllet = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PlletService.updatePllet(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/** 删除货架*/
module.exports.deletePllet = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PlletService.deletePllet(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};