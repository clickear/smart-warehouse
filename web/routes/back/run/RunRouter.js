!'use strict';
let RunController = require('../../../app/controller/back/run/RunController');
RunController = ModelProxy(RunController);
let router = require('express').Router();





// 运营管理-优惠政策
let PreferentialPoliciesRouter = require('./preferentialPolicies/PreferentialPoliciesRouter');
router.use('/preferentialPolicies', PreferentialPoliciesRouter);

// 运营管理-帮助文档
let HelpDocumentRouter = require('./helpDocument/HelpDocumentRouter');
router.use('/helpDocument', HelpDocumentRouter);
// 运营管理-系统日志
let SystemLogRouter = require('./systemLog/SystemLogRouter');
router.use('/systemLogs', SystemLogRouter);

router.get('/', RunController.runPage);

module.exports = router;
