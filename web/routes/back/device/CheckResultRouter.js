!'use strict';
let CheckResultController = require('../../../app/controller/back/device/CheckResultController');
CheckResultController = ModelProxy(CheckResultController);
let router = require('express').Router();


router.get('/page', CheckResultController.page);
router.post('/list',CheckResultController.list);
router.post('/save',CheckResultController.create);
router.post('/update',CheckResultController.update);
router.post('/delete',CheckResultController.delete);
router.post('/result',CheckResultController.result);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
