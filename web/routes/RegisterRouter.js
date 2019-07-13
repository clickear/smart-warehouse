!'use strict';
var multipartMiddleware = require('connect-multiparty')();
let registerController = require('../app/controller/RegisterController');
registerController = ModelProxy(registerController);
let router = require('express').Router();



// 注册========================================================================================
router.get('/page', registerController.registerPage);
router.post('/send', registerController.registerSend); // 发送手机验证码-注册
router.post('/save', multipartMiddleware, registerController.registerSave); // 保存注册信息
router.get('/identification/page', registerController.identificationPage);

module.exports = router;
