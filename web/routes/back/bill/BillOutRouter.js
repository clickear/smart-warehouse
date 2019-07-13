!'use strict';
let BillOutController = require('../../../app/controller/back/bill/BillOutController');
BillOutController = ModelProxy(BillOutController);
let router = require('express').Router();


router.get('/page', BillOutController.BillOutPage);
router.post('/list',BillOutController.List);
router.get('/detail/page',BillOutController.BillOutDetailPage);
router.post('/detail/data',BillOutController.BillOutDetailData);
router.get('/add',BillOutController.BillOutAddPage);
router.post('/save',BillOutController.BillOutAddSave);
router.post('/check',BillOutController.check);
router.post('/ok',BillOutController.ok);
router.post('/delete',BillOutController.delete);
router.post('/export',BillOutController.export);
router.post('/prepare',BillOutController.prepare);
router.post('/complete',BillOutController.complete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
