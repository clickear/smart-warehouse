'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let GoodsTypeService = require('../../../service/base/GoodsTypeService');
let logger = require('../../../util/LoggerUtil').logger('ItemController.js');
/**
 * 页面
 */
module.exports.Page = function () {
    let response = new Response();
    response.render('back/base/item-type/item-type');
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
        let result = await GoodsTypeService.getList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 列表(下拉框使用)
 */
module.exports.List2 = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await GoodsTypeService.getList(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};




/**
 * 新建物料页面
 */
module.exports.typeAddPage = function () {
    let response = new Response();
    response.render('back/base/item/create-item');
    this.resolve(response);
};

/** 新建 */
module.exports.createType = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await GoodsTypeService.createType(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**  更新*/
module.exports.update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await GoodsTypeService.update(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**  删除*/
module.exports.delete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await GoodsTypeService.delete(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


