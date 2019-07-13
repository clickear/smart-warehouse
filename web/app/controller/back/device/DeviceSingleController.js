'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let DeviceSingleService = require('../../../service/device/DeviceSingleService');
let logger = require('../../../util/LoggerUtil').logger('DeviceSingleController.js');
/**
 * 页面
 */
module.exports.page = function () {
    let response = new Response();
    response.render('back/device/device-single/device-single');
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
        let result = await DeviceSingleService.list(this, params);
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
        let result = await DeviceSingleService.create(this, params);
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
        let result = await DeviceSingleService.update(this, params);
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
        let result = await DeviceSingleService.delete(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
