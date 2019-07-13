'use strict';
 // 状态码
module.exports = {
    SUCCESS: {code: 200},
    UNKNOWN_ERROR: {code: -1, msg: '未知错误', desc: '以下未列举出的其他情况所产生的错误'},
    API_ERROR: {code: -2, msg: 'API接口错误', desc: '程序调用外部api接口超时，返回数据错误等'},
    DB_ERROR: {code: -3, msg: '数据库连接错误', desc: '数据库连接超时、失败等'},
    AUTH_ERROR: {code: -4, msg: '访问权限错误', desc: '用户访问系统资源无权限产生的错误、用户登录错误、session过期等'},
    SYS_ERROR: {code: -5, msg: '系统错误', desc: '系统处理异常'},
    BIZ_ERROR: {code: -6, msg: '业务错误', desc: '具体项目涉及到的业务处理相关的错误'},
    VALIDATION_ERROR: {code: -7, msg: '参数校验错误', desc: '参数校验失败'}
};