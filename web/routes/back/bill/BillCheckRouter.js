!'use strict';
let BillCheckController = require('../../../app/controller/back/bill/BillCheckController');
BillCheckController = ModelProxy(BillCheckController);
let router = require('express').Router();


router.get('/page', BillCheckController.BillCheckPage);
router.post('/list',BillCheckController.List);
router.get('/detail/page',BillCheckController.BillCheckDetailPage);
router.post('/detail/data',BillCheckController.BillCheckDetailData);
router.get('/add',BillCheckController.BillCheckCreatePage);
router.post('/save',BillCheckController.save);
router.post('/task',BillCheckController.task);







module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
