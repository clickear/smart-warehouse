!'use strict';

let AverageUserController = ModelProxy(require('../../app/controller/back/AverageUserController'));
let router = require('express').Router();

router.get('/page',AverageUserController.averageUserPage);

module.exports = router;
