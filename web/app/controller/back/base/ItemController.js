'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let ItemService = require('../../../service/base/ItemService');
let logger = require('../../../util/LoggerUtil').logger('ItemController.js');
/**
 * 物料页面
 */
module.exports.itemPage = function () {
    let response = new Response();
    response.render('back/base/item/item');
    this.resolve(response);
};
/**
 * 物料列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.getItem(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 物料列表
 */
module.exports.List2 = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.getItem(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



/**
 * 物料批次列表
 */
module.exports.ItemBatchList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.ItemBatchList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 新建物料页面
 */
module.exports.itemAddPage = function () {
    let response = new Response();
    response.render('back/base/item/create-item');
    this.resolve(response);
};

/** 新建物料*/
module.exports.createItem = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.createItem(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 修改物料*/
module.exports.updateItem = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.updateItem(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 删除物料*/
module.exports.deleteItem = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.deleteItem(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 批次列表*/
module.exports.batch = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ItemService.batch(this, params);

        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};






