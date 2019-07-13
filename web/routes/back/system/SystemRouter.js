!'use strict';
let systemController = require('../../../app/controller/back/system/SystemController');
systemController = ModelProxy(systemController);
let router = require('express').Router();

let messageRouter = require('./MessageRouter');
router.use('/message', messageRouter);

let warnRouter = require('./WarnRouter');
router.use('/warn', warnRouter);

module.exports = router;
