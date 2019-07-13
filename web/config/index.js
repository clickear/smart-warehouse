'use strict';

var configure = {
    app: null,
    passport: null,
    session: null,
    docs: null,
    SDKs: null,
    authorityWhiteList: null,
    authenticationWhiteList: null
};

/**
 * 获取应用程序配置
 * @returns {*}
 */
var getAppConfig = function (configure) {
    var config, dest;
    if (process && process.env && process.env.NODE_ENV) {
        dest = ['./env/', process.env.NODE_ENV].join('');
        try {
            config = require(dest);
            console.info('Current configuration: %s', dest);
        } catch (e) {
            console.error('File is not found. %s', dest);
            throw e;
        }
    } else {
        dest = './env/development';
        // dest = './env/production';
        config = require(dest);
        console.info('NODE_ENV is not specified. Use [%s] as default configuration', dest);
    }
    configure.app = config;
};
/**
 * 获取passport配置
 * @returns {exports}
 */
var getPassportConfig = function (configure) {
    configure.passport = require('./strategy/passport');
};

/**
 * 获取session配置
 * @returns {exports}
 */
var getSessionConfig = function (configure) {
    configure.session = require('./strategy/session');
};

/**
 * 获取权限配置（白名单）
 * @returns {exports}
 */
var getAuthorityConfig = function (configure) {
    configure.authorityWhiteList = require('./authority').whiteList;
};

/**
 * 获取认证配置（白名单）
 * @param configure
 */
var getAuthenticationConfig = function (configure) {
    configure.authenticationWhiteList = require('./authentication').whiteList;
};

var loadConfigure = function (configure) {
    getAppConfig(configure);
    getAuthorityConfig(configure);
    getAuthenticationConfig(configure);
    // getDocsConfig(configure);
    // getSDKsConfig(configure);
    process.nextTick(function () {
        getPassportConfig(configure);
        getSessionConfig(configure);
    });
};

loadConfigure(configure);

module.exports = configure;
