'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    LIST: '/manage/pays/list',/* 单据——列表查询 */
    SAVE: '/manage/pays/insert',/* 保存 */
    DELETE: '/manage/pays/delete',/* 保存 */
    UPDATE: '/manage/pays/update',/* 保存 */
};

/** list*/
module.exports.list = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
}

/** 保存 */
module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}

/** 删除*/
module.exports.delete = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
}

/** 更新 */
module.exports.update = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
}

