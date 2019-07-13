!'use strict';

let helpController = ModelProxy(require('../../app/controller/back/helpController'));
let router = require('express').Router();

router.get('/',helpController.helpPage);
router.post('/data',helpController.helpData);
router.get('/detail-page',helpController.helpDetailPage);



module.exports = router;
