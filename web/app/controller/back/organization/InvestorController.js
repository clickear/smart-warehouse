'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');

// 投资商管理 --------------------------------------------------------------------------------------------------------
/**
 * 投资商管理-页面
 */
module.exports.investorPage = function () {
    let response = new Response();
    response.render('back/organization/investor/investor');
    this.resolve(response);
};


/**
 * 投资商-详情页面
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/organization/investor/investor-detail');
    this.resolve(response);
};


/**
 * 新增-投资商-页面
 */
module.exports.createInvestorPage = function () {
    let response = new Response();
    response.render('back/organization/investor/create-investor');
    this.resolve(response);
};


/**
 * 修改-页面
 */
module.exports.modifyPage = function () {
    let response = new Response();
    response.render('back/organization/investor/modify-investor');
    this.resolve(response);
};
















