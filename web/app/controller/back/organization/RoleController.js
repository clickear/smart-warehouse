'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let roleService = require('../../../service/RoleService');
let logger = require('../../../util/LoggerUtil').logger('RoleController.js');

/**
 * 账户管理-页面
 */
module.exports.rolePage = function () {
    let response = new Response();
    response.render('back/organization/role/role');
    this.resolve(response);
};

/**
 * 角色列表（不分页）
 */
module.exports.getRoleList = async function () {
    let response = new Response();
    try {
        let result = await roleService.getRoleList(this);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 角色数据
 */
module.exports.getPRoleData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await roleService.getRoleData(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 角色列表
 */
module.exports.roleList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await roleService.getRoles(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 获取角色详情，通过角色ID
 */
module.exports.getRoleDetailByRoleId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await roleService.getRoleDetailByRoleId(this, params.roleId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 获取角色详情，通过允许的角色ID
 */
module.exports.getRoleDetailByPermissionRoleId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await roleService.getRoleDetailByPermissionRoleId(this, params.roleId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 角色信息-修改-页面
 */
module.exports.modifyRolePage = function () {
    let response = new Response();
    response.render('back/organization/role/modify-role', {role: {phone: 15320897908, realName: '雨夜'}});
    this.resolve(response);
};

/**
 * 角色信息-修改
 */
module.exports.modifyRoleByRoleId = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await roleService.modifyRoleByRoleId(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



/**
 * 角色信息-新增-页面
 */
module.exports.createRolePage = function () {
    let response = new Response();
    response.render('back/organization/role/create-role', {role: {phone: 15320897908, realName: '雨夜'}});
    this.resolve(response);
};


/**
 * 角色信息-新增
 */
module.exports.createRole = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await roleService.createRole(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


























