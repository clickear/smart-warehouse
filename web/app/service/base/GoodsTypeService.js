'use strict';
/**
 * @type {*}
 */
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    List: '/item/types/list',/* 查看物料列表 */
    SAVE:'/item/types/insert',
    UPDATE:'/item/types/update',
    DELETE:'/item/types/delete',

};

/**
 * 获取-物料种类页面
 * @param thiz
 * @returns {Promise}
 */
module.exports.getList = function (thiz, params) {
    return baseService.get(thiz, URI.List, params);
};

/**新建*/
module.exports.createType  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};
/**更新*/
module.exports.update  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};
/**删除*/
module.exports.delete  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

