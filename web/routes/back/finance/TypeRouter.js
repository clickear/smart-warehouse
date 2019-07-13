!'use strict';
let TypeController = require('../../../app/controller/back/finance/TypeController');
TypeController = ModelProxy(TypeController);
let router = require('express').Router();


router.get('/page', TypeController.TypePage);
router.post('/list',TypeController.List);
router.post('/save',TypeController.Save);
router.post('/delete',TypeController.Delete);
router.post('/update',TypeController.Update);





module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
