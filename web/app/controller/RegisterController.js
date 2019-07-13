'use strict';
let fs = require('fs');
let Response = require('../model/Response'),
    RestifyProxy = require('../util/RestifyProxy');
let EventProxy = require('eventproxy');
let StringUtil = require('../util/StringUtil');
let passport = require('passport');
let svgCaptcha = require('../util/svg-captcha');
let RegisterService = require('../service/RegisterService');
let logger = require('../util/LoggerUtil').logger('RegisterController');
let URI = {
    REGISTER_SEND_CODE: '/register/send/{0}/sms/code', // 发送手机验证码 mobile=手机号码 注册
    REGISTER_SAVE: '/register', // 保存注册信息
    CODE_CHECK: '/sms/validate', // 验证手机和验证码
    SAVE_NEW_PWD: '/users/retrieval/password' // 保存新密码
};

// 注册新用户页面
module.exports.registerPage = function () {
    let response = new Response();
    response.render('register');
    this.resolve(response);
};
// 企业认证页面
module.exports.identificationPage = function () {
    let response = new Response();
    response.render('identification');
    this.resolve(response);
};

/**
 * 保存注册信息
 * @returns {Promise.<void>}
 */
module.exports.registerSave =async function () {

    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await RegisterService.registerSave(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);

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

