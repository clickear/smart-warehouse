!'use strict';
let BillDamageController = require('../../../app/controller/back/bill/BillDamageController');
BillDamageController = ModelProxy(BillDamageController);
let router = require('express').Router();


router.get('/page', BillDamageController.BillDamagePage);
router.post('/list',BillDamageController.List);
router.get('/detail/page',BillDamageController.BillDamageDetailPage);
router.post('/detail/data',BillDamageController.BillDamageDetailData);
router.get('/add',BillDamageController.BillDamageAddPage);
router.post('/save',BillDamageController.BillDamageAddSave);
router.post('/check',BillDamageController.check);
router.post('/ok',BillDamageController.ok);
router.post('/delete',BillDamageController.delete);
router.post('/export',BillDamageController.export);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */





