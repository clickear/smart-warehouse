'use strict';
let config = require('../../config');
let project = config.app.project;
let authenticationWhiteList = config.authenticationWhiteList;
let authorityWhiteList = config.authorityWhiteList;
let _ = require('lodash/collection');
let REG_PROJECT = new RegExp('^' + project, 'i');
const CacheUtil = require('../util/CacheUtil');
const logger = require('../util/LoggerUtil').logger('Authority.js');
const Constant = require('../model/Constant');

/**
 * 检查认证白名单
 * 检查 url 是否在白名单内
 * @param url 目标路径
 * @return{boolean}
 * @private
 */
let _checkAuthenticationUrlInWhites = function (url) {
    let sUrl = url.replace(REG_PROJECT, '');
    // 检查是否是白名单项
    let flag = _.includes(authenticationWhiteList, sUrl);
    // 开发模式-解决 webpack-dev-middleware 插件引起的问题
    if (process.env.NODE_ENV !== 'production') {
        if (/.*\.(png|jpe?g|gif|svg|js|css|ico|json)$/.test(sUrl)) {
            flag = true;
        }
    }
    return flag;
};

/**
 * 检查权限白名单
 * 检查 url 是否在白名单内
 * @param url 目标路径
 * @return{boolean}
 * @private
 */
let _checkAuthorityUrlInWhites = function (url) {
    let sUrl = url.replace(REG_PROJECT, '');
    // 检查是否是白名单项
    let flag = _.includes(authorityWhiteList, sUrl);
    // 开发模式-解决 webpack-dev-middleware 插件引起的问题
    if (process.env.NODE_ENV !== 'production') {
        if (/.*\.(png|jpe?g|gif|svg|js|css|ico|json)$/.test(sUrl)) {
            flag = true;
        }
    }
    return flag;
};


/**
 * 检测用户是否登录 - 中间件
 */
module.exports.checkLogin = function (req, res, next) {
    let path = req.path,
        isXHR = req.xhr;
    let isLegalUrl = _checkAuthenticationUrlInWhites(path);
    let isLogon = req.isAuthenticated();
    if (isLogon || isLegalUrl) {
        next();
    } else {
        let fakeLoginPath = `${project}/login`;
        let rData = null;
        if (!!parseInt(req.headers['non-guest'])) {
            rData = {msg: '登录超时，请重新登录！', url: `/login`};
        } else {
            rData = {msg: '登录超时，请重新登录！', url: fakeLoginPath};
        }
        isXHR && res.status(401).send(rData);
        !isXHR && res.redirect(fakeLoginPath);
    }
};


/**
 * 检测用户是否有权限 - 中间件
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<void>}
 */
module.exports.checkAccess = async function (req, res, next) {
    let path = req.path;
    let user = req.user || {};
    let urls = user.urls || [];
    let url = path.replace(REG_PROJECT, '');
    // 检查是否是白名单项
    let flag = _checkAuthorityUrlInWhites(path);
    if (flag || _.includes(urls, `/back${url}`)) {
        next();
    } else {
        logger.warn(`${url}  没有权限，请联系管理员... `);
        res.status(403).render('error', {code: 403});
    }
};

/**
 * 权限检查(控制按钮)
 * @param appName 应用名称
 * @param authorityCode 权限CODE
 * @returns {boolean}
 */
module.exports.checkAuthority = function (authorityCode) {
    let user = this.user;
    let permission = user.permission || [];
    try {
        return _.includes(permission, authorityCode);
    } catch (error) {
        logger.warn(`没有在 redis 里配置权限 `);
    }
    return false;
};
