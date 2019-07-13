var Geetest = require('./GtSDK');
var config = require('../../config').app.geeTeam;


var pcGeetest;
if (config) {
    pcGeetest = new Geetest({
        geetest_id: config.geetest_id,
        geetest_key: config.geetest_key
    });
}

module.exports = pcGeetest;