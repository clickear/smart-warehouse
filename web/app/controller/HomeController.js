'use strict';
let Response = require('../model/Response');
let consultService = require('../service/ConsultService');
let policiesService = require('../service/PoliciesService.js');
let logger = require('../util/LoggerUtil').logger('HomeController.js');
/**
 * 首页
 */
module.exports.homePage = function () {
    let response = new Response();
    response.render('index');
    this.resolve(response);
};

/**
 * 产品介绍
 */
module.exports.productPage = function () {
    let response = new Response();
    response.render('product');
    this.resolve(response);
};

/**
 * 优惠介绍
 */
module.exports.discountsPage = async function () {
    let response = new Response();
    let resultData = {discounts: [], generalize: []};
    try {
        let result1 = await policiesService.getPolicies(this, {pageNum: 1, pageSize: 5, infoType: 0});
        let result2 = await policiesService.getPolicies(this, {pageNum: 1, pageSize: 5, infoType: 1});
        if (result1.code === 200) {
            resultData.discounts = result1.data.list;
        }
        if (result2.code === 200) {
            resultData.generalize = result2.data.list;
        }
    } catch (error) {
        logger.error(error);
    }
    response.render('discounts', resultData);
    this.resolve(response);
};


module.exports.discountsDetailPage = async function () {
    let req = this.req;
    let response = new Response();
    let resultData = {detail: {}};
    try {
        let result = await policiesService.getDiscountsById(this, req.params.id);
        if (result.code === 200) {
            resultData.detail = result.data;
        }
    } catch (error) {
        logger.error(error);
    }
    response.render('discounts-detail', resultData);
    this.resolve(response);
};