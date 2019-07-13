!'use strict';
let DeviceSingleController = require('../../../app/controller/back/device/DeviceSingleController');
DeviceSingleController = ModelProxy(DeviceSingleController);
let router = require('express').Router();


router.get('/page', DeviceSingleController.page);
router.post('/list',DeviceSingleController.list);
router.post('/save',DeviceSingleController.create);
router.post('/update',DeviceSingleController.update);
router.post('/delete',DeviceSingleController.delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
