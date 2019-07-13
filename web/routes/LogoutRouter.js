'use strict';
var router = require('express').Router();
var logoutController = require('../app/controller/LogoutController');
logoutController = ModelProxy(logoutController); // 获取Controller的代理对象

router.get('/', logoutController.logout);
router.get('/page', logoutController.logoutPage);
module.exports = router;
