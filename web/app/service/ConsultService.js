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
    CREATE: '/consults/{0}',
    MSGLIST:'/consults/getConsultList',
    CUSTOMERSERVICE:'/consults/getConsultList',
    CUSTOMERSERVICEINFO:'/consults/getConsultInfoById/{0}',
    SENDREPLY:'/consults/updateConsult',
};

/**
 * 新增-咨询
 * @param thiz
 * @param params
    {
      "consultContent": "string",
      "consultUserMobile": "string",
      "consultUserName": "string",
    }
 */
module.exports.sendMsg = function (thiz, params) {
    return baseService.post(thiz, StringUtil.format(URI.CREATE, params));
};
module.exports.getMsgList  = function (thiz,params) {
    return baseService.get(thiz,URI.MSGLIST,params);
};
/**
 * 获取-咨询列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getcustomerServiceList = function (thiz, params) {
    return baseService.get(thiz, URI.CUSTOMERSERVICE, params);
};
module.exports.getCustomerServiceInfo = function (thiz, id) {
    return baseService.get(thiz, StringUtil.format(URI.CUSTOMERSERVICEINFO, id));
};
module.exports.sendReply = function (thiz, params) {
    return baseService.put(thiz, URI.SENDREPLY, params);
};











