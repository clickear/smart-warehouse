!'use strict';
let ClientController = require('../../../app/controller/back/agency/ClientController');
ClientController = ModelProxy(ClientController);
let router = require('express').Router();


router.get('/page', ClientController.clientPage);
router.post('/list',ClientController.List);
router.post('/save', ClientController.Save);
router.post('/update',ClientController.Update);
router.post('/delete',ClientController.Delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
