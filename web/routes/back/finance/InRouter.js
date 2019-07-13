!'use strict';
let InController = require('../../../app/controller/back/finance/InController');
InController = ModelProxy(InController);
let router = require('express').Router();


router.get('/page', InController.InPage);
router.post('/list',InController.List);
router.post('/save',InController.Insert);
router.post('/update',InController.Update);
router.post('/delete',InController.Delete);




module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
