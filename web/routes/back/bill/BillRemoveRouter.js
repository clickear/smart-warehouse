!'use strict';
let BillRemoveController = require('../../../app/controller/back/bill/BillRemoveController');
BillRemoveController = ModelProxy(BillRemoveController);
let router = require('express').Router();


router.get('/page', BillRemoveController.BillRemovePage);
router.post('/list',BillRemoveController.List);
router.get('/detail/page',BillRemoveController.BillRemoveDetailPage);
router.post('/detail/data',BillRemoveController.BillRemoveDetailData);
router.get('/add',BillRemoveController.BillRemoveAddPage);
router.post('/save',BillRemoveController.BillRemoveAddSave);
router.post('/check',BillRemoveController.check);
router.post('/ok',BillRemoveController.ok);
router.post('/delete',BillRemoveController.delete);
router.post('/export',BillRemoveController.export);




module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
