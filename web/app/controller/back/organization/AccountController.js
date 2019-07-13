'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let userInfoService = require('../../../service/UserInfoService');
let logger = require('../../../util/LoggerUtil').logger('AccountController.js');

/**
 * 账户管理-页面
 */
module.exports.accountPage = function () {
    let response = new Response();
    response.render('back/organization/account/account');
    this.resolve(response);
};


/**
 * 账户列表
 */
module.exports.accountList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.getUsers(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 客户-创建账户-页面
 */
module.exports.clientCreateAccountPage = function () {
    let response = new Response();
    response.render('back/organization/account/client-create-account');
    this.resolve(response);
};


/**
 * 客户-创建账户-保存
 */
module.exports.clientCreateAccount = async function () {
    let req = this.req;
    let user = req.user;
    let params = req.body;
    params.companyId = user.companyId; // 默认当前登录用户的公司ID
    params.roleId = user.roleId; // 默认当前登录用户的角色
    let response = new Response();
    try {
        let result = await userInfoService.createUser(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 平台-创建账户-页面
 */
module.exports.platformCreateAccountPage = function () {
    let response = new Response();
    response.render('back/organization/account/platform-create-account');
    this.resolve(response);
};


/**
 * 平台-创建账户-保存
 */
module.exports.platformCreateAccount = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.createUser(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 账户信息-详情
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/organization/account/account-detail', {account: {phone: 15320897908, realName: '雨夜'}});
    this.resolve(response);
};

/**
 * 通过用户ID，获取用户详情
 */
module.exports.getUserByUserId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.getUserByUserId(this, params.userId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 账户信息-修改-页面
 */
module.exports.modifyPage = function () {
    let response = new Response();
    response.render('back/organization/account/modify-account');
    this.resolve(response);
};

/**
 * 通过用户ID，修改用户信息
 */
module.exports.modifyUserByUserId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.modifyUserByUserId(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 通过用户ID，删除用户
 */
module.exports.deleteUserByUserId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.deleteUserByUserId(this, params.userId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 启动账户
 */
module.exports.enabledUserByUserId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.enabledUserByUserId(this, params.userId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 禁用账户
 */
module.exports.disabledUserByUserId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await userInfoService.disabledUserByUserId(this, params.userId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



























