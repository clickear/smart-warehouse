/*
 'use strict';

 /!**
 * @type {*}
 *!/

 let underscore = require('underscore');
 let RestifyProxy = require('../util/RestifyProxy');
 let StringUtil = require('../util/StringUtil');
 let Constant = require('../model/Constant');
 let baseService = require('./BaseService');
 const URI = {
 Policies: '/preferential/informations',

 };

 /!**
 * 获取-用户列表
 * @param thiz
 * @returns {Promise}
 *!/
 module.exports.getPolicies = function (thiz, params) {
 return baseService.get(thiz, URI.Policies, params);
 };*/
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
    DOCUMENTLIST: '/help/contents',
    CATEGORY:'/help/categorys',
    CRETE: '/help/contents/addHelpContent',
    MODIFY: '/help/contents/updateHelpContent',
    DELETE: '/help/contents/deleteHelpContentById/{0}',
    DETAIL: '/help/contents/getHelpContentById/{0}'
};

module.exports.getPolicies = function (thiz, params) {
    return baseService.get(thiz, URI.DOCUMENTLIST, params);
};

module.exports.getcategoryList = function (thiz, params) {
    return baseService.get(thiz, URI.CATEGORY, params);
};

module.exports.createDiscounts = function (thiz, params) {
    return baseService.post(thiz, URI.CRETE, params);
};

module.exports.modifyDiscountsById = function (thiz, params) {
    return baseService.put(thiz, URI.MODIFY, params);
};


module.exports.getDiscountsById = function (thiz, id) {
    return baseService.get(thiz, StringUtil.format(URI.DETAIL, id));
};

module.exports.deleteDiscountsById = function (thiz, id) {
    return baseService.del(thiz, StringUtil.format(URI.DELETE, id));
};









