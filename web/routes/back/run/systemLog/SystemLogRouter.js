!'use strict';
let systemLogController = require('../../../../app/controller/back/run/SystemLogController');
systemLogController = ModelProxy(systemLogController);
let router = require('express').Router();

router.get('/page',systemLogController.systemLogPage);
router.post('/list', systemLogController.systemLogList);

module.exports = router;