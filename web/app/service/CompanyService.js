'use strict';

let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    COMPANY_LIST_PAGING: '/company',
    COMPANY_LIST: '/company/list',
    COMPANY_DETAIL: '/company/{0}',
    CREATE_COMPANY: '/company',
    MODIFY_COMPANY: '/company/{0}'
};

/**
 * 获取-公司列表（可输入名称查询）
 * @param thiz
 * @returns {Promise}
 */
module.exports.getCompanyList = function (thiz, params) {
    return baseService.get(thiz, URI.COMPANY_LIST, params);
};

/**
 * 获取-公司列表
 * @param thiz
 * @param params{companyType:'企业类型' ...} 企业类型：-1=托盘运营商；1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；5=POI；
 */
module.exports.getCompanyListPaging = function (thiz, params) {
    return baseService.get(thiz, URI.COMPANY_LIST_PAGING, params);
};


/**
 * 获取-机构（公司）详情，通过公司ID
 * @param thiz
 * @param companyId 公司ID
 */
module.exports.getCompanyByCompanyId = function (thiz, companyId) {
    return baseService.get(thiz, StringUtil.format(URI.COMPANY_DETAIL, companyId));
};


/**
 * 创建-机构（公司）
 * @param thiz
 * @param params
 */
module.exports.createCompany = function (thiz, params) {
    return baseService.uploadFile(thiz, URI.CREATE_COMPANY, params);
};

/**
 * 修改-机构（公司）
 * @param thiz
 * @param params
 */
module.exports.modifyCompanyByCompanyId = function (thiz, params) {
    return baseService.uploadFile(thiz, StringUtil.format(URI.MODIFY_COMPANY, params.companyId), params);
};





