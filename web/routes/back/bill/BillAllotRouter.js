!'use strict';
let BillAllotController = require('../../../app/controller/back/bill/BillAllotController');
BillAllotController = ModelProxy(BillAllotController);
let router = require('express').Router();


router.get('/page', BillAllotController.BillAllotPage);
router.post('/list',BillAllotController.List);
router.get('/detail/page',BillAllotController.BillAllotDetailPage);
router.post('/detail/data',BillAllotController.BillAllotDetailData);
router.get('/add',BillAllotController.add);
router.post('/save',BillAllotController.save);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
