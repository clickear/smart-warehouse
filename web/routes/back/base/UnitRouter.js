!'use strict';
let UnitController = require('../../../app/controller/back/base/UnitController');
UnitController = ModelProxy(UnitController);
let router = require('express').Router();


router.get("/page",UnitController.unitPage);
router.post('/list',UnitController.List);

router.post('/save',UnitController.insertUnit);
router.post('/update',UnitController.updateUnit);
router.post('/delete',UnitController.deleteUnit);






module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
