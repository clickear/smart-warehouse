'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let ItemMasterService = require('../../../service/base/ItemMasterService');
let logger = require('../../../util/LoggerUtil').logger('ItemMasterController.js');
/**
 * 货主页面
 */
module.exports.itemMasterPage = function () {
    let response = new Response();
    response.render('back/base/item-master/item-master');
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
        let result = await ItemMasterService.getList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/** 新建接口*/
module.exports.create = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemMasterService.create(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 修改接口*/
module.exports.update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemMasterService.update(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 删除接口*/
module.exports.delete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemMasterService.delete(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
