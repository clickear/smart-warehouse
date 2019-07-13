'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let CheckDetailService = require('../../../service/device/CheckDetailService');
let logger = require('../../../util/LoggerUtil').logger('CheckDetailController.js');


 /**
 *  列表
 */
module.exports.list = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await CheckDetailService.list(this, params);
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
        let result = await CheckDetailService.create(this, params);
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
        let result = await CheckDetailService.update(this, params);
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
        let result = await CheckDetailService.delete(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
 