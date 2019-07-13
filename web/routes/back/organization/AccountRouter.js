!'use strict';
let accountController = require('../../../app/controller/back/organization/AccountController');
accountController = ModelProxy(accountController);
let router = require('express').Router();

router.get('/page', accountController.accountPage);
// 账户列表
router.post('/list', accountController.accountList);

// 客户-创建账户-页面
router.get('/clientCreateAccount/page', accountController.clientCreateAccountPage);
// 客户-创建账户-保存
router.post('/clientCreateAccount/save', accountController.clientCreateAccount);

// 平台-创建账户-页面
router.get('/platformCreateAccount/page', accountController.platformCreateAccountPage);
// 平台-创建账户-保存
router.post('/platformCreateAccount/save', accountController.platformCreateAccount);

// 账户信息-详情
router.get('/detail/page', accountController.detailPage);
// 账户信息-详情-获取数据
router.post('/detail/data', accountController.getUserByUserId);

// 账户信息-修改-页面
router.get('/modify/page', accountController.modifyPage);
// 账户信息-修改-获取数据
router.post('/modify/data', accountController.getUserByUserId);
// 账户信息-修改-保存
router.post('/modify/save', accountController.modifyUserByUserId);

// 删除-账户
router.post('/delete', accountController.deleteUserByUserId);

// 启动账户
router.post('/enabled', accountController.enabledUserByUserId);
// 禁用账户
router.post('/disabled', accountController.disabledUserByUserId);


module.exports = router;




























