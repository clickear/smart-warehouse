'use strict';
let fs = require('fs');
let Response = require('../../model/Response');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let UserInfo = require('../../model/back/member/UserInfo');
let URI = {
    USER_INFO: '/users/{0}/info',
    MODIFY_MEMBER: '/users/info',
    UPDATE_PWD: '/users/password',
    GET_USER_INFO: '/users/info' // 当前登录人信息
};

/**
 * 用户信息-页面
 */
module.exports.memberCenterPage = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        response = new Response();
    let userInfo = new UserInfo();
    restify.setUrl(URI.GET_USER_INFO)
        .get(function (result) {
            if (result.code === 200) {
                let companyType = result.data.companyType;
                switch (companyType) {
                    case -1:
                        result.data.companyType = '不存在';
                        break;
                    case 1:
                        result.data.companyType = '托盘生产商';
                        break;
                    case 2:
                        result.data.companyType = '投资商';
                        break;
                    case 3:
                        result.data.companyType = '运营代理商';
                        break;
                    case 4:
                        result.data.companyType = '托盘承租方';
                        break;
                    default:
                        result.data.companyType = '';
                        break;
                }
                StringUtil.extendMixed(userInfo, result.data);
                response.render('back/member/member-info', userInfo);
                this.resolve(response);
            }

        }.bind(this));
};

module.exports.memberModifyPage = function () {
    let req = this.req;
    let response = new Response();
    let userInfo = new UserInfo();
    var user = req.user;
    var companyType = req.user.companyType;
    // 处理公司类型字段
    switch (companyType) {
        case -1:
            user.companyType = '';
            break;
        case 1:
            user.companyType = '托盘生产商';
            break;
        case 2:
            user.companyType = '投资商';
            break;
        case 3:
            user.companyType = '运营代理商';
            break;
        case 4:
            user.companyType = '托盘承租方';
            break;
        default:
            user.companyType = '';
            break;
    }
    StringUtil.extendMixed(userInfo, user);
    response.render('back/member/modify-member', userInfo);
    this.resolve(response);
};

/**
 * 获取当前登录个人信息
 */
module.exports.memberCenterData = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        response = new Response();
    restify.setUrl(URI.GET_USER_INFO)
        .get(function (result) {
            if (result.code === 200) {
                let companyType = result.data.companyType;
                switch (companyType) {
                    case -1:
                        result.data.companyType = '不存在';
                        break;
                    case 1:
                        result.data.companyType = '托盘生产商';
                        break;
                    case 2:
                        result.data.companyType = '投资商';
                        break;
                    case 3:
                        result.data.companyType = '运营代理商';
                        break;
                    case 4:
                        result.data.companyType = '托盘承租方';
                        break;
                    default:
                        result.data.companyType = '';
                        break;
                }
            }
            response.send(result);
            this.resolve(response);
        }.bind(this));
}

/**
 * 修改用户个人信息
 */
module.exports.modifyMember = function () {
    let req = this.req;
    let files = req.files;
    let restify = new RestifyProxy(this);
    let params = req.body;
    for (let key in files) {
        params[key] = {
            value: fs.createReadStream(files[key].path),
            options: {
                filename: files[key].name,
                contentType: files[key].type
            }
        };
    }
    let response = new Response();
    restify.setUrl(URI.MODIFY_MEMBER)
        .setFormData(params)
        .uploadFile(function (result) {
            if (result.code === 200) {
                req.user.email = params.email;
                req.user.linkmanAddress = params.linkmanAddress;
                req.user.linkmanPhone = params.linkmanPhone;
            }
            response.send(result);
            this.resolve(response);
        }.bind(this));
};

/**
 * 修改密码
 */
module.exports.updatePwd = function () {
    let req = this.req,
        restify = new RestifyProxy(this),
        params = req.body,
        response = new Response();
    restify.setUrl(URI.UPDATE_PWD)
        .setParameter(params)
        .put(function (result) {
            response.send(result);
            this.resolve(response);
        }.bind(this));
};