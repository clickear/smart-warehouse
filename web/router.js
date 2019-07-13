'use strict';
let helmet = require('helmet'); // 内容安全策略
let xss = require('xss-clean');
let _ = require('underscore');
let LoadshObjectUtil = require('lodash/object');
let util = require('util');
let globalRouter = require('express').Router();
let router = require('./routes');
let config = require('./config');
let Constant = require('./app/model/Constant');
let Authority = require('./app/controller/Authority');
let project = config.app.project;
let xssSettings = require('./config/resources/xss-settings');
let REG_PROJECT = new RegExp('^' + project, 'i');
var csp = function () {
    if (process.env.NODE_ENV === 'production') {
        return helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ['\'self\'', '*.baidu.com', '*.amap.com'],
                    connectSrc: ['\'self\''],
                    scriptSrc: ['\'self\'', '*.baidu.com', '*.amap.com', '*.bdimg.com', '\'unsafe-eval\'', '\'unsafe-inline\''],
                    imgSrc: ['\'self\'', '*.amap.com', '*.baidu.com', '*.bdimg.com', 'data:'],
                    objectSrc: ['\'none\''],
                    styleSrc: ['\'self\'', '\'unsafe-inline\'']
                }
            }
        });
    }
    return (req, res, next) => {
        next();
    };
};

var _xss = function (req, res, next) {
    let _url = req.path.replace(REG_PROJECT, '');
    let _whiteList = xssSettings.whiteList || [];
    let len = _whiteList.length;
    for (let i = 0; i < len; i++) {
        if (_.isRegExp(_whiteList[i])) {
            if (_whiteList[i].test(_url)) {
                return next();
            }
        } else if (_whiteList[i] === _url) {
            return next();
        }
    }
    return xss()(req, res, next);
};

var monkeyPatch = function (req, res, next) {
    let _redirect = res.redirect;
    res.redirect = function () {
        let args = arguments;
        let pos = null;
        if (args.length) {
            if (util.isNumber(args[0])) {
                pos = 1;
            } else {
                pos = 0;
            }
            if (/^\/+/.test(args[pos])) {
                args[pos] = [project, args[pos]].join('');
            }
        }
        _redirect.apply(this, args);
    };
    next();
};

/**
 * 为Express注册全局对象
 */
var registerExpressVariable = function (app) {
    app.locals.Constant = Constant;
    app.locals.project = project;
    app.locals.checkAuthority = Authority.checkAuthority;
    app.locals.staticServer = `${config.app.webservice.url}${config.app.webservice.ver}`;
};

/**
 * 组装参数
 */
var assembleParameter = function (req, res, next) {
    var params = LoadshObjectUtil.extend({}, req.body, req.query, req.param);
    req.parameters = params;
    req.getParam = function (key) {
        return this.parameters[key];
    };
    next();
};

// 注册需要的数据
var registerData = function (req, res, next) {
    res.locals.user = req.user || {};
    next();
};

module.exports = function (app) {
    //后端-登录/权限验证
    // app.use(project + '/back', Authority.checkLogin);
   /* app.use(project + '/back', Authority.checkLogin, Authority.checkAccess);*/
    app.use(
        project,
       // csp(),
        monkeyPatch
    );
    app.use(project,
        _xss,
        assembleParameter,
        registerData,
        globalRouter);

    globalRouter.use('/', router.HomeRouter);
    globalRouter.use('/login', router.LoginRouter);
    globalRouter.use('/register', router.RegisterRouter);
    globalRouter.use('/logout', router.LogoutRouter);
    globalRouter.use('/back', router.back.BackRouter);
    registerExpressVariable(app);
};
