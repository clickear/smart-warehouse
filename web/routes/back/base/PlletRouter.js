!'use strict';
let PlletController = require('../../../app/controller/back/base/PlletController');
PlletController = ModelProxy(PlletController);
let router = require('express').Router();


router.get("/page",PlletController.plletPage);
router.post('/list',PlletController.List);

router.post('/save',PlletController.insertPllet);
router.post('/update',PlletController.updatePllet);
router.post('/delete',PlletController.deletePllet);
router.post('/batch',PlletController.batch);






module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
