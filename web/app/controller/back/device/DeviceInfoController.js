'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let DeviceInfoService = require('../../../service/device/DeviceInfoService');
let logger = require('../../../util/LoggerUtil').logger('DeviceInfoController.js');
/**
 * 页面
 */
module.exports.page = function () {
    let response = new Response();
    response.render('back/device/device-info/device-info');
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
        let result = await DeviceInfoService.list(this, params);
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
        let result = await DeviceInfoService.create(this, params);
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
        let result = await DeviceInfoService.update(this, params);
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
        let result = await DeviceInfoService.delete(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
 