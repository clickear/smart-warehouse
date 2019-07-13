'use strict';
let Response = require('../../model/Response');
let RestifyProxy = require('../../util/RestifyProxy');
let CustomPageBean = require('../../model/CustomPageBean');
let ConsultService = require('../../service/ConsultService');
let logger = require('../../util/LoggerUtil').logger('CustomerServiceController.js');
/**
 * 咨询管理-页面
 */
module.exports.customerServicePage = function () {
    let response = new Response();
    response.render('back/customer/customer-service');
    this.resolve(response);
};
/**
 * 咨询管理-列表
 */
module.exports.customerServiceList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ConsultService.getcustomerServiceList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 咨询管理-详情页面
 */
module.exports.customerServiceinfoPage = function () {
    let response = new Response();
    response.render('back/customer/detail-customer');
    this.resolve(response);
};
/**
 * 通过咨询ID，获取咨询详情
 */
module.exports.customerServiceInfo = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ConsultService.getCustomerServiceInfo(this, params.consultId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
//列表历史消息
module.exports.customerServiceMsgList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ConsultService.getMsgList(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
//发送消息
module.exports.customerServiceSendMsg =async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ConsultService.sendMsg(this, params.consultContent);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.customerServiceSendReply =async function() {
    console.log('in');
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ConsultService.sendReply(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
}