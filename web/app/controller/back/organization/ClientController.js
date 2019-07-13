'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let logger = require('../../../util/LoggerUtil').logger('ClientController.js');
let companyService = require('../../../service/CompanyService');
let companyStorageService = require('../../../service/CompanyStorageService');
let Constant = require('../../../model/Constant');
// 客户管理 --------------------------------------------------------------------------------------------------------
/**
 * 客户管理-页面
 */
module.exports.clientPage = function () {
    let response = new Response();
    response.render('back/organization/client/client');
    this.resolve(response);
};


/**
 * 客户-详情页面
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/organization/client/client-detail');
    this.resolve(response);
};


/**
 * 新增-客户-页面
 */
module.exports.createClientPage = function () {
    let response = new Response();
    response.render('back/organization/client/create-client');
    this.resolve(response);
};


/**
 * 修改-页面
 */
module.exports.modifyPage = function () {
    let response = new Response();
    response.render('back/organization/client/modify-client');
    this.resolve(response);
};


/**
 * 仓储点管理 --------------------------------------------------------------------------------------------------------
 */
module.exports.storagePage = function () {
    let response = new Response();
    response.render('back/organization/client/storage/storage');
    this.resolve(response);
};

/**
 * 仓储点-详情页面
 */
module.exports.storageDetailPage = function () {
    let response = new Response();
    response.render('back/organization/client/storage/storage-detail');
    this.resolve(response);
};


/**
 * 新增-仓储点-页面
 */
module.exports.createStoragePage = function () {
    let response = new Response();
    response.render('back/organization/client/storage/create-storage');
    this.resolve(response);
};



/**
 * 修改-仓储点-页面
 */
module.exports.modifyStoragePage = function () {
    let response = new Response();
    response.render('back/organization/client/storage/modify-storage');
    this.resolve(response);
};




















