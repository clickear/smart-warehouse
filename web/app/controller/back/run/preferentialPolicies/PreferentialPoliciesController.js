'use strict';
let Response = require('../../../../model/Response');
let RestifyProxy = require('../../../../util/RestifyProxy');
let CustomPageBean = require('../../../../model/CustomPageBean');
let PoliciesService = require('../../../../service/PoliciesService');
let logger = require('../../../../util/LoggerUtil').logger('PreferentialPoliciesController.js');

/**
 * 优惠政策-页面
 */
module.exports.preferentialPoliciesPage = function () {
    let response = new Response();
    response.render('back/run/preferential-policies/preferential-policies');
    this.resolve(response);
};

/**
 * 优惠政策列表
 */
module.exports.policiesList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PoliciesService.getPolicies(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 创建新增发布优惠-页面
 */
module.exports.createOrModifyPage = function () {
    let response = new Response();
    response.render('back/run/preferential-policies/create-or-modify-discounts');
    this.resolve(response);
};


module.exports.createDiscounts = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PoliciesService.createDiscounts(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.modifyDiscountsById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PoliciesService.modifyDiscountsById(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.getDiscountsById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PoliciesService.getDiscountsById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.deleteDiscountsById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await PoliciesService.deleteDiscountsById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 优惠信息-详情
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/run/preferential-policies/detail-discounts');
    this.resolve(response);
};


/**
 * 再次编辑-页面
 */
module.exports.compileAgainPage = function () {
    let response = new Response();
    response.render('back/run/preferential-policies/compile-again');
    this.resolve(response);
};


