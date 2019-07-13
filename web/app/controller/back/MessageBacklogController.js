'use strict';
let Response = require('../../model/Response');
let RestifyProxy = require('../../util/RestifyProxy');
let CustomPageBean = require('../../model/CustomPageBean');
let MessageBacklogService = require('../../service/MessageBacklogService');
let logger = require('../../util/LoggerUtil').logger('MessageBacklogController.js');

/**
 * 消息待办-页面
 */
module.exports.messageBacklogPage = function () {
    let response = new Response();
    response.render('back/message/message-info');
    this.resolve(response);
};
/**
 * 消息待办列表
 */

module.exports.messageBacklogList  = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await MessageBacklogService.getMessageBacklogList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 消息待办-详情
 */
module.exports.messageInfoPage = function () {
    let response = new Response();
    response.render('back/message/detail-message');
    this.resolve(response);
};
/**
 * 通过业务单号，获取消息待办详情
 */
module.exports.getmessageData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await MessageBacklogService.getmessageById(this, params.businessNo);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
//未读切换
module.exports.readReceipt = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await MessageBacklogService.readReceipt(this, params.id);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};