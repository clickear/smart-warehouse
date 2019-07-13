!'use strict';
var multipartMiddleware = require('connect-multiparty')();
let loginController = require('../app/controller/LoginController');
loginController = ModelProxy(loginController);
let router = require('express').Router();

router.get('/', loginController.loginPage);
router.post('/', loginController.login);
router.get('/captcha', loginController.captcha);

router.get('/retrievePassword/page', loginController.forgetPwdPage);
router.post('/retrievePassword/send', loginController.retrievePasswordSend); // 发送手机验证码-忘记密码
router.post('/retrievePassword/email', loginController.retrieveEmail); // 发送邮箱验证码-忘记密码
router.post('/retrievePassword/check', loginController.retrievePasswordCheck); // 验证手机和验证码
router.post('/retrievePassword/code', loginController.retrievePasswordEmail); // 验证邮箱和验证码
router.get('/retrievePassword/reinstall/page', loginController.reinstallPage); // 设置新密码页面
router.post('/retrievePassword/reinstall/save', loginController.reinstallSave); // 保存新密码

module.exports = router;
