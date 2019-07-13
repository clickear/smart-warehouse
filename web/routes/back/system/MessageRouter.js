!'use strict';
let messageController = require('../../../app/controller/back/system/MessageController');
messageController = ModelProxy(messageController);
let router = require('express').Router();

router.get('/page', messageController.messagePage);
router.post('/list', messageController.getMessageListPaging);

router.get('/detail/page', messageController.detailPage);
router.post('/detail/data', messageController.getMessageById);

router.post('/enabled', messageController.enabledMessageById); // 启用

router.post('/disabled', messageController.disabledMessageById); // 禁用

module.exports = router;
