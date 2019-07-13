'use strict';
let Response = require('../../model/Response');
let CustomPageBean = require('../../model/CustomPageBean');


let logger = require('../../util/LoggerUtil').logger('HomepageController.js');

/**
 * 首页页面
 */
module.exports.homepage = function () {
    let response = new Response();
    response.render('back/homepage/homepage');
    this.resolve(response);
};




/**
 * 账户列表
 */
module.exports.getBacklogListPaging = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await backlogService.getBacklogListPaging(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
module.exports.confirmReceipt = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await backlogService.confirmReceipt(this, params.orderNo);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
module.exports.readReceipt = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await backlogService.readReceipt(this, params.readId);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


