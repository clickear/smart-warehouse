'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    LIST: '/bill/details/list',/* 单据——列表查询 */

    UPDATE: '/bill/details/update',/* 单据——列表查询 */
    DELETE: '/bill/details/delete',/* 单据——列表查询 */
    ACCEPT: '/bill/details/accept',/* 单据——列表查询 */
};

/** 单据查询——billMaster */
module.exports.list = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
}


/** 验收 */
module.exports.accept = function (thiz, params) {
    return baseService.get(thiz, URI.ACCEPT, params);
}




/** 更新 */
module.exports.update = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
}

/** 删除 */
module.exports.delete = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
}



