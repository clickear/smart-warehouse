!'use strict';
let customerServiceController =require('../../app/controller/back/CustomerServiceController');
customerServiceController = ModelProxy(customerServiceController);
let router = require('express').Router();

router.get('/page',customerServiceController.customerServicePage);
//咨询信息-列表
router.post('/list', customerServiceController.customerServiceList);
// 咨询管理-详情页面
router.get('/customerServiceinfo/page',customerServiceController.customerServiceinfoPage);
// 咨询管理-详情
router.post('/customerServiceinfo/data',customerServiceController.customerServiceInfo);
// 咨询管理-消息列表
router.post('/customerServiceinfo/list',customerServiceController.customerServiceMsgList);
// 咨询管理-发送消息
router.post('/customerServiceinfo/send',customerServiceController.customerServiceSendMsg);
// 咨询管理-回复消息
router.post('/customerServiceinfo/reply',customerServiceController.customerServiceSendReply);
module.exports = router;
