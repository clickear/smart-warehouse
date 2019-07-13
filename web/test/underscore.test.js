'use strict';
var assert = require('assert');
var _ = require('underscore');
describe('underscore api', function () {
    it('find', function (done) {
        let arr = ['111', '222', '333', '666'];
        let target = '2222';
        let res = _.find(arr, (item)=> {
            return target === item;
        });
        console.log(res);
        done();
    });
});