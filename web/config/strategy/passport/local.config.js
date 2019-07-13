'use strict';

let LocalStrategy = require('passport-local').Strategy,
  EventProxy = require('eventproxy'),
  StringUtil = require('../../../app/util/StringUtil'),
  RestifyProxy = require('../../../app/util/RestifyProxy'),
  privs = require('../../../config').privs,
  url = {
    login: '/login'
  };

let login = function (obj, cb) {
  let restify = new RestifyProxy();
  restify.setUrl(url.login)
    .setParameter(obj)
    .post(cb);
};

/**
 * 获取角色所没有的权限
 * @param privs
 * @param roles
 * @param roleId
 * @returns {{fuzzy: Array, full: Array}}
 */
let processUrls = function (privs, menuDTOList) {
  for (var i = 0; i < menuDTOList.length; i++) {
    for (var j = 0; j < privs.length; j++) {
      if (privs[j].id === menuDTOList[i].id) {
        privs.splice(j, 1);
        break;
      }
    }
  }
  return privs;
};

module.exports = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  let data = {account: username, password: password, validateCode:'aaaa'}; // roleId
  let ep = EventProxy.create();
    let captcha = req.getParam('captcha');
  let sessionCaptcha = req.session.captcha;
  ep.on('logon', function (ret) {
    if (ret) {
        let result = {
            err: ret.code !== 200,
            errCode: ret.errCode || '',
            user: ret.data || '',
            info: ret.msg || ret.message ||''
        };

        if (ret.data) {
            result.user.token = ret.data.token;
            result.user.authorizedUrls = [];
        }
        return done(result);
    } else {
        let result = {
            err: true,
            errCode: 500,
            user: '',
            info: '服务器连接失败'
        };
      return done(result);
    }

  });
    if (!captcha || !sessionCaptcha || captcha.toLowerCase() !== sessionCaptcha.toLowerCase()) {
        return ep.emit('logon', {errCode: 405, msg: '验证码错误'});
    }
  login(data, function (ret) {
    ep.emit('logon', ret);
  });
});
