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
    LIST: '/client/manages/list',/* 查看租赁退板列表 */
    SAVE:'/client/manages/insert',
    UPDATE:'/client/manages/update',
    DELETE:'/client/manages/delete',


};

/** 列表 */
module.exports.getClient = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
}
/**

/**新建 */
module.exports.createClient  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};

/**更新 */
module.exports.updateClient  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

/**删除 */
module.exports.deleteClient  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};
