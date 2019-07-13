'use strict';
//mocha -t 500000 --debug-brk RestUtil.test.js
//http://localhost:8080/debug?port=5858
var assert = require('assert');
describe('privilege', function () {
    it('Load privs', function (done) {
        var privs = require('../config/privilege');
        console.dir(privs);
        done();
    });
});