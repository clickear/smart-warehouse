'use strict';
let fs = require('fs');
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let logger = require('../../../util/LoggerUtil').logger('OrganizationRouter.js');
let companyService = require('../../../service/CompanyService');
let companyStorageService = require('../../../service/CompanyStorageService');
let Constant = require('../../../model/Constant');

/**
 * 组织机构-页面
 */
module.exports.organizationPage = function () {
    let response = new Response();
    response.render('back/organization/organization');
    this.resolve(response);
};

/**
 * 获取机构（公司）列表
 * @returns {Promise.<void>}
 */
module.exports.getCompanyList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await companyService.getCompanyList(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 获取-公司列表（分页）
 * @returns {Promise.<void>}
 */
module.exports.getCompanyListPaging = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await companyService.getCompanyListPaging(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 获取-机构（公司）详情，通过公司ID
 * @returns {Promise.<void>}
 */
module.exports.getCompanyByCompanyId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await companyService.getCompanyByCompanyId(this, params.companyId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 创建-公司（机构）
 * @returns {Promise.<void>}
 */
module.exports.createCompany = async function () {
    let req = this.req;
    let files = req.files;
    let params = req.body;
    for (let key in files) {
        params[key] = {
            value: fs.createReadStream(files[key].path),
            options: {
                filename: files[key].name,
                contentType: files[key].type
            }
        };
    }
    let response = new Response();
    try {
        let result = await companyService.createCompany(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 修改-公司（机构）
 * @returns {Promise.<void>}
 */
module.exports.modifyCompanyByCompanyId = async function () {
    let req = this.req;
    let files = req.files;
    let params = req.body;
    for (let key in files) {
        params[key] = {
            value: fs.createReadStream(files[key].path),
            options: {
                filename: files[key].name,
                contentType: files[key].type
            }
        };
    }
    let response = new Response();
    try {
        let result = await companyService.modifyCompanyByCompanyId(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 获取-（客户管理、代理商管理）仓储点
 */
module.exports.getStorageListPaging = async function () {
    let req = this.req;
    let params = req.body;
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
 * 创建-（平台网点、仓储点）
 * @returns {Promise.<void>}
 */
module.exports.createStorage = async function () {
    let req = this.req;
    let params = req.body;
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
 * 修改-（平台网点、仓储点）
 */
module.exports.modifyStorageByStorageId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await companyStorageService.modifyStorageByStorageId(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 获取-（平台网点、仓储点）
 */
module.exports.getStorageByStorageId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await companyStorageService.getStorageByStorageId(this, params.storageId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 获取-（平台网点、仓储点）
 */
module.exports.deleteStorageByStorageId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await companyStorageService.deleteStorageByStorageId(this, params.storageId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};





