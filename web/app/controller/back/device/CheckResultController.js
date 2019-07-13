'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let CheckResultService = require('../../../service/device/CheckResultService');
let logger = require('../../../util/LoggerUtil').logger('CheckResultController.js');
/**
 * 页面
 */
module.exports.page = function () {
    let response = new Response();
    response.render('back/device/check/check');
    this.resolve(response);
};

 /**
 *  列表
 */
module.exports.list = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CheckResultService.list(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
 

/** 新建 接口*/
module.exports.create  = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CheckResultService.create(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 修改 接口*/
module.exports.update  = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CheckResultService.update(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 删除 接口*/
module.exports.delete  = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CheckResultService.delete(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 录入检查结果 接口*/
module.exports.result  = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CheckResultService.result(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
 