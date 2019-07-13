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
    USERS: '/users',
    CREATE_USER: '/users',
    USER_DETAIL: '/users/{0}/info',
    MODIFY_USER: '/users/{0}',
    DELETE_USER: '/users/{0}',
    ENABLED_USER: '/users/{0}/enable',
    DISABLED_USER: '/users/{0}/disable'
};

/**
 * 获取-用户列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getUsers = function (thiz, params) {
    return baseService.get(thiz, URI.USERS, params);
};


/**
 * 通过用户ID，获取用户详情
 * @param thiz
 * @param userId 用户ID
 */
module.exports.getUserByUserId = function (thiz, userId) {
    return baseService.get(thiz, StringUtil.format(URI.USER_DETAIL, userId));
};

/**
 * 创建账号
 * @param thiz
 * @param params
 *
 {
  "companyId": 0,
  "confirmPassword": "string",
  "email": "string",
  "gender": 0,
  "mobile": "string",
  "password": "string",
  "roleId": 0,
  "userName": "string"
}
 */
module.exports.createUser = function (thiz, params) {
    return baseService.post(thiz, URI.CREATE_USER, params);
};

/**
 * 通过用户ID，修改用户信息
 * @param thiz
 * @param params
 */
module.exports.modifyUserByUserId = function (thiz, params) {
    return baseService.put(thiz, StringUtil.format(URI.MODIFY_USER, params.userId), params);
};

/**
 * 通过用户ID，删除用户
 * @param thiz
 * @param userId 用户ID
 * @returns {*}
 */
module.exports.deleteUserByUserId = function (thiz, userId) {
    return baseService.del(thiz, StringUtil.format(URI.DELETE_USER, userId));
};

/**
 * 通用用户ID，启动账户
 * @param thiz
 * @param userId 用户ID
 */
module.exports.enabledUserByUserId = function (thiz, userId) {
    return baseService.put(thiz, StringUtil.format(URI.ENABLED_USER, userId));
};

/**
 * 通用用户ID，禁用账户
 * @param thiz
 * @param userId 用户ID
 */
module.exports.disabledUserByUserId = function (thiz, userId) {
    return baseService.put(thiz, StringUtil.format(URI.DISABLED_USER, userId));
};



