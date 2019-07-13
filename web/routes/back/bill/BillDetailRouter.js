!'use strict';
let BillDetailController = require('../../../app/controller/back/bill/BillDetailController');
BillDetailController = ModelProxy(BillDetailController);
let router = require('express').Router();



router.post('/list',BillDetailController.List);
router.post('/delete',BillDetailController.Delete);
router.post('/update',BillDetailController.Update);
router.post('/accept',BillDetailController.Accept);




module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
