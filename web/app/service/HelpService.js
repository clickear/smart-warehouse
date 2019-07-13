let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    HELPDATA:'/help/categorys'
};
/**
 * 获取-帮助中心数据
 * @param thiz
 * @returns {Promise}
 */
module.exports.getHelpData = function (thiz, params) {
    return baseService.get(thiz, URI.HELPDATA, params);
};