/**
 * Created by Administrator on 2017/10/17.
 */
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
    MESSAGEBACKLOG: '/back/messages/page',/* 查看消息待办列表 */
    MESSAGE_DETAIL:'/back/messages/info/{0}' ,/* 查看消息待办详情 */
    READ:'/back/messages/{0}',/* 未读变更 */

};

/**
 * 获取-消息待办列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getMessageBacklogList = function (thiz, params) {
    return baseService.get(thiz, URI.MESSAGEBACKLOG, params);
};
/** 获取待办事项详情*/
module.exports.getmessageById  = function (thiz, businessNo) {
    return baseService.get(thiz, StringUtil.format(URI.MESSAGE_DETAIL, businessNo));
};
/** 获取变更未读*/
module.exports.readReceipt = function (thiz, id) {
    return baseService.put(thiz, StringUtil.format(URI.READ, id));
};
