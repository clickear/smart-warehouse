'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let ShelfService = require('../../../service/base/ShelfService');
let logger = require('../../../util/LoggerUtil').logger('ShelfController.js');
/**
 * 货架页面
 */
module.exports.shelfPage = function () {
    let response = new Response();
    response.render('back/base/shelf/shelf');
    this.resolve(response);
};
/**
 * 货架列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ShelfService.getShelf(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 货架列表  下拉框使用
 */
module.exports.List2 = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ShelfService.getShelf(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 新建货架页面
 */
module.exports.addPage = function () {
    let response = new Response();
    response.render('back/base/shelf/create-shelf');
    this.resolve(response);
};

/** 新建货架*/
module.exports.createShelf = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ShelfService.createShelf(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/** 更新货架*/
module.exports.updateShelf = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ShelfService.updateShelf(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/** 删除货架*/
module.exports.deleteShelf = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ShelfService.deleteShelf(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};