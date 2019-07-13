'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let logger = require('../../../util/LoggerUtil').logger('SupplierController.js');
let companyService = require('../../../service/CompanyService');
let companyStorageService = require('../../../service/CompanyStorageService');
let Constant = require('../../../model/Constant');

// 供应商管理 --------------------------------------------------------------------------------------------------------
/**
 * 供应商管理-页面
 */
module.exports.clientPage = function () {
    let response = new Response();
    response.render('back/organization/supplier/supplier');
    this.resolve(response);
};


/**
 * 供应商-详情页面
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/organization/supplier/supplier-detail');
    this.resolve(response);
};


/**
 * 新增-供应商-页面
 */
module.exports.createSupplierPage = function () {
    let response = new Response();
    response.render('back/organization/supplier/create-supplier');
    this.resolve(response);
};


/**
 * 修改-页面
 */
module.exports.modifyPage = function () {
    let response = new Response();
    response.render('back/organization/supplier/modify-supplier');
    this.resolve(response);
};
















