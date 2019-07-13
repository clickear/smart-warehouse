!'use strict';
let CheckMasterController = require('../../../app/controller/back/device/CheckMasterController');
CheckMasterController = ModelProxy(CheckMasterController);
let router = require('express').Router();


router.get('/page', CheckMasterController.page);
router.get('/detail/page', CheckMasterController.detailPage);
router.post('/list',CheckMasterController.list);
router.post('/save',CheckMasterController.create);
router.post('/update',CheckMasterController.update);
router.post('/delete',CheckMasterController.delete);

module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
