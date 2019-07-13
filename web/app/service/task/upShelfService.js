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
    LIST:'/cell/items/noUpShelf/list',

};

/**
 * 获取-未上架数量
 * @param thiz
 * @returns {Promise}
 */
module.exports.getList = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
};

