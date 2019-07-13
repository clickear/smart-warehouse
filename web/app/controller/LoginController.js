'use strict';
let fs = require('fs');
let Response = require('../model/Response'),
    RestifyProxy = require('../util/RestifyProxy');
let EventProxy = require('eventproxy');
let StringUtil = require('../util/StringUtil');
let passport = require('passport');
let svgCaptcha = require('../util/svg-captcha');
let logger = require('../util/LoggerUtil').logger('LoginController');
let URI = {
    FORGET_SEND_CODE: '/users/send/{0}/sms/code', // 发送手机验证码 mobile=手机号码 找回密码 mima
    FORGET_SEND_EMAIL: '/users/send/{0}/mail/code', // 发送邮箱验证码 email=电子邮箱 找回密码 mima
    REGISTER_SEND_CODE: '/register/send/{0}/sms/code', // 发送手机验证码 mobile=手机号码 注册
    REGISTER_SAVE: '/register', // 保存注册信息
    CODE_CHECK: '/sms/validate', // 验证手机和验证码
    CODE_EMAIL:'/email/validate',//验证邮箱和验证码
    SAVE_NEW_PWD: '/users/retrieval/password' // 保存新密码
};
const CAPTCHA_OPTION = {
    size: 4,
    ignoreChars: [0, 'o', 'l', 1, 'i', 'q', 'p'].join(''),
    width: 100,
    height: 34,
    fontSize: 28,
    noise: 3
    // color: false,
    // background: '#AAA'
};

/**
 * 显示主页面
 */
module.exports.loginPage = function () {
    let response = new Response();
    response.render('login');
    this.resolve(response);
};

/**
 * 登陆验证
 */
module.exports.login = function () {
    let thiz = this;
    passport.authenticate('local', function (result) {
        if (result.err || !result.user) { // 登录失败
            let errMsg = result.err ? (result.info || '服务器内部错误，请稍后再试！') : '用户名或密码错误！';
            logger.error(result);
            thiz.resolve(new Response('send', {code: result.errCode || 401, msg: errMsg}));
        } else { // 登录成功
            thiz.req.login(result.user, function (err) {
                let rData = {};
                if (err) {
                    logger.error('登录发生异常！%s', err.message);
                    rData = {code: 401, msg: '服务器内部错误！'};
                } else {
                    var respData = {
                        authorizedUrls: result.user.authorizedUrls,
                        roleDTO: result.user.roleDTO
                    };
                    rData = {code: 200, url: '/back', user: respData};
                }
                thiz.resolve(new Response('send', rData));
            });
        }
    }).call(null, thiz.req, thiz.res, thiz.next);
};

// 找回密码页面
module.exports.forgetPwdPage = function () {
    let response = new Response();
    response.render('retrieve-password');
    this.resolve(response);
};
// 设置新密码页面
module.exports.reinstallPage = function () {
    let response = new Response();
    response.render('reinstall-password');
    this.resolve(response);
};

/**
 * 获取验证码（数字、字符、带干扰线）
 */
module.exports.captcha = function () {
    let thiz = this,
        req = this.req,
        ep = EventProxy.create(),
        resp = new Response(),
        captcha = svgCaptcha.create(CAPTCHA_OPTION);

    ep.on('response', (captcha) => {
        req.session.captcha = captcha.text;
        req.session.save();
        resp.setHeaders('Content-Type', 'image/svg+xml');
        resp.send(new Buffer(captcha.data));
        thiz.resolve(resp);
    });
    try {
        req.session.reload(function (err) {
            if (err) {
                logger.error(err.message);
                req.session.regenerate((nErr) => {
                    ep.emit('response', captcha);
                });
            } else {
                ep.emit('response', captcha);
            }
        });
    } catch (error) {
        logger.error('生成图片验证码失败，redis可能连接错误，请检查。');
        logger.error(error);
    }


};
/**
 * 发送手机验证码-忘记密码
 */
module.exports.retrievePasswordSend = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    let mobile = req.getParam('mobile');
    restify.setUrl(StringUtil.format(URI.FORGET_SEND_CODE, mobile))
        .setParameter(params)
        .post(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};
/**
 * 发送邮件验证码-忘记密码
 */
module.exports.retrieveEmail = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    let email = req.getParam('email');
    restify.setUrl(StringUtil.format(URI.FORGET_SEND_EMAIL, email))
        .setParameter(params)
        .post(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};
/**
 * 发送手机验证码-注册
 */
module.exports.registerSend = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    let mobile = req.getParam('mobile');
    restify.setUrl(StringUtil.format(URI.REGISTER_SEND_CODE, mobile))
        .setParameter(params)
        .post(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};
/**
 * 验证手机和验证码
 */
module.exports.retrievePasswordCheck = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    restify.setUrl(URI.CODE_CHECK)
        .setParameter(params)
        .post(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};
/**
 * 验证邮箱和验证码
 */
module.exports.retrievePasswordEmail = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    restify.setUrl(URI.CODE_EMAIL)
        .setParameter(params)
        .post(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};

/**
 * 保存新密码
 */
module.exports.reinstallSave = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    restify.setUrl(URI.SAVE_NEW_PWD)
        .setParameter(params)
        .put(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};
