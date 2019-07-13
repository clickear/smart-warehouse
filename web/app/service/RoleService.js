'use strict';

/**
 * @type {*}
 */

let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    ROLES: '/roles',
    ROLE_DETAIL: '/roles/{0}',
    ROLE_DETAIL_PERMISSION: '/roles/{0}/permission',
    MODIFY_ROLE: '/roles/{0}',
    ROLE_NAME_LIST: '/roles/list',
    CREATE_ROLE: '/roles'
};


/**
 * 获取角色列表（不分页）
 * @param thiz
 * @returns {Promise}
 */
module.exports.getRoleList = function (thiz) {
    return baseService.get(thiz, URI.ROLE_NAME_LIST);
};

/**
 * 获取角色数据
 * @param thiz
 * @returns {Promise}
 */
module.exports.getRoleData = function (thiz, params) {
    return baseService.get(thiz, URI.ROLE_NAME_LIST, params);
};

/**
 * 获取角色列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getRoles = function (thiz, params) {
    return baseService.get(thiz, URI.ROLES, params);
};


/**
 * 通过角色ID获取角色详情
 * @param thiz
 * @param roleId 角色ID
 * @returns {Promise}
 */
module.exports.getRoleDetailByRoleId = function (thiz, roleId) {
    let url = StringUtil.format(URI.ROLE_DETAIL, roleId);
    return baseService.get(thiz, url);
};

/**
 * 通过角色ID获取允许的角色详情
 * @param thiz
 * @param roleId 角色ID
 * @returns {Promise}
 */
module.exports.getRoleDetailByPermissionRoleId = function (thiz, roleId) {
    let url = StringUtil.format(URI.ROLE_DETAIL_PERMISSION, roleId);
    return baseService.get(thiz, url);
};


/**
 * 修改角色信息及权限
 * @param thiz
 * @param params
 * {
    roleId: '',
    roleName: '',
    roleDescribe: '',
    permissions: [
        {
             "objectId": 0, // 角色ID
             "objectType": "role",
             "resourceId": 0 // 权限ID
        }
    ]
}
 * @returns {Promise}
 */
module.exports.modifyRoleByRoleId = function (thiz, params) {
    let url = StringUtil.format(URI.MODIFY_ROLE, params.roleId);
    return baseService.put(thiz, url, params);
};
/**
 * 新增角色信息及权限
 * @param thiz
 * @param params
 * {
    roleId: '',
    roleName: '',
    roleDescribe: '',
    permissions: [
        {
             "objectId": 0, // 角色ID
             "objectType": "role",
             "resourceId": 0 // 权限ID
        }
    ]
}
 * @returns {Promise}
 */
module.exports.createRole = function (thiz, params) {
    return baseService.post(thiz, URI.CREATE_ROLE, params);
};



