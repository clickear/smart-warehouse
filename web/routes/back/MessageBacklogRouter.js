!'use strict';
let MessageBacklogController =require('../../app/controller/back/MessageBacklogController');
MessageBacklogController = ModelProxy(MessageBacklogController);
let router = require('express').Router();

router.get('/page', MessageBacklogController.messageBacklogPage);
router.post('/list',MessageBacklogController.messageBacklogList);
// 待办事项-详情
router.get('/messageinfo/page', MessageBacklogController.messageInfoPage);
// 待办事项-详情-获取数据
router.post('/messageinfo/data', MessageBacklogController.getmessageData);
//未读变更
router.post('/read', MessageBacklogController.readReceipt);

module.exports = router;
