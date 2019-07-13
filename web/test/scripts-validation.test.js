'use strict';
//mocha -t 500000 --debug-brk RestUtil.test.js
//http://localhost:8080/debug?port=5858
const assert = require('assert');
const Restify = require('../app/util/Restify');
describe('脚本校验', function () {
    it('转换', function (done) {
        let restify = new Restify();
        let paramData = {
            "type": 1,
            "param": JSON.stringify({"x": 1.2, "y": 1.5}), //用户输入的参数
            "script": '初始化脚本',
            "convertFieldConfigs": JSON.stringify([{ //非空
                "name": "cpu_user",
                "dataType": "1", // PS：后端需要转换 例如：'double'、'String'
                "desc": "",
                "fieldScript": "非空"
            }])
        };
        console.log(paramData);
        restify.setUrl('/appinfos/10000066/dataScript')
            .setToken(1)
            .setParameter(paramData)
            .post((ret)=> {
                done();
                console.log(ret);
                assert.ok(ret.code == 200);
            });
    });

    it('统计', function (done) {
        let restify = new Restify();
        let paramData = {
            "type": 3,
            "param": JSON.stringify({"x": 1.2, "y": 1.5}),
            "statScript": "统计脚本",
            "outputScript": "输出脚本",
            "intermediateData": JSON.stringify({"ix": 1.2, "iy": 1.5}), //中间结果 （可以为空）
            "archiveId": "", //设备档案ID（可以为空）
            "archiveFields": JSON.stringify(['aa', 'bb']), //档案字段ID（可以为空）
            "convertFieldConfigs": JSON.stringify([{ //非空
                "name": "cpu_user",
                "dataType": "1", // PS：后端需要转换 例如：'double'、'String'
                "desc": "",
                "fieldScript": "非空"
            }])
        };
        console.log(paramData);
        restify.setUrl('/appinfos/10000066/dataScript')
            .setToken(1)
            .setParameter(paramData)
            .post((ret)=> {
                done();
                console.log(ret);
                assert.ok(ret.code == 200);
            });
    });

    it('告警', function (done) {
        let restify = new Restify();
        let paramData = {
            "type": 2,
            "param": JSON.stringify({"x": 1.2, "y": 1.5}),
            "script": "告警脚本",
            "convertFieldConfigs": JSON.stringify([{ //非空
                "name": "cpu_user",
                "dataType": "1", // PS：后端需要转换 例如：'double'、'String'
                "desc": "",
                "fieldScript": "非空"
            }])
        };
        console.log(paramData);
        restify.setUrl('/appinfos/10000066/dataScript')
            .setToken(1)
            .setParameter(paramData)
            .post((ret)=> {
                done();
                console.log(ret);
                assert.ok(ret.code == 200);
            });
    });
});