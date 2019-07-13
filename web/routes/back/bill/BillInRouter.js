!'use strict';
let BillInController = require('../../../app/controller/back/bill/BillInController');
BillInController = ModelProxy(BillInController);
let router = require('express').Router();


router.get('/page', BillInController.BillInPage);
router.post('/list',BillInController.List);
router.get('/detail/page',BillInController.BillInDetailPage);
router.post('/detail/data',BillInController.BillInDetailData);
router.get('/add',BillInController.BillInAddPage);
router.post('/save',BillInController.BillInAddSave);
router.post('/check',BillInController.check);
router.post('/ok',BillInController.ok);
router.post('/export',BillInController.export);
router.post('/delete',BillInController.delete);
router.post('/tongji',BillInController.tongji);
router.post('/accept',BillInController.accept);
router.post('/accept',BillInController.accept);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
