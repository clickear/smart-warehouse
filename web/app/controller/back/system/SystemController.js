'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let StringUtil = require('../../../util/StringUtil');
let systemService = require('../../../service/SystemService');
let logger = require('../../../util/LoggerUtil').logger('SystemParameterController.js');
