'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let logger = require('../../../util/LoggerUtil').logger('PlatformBranchController.js');
let companyStorageService = require('../../../service/CompanyStorageService');

// 平台网点管理 --------------------------------------------------------------------------------------------------------
/**
 * 平台网点管理-页面
 */
module.exports.platformBranchPage = function () {
    let response = new Response();
    response.render('back/organization/platform-branch/platform-branch');
    this.resolve(response);
};
/**获取-平台网点管理-列表*/
module.exports.getStorageListPaging = async function () {
    let req = this.req;
    let user = req.user;
    let params = req.body;
    params.companyId = user.companyId;
    let response = new Response();
    try {
        let result = await companyStorageService.getStorageListPaging(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 新增-平台网点-页面
 */
module.exports.createPlatformBranchPage = function () {
    let response = new Response();
    response.render('back/organization/platform-branch/create-platform-branch');
    this.resolve(response);
};
/** 新增-平台网点-保存 */
module.exports.createPlatformBranch = async function () {
    let req = this.req;
    let user = req.user;
    let params = req.body;
    params.companyId = user.companyId;
    let response = new Response();
    try {
        let result = await companyStorageService.createStorage(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 平台网点-详情页面
 */
module.exports.detailPlatformBranchPage = function () {
    let response = new Response();
    response.render('back/organization/platform-branch/platform-branch-detail');
    this.resolve(response);
};
module.exports.detailPlatformBranch = async function () {
    let req = this.req;
    let user = req.user;
    let params = req.body;
    params.companyId = user.companyId;
    let response = new Response();
    try {
        let result = await companyStorageService.detailStorage(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 修改-页面
 */
module.exports.modifyPlatformBranchPage = function () {
    let response = new Response();
    response.render('back/organization/platform-branch/modify-platform-branch');
    this.resolve(response);
};
module.exports.modifyPlatformBranch = async function () {
    let req = this.req;
    let user = req.user;
    let params = req.body;
    params.companyId = user.companyId;
    let response = new Response();
    try {
        let result = await companyStorageService.modifyStorage(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};