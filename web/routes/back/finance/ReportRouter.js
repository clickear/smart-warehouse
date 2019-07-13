!'use strict';
let ReportController = require('../../../app/controller/back/finance/ReportController');
ReportController = ModelProxy(ReportController);
let router = require('express').Router();


router.get('/page', ReportController.ReportPage);
router.post('/list',ReportController.List);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
