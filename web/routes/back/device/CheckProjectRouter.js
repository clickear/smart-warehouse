!'use strict';
let CheckProjectController = require('../../../app/controller/back/device/CheckProjectController');
CheckProjectController = ModelProxy(CheckProjectController);
let router = require('express').Router();


router.get('/page', CheckProjectController.page);
router.get('/detail/page', CheckProjectController.detailPage);
router.post('/list',CheckProjectController.list);
router.post('/save',CheckProjectController.create);
router.post('/update',CheckProjectController.update);
router.post('/delete',CheckProjectController.delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
