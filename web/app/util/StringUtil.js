//'use strict';
/**
 * 字符串操作 - 工具类
 */

var _ = require('lodash/lang');

/**
 * 生成随机字符串
 * @param len 字符串长度，默认值：32
 * @returns {string}
 */
var genRandomString = function (len) {
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

/**
 * 生成一个指定位数的随机数
 * @param len 位数，默认值：32
 * @returns {string}
 */
var genRandomNumber = function (len) {
    len = len || 32;
    var nums = '0123456789';
    var maxPos = nums.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += nums.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

/**
 * 生成一个位于最大值和最小值之间的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns {number}
 */
var genRandomMiddleNum = function (min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range);
    return num;
};

/**
 * 将字符串中的占位符转换为给定字符
 * @param str 目标字符串 形如：'/users/{0}?password={1}'，其中0\1代表占位符所对应的参数的顺序
 * @returns {*} 返回一个新的字符串
 */
var format = function (str) {
    if (!str || !str.length) {
        return str;
    }
    for (var tempStr = str, i = 0, len = arguments.length - 1; i < len; i++) {
        tempStr = tempStr.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i + 1]);
    }
    return tempStr;
};

/**
 * 判断给定字符串是否符合email格式
 * @param str
 * @returns {boolean}
 */
var isEmail = function (str) {
    if (!str)
        return false;
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return pattern.test(str);
};

/**
 * 判断给定字符串是否包含特殊字符
 *  `~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？
 * @param str
 * @returns {boolean}
 */
var hasSpecialCaracters = function (str) {
    if (!str)
        return false;
    var pattern = new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]');
    return pattern.test(str);
};

/**
 * 判断是否为数字、字母与下划线，且不以数字开头
 * @param str
 */
var onlyLetterNumberUnderscore = function (str) {
    if (!str)
        return false;
    var pattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    return pattern.test(str);
};

/**
 * 对象合并属性（取交集）
 * @param destination
 * @param source
 * @returns {*}
 */
var extendMixed = function (destination, source) {
    if (destination && source) {
        for (var property in destination) {
            if (property in source) {
                if (destination[property].constructor &&
                    destination[property].constructor === Object &&
                    source[property].constructor &&
                    source[property].constructor === Object) {
                    arguments.callee(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
        }
    }
    return destination;
};
/**
 * 对象继承
 * 同$.fn.extend
 * @returns {*|{}}
 */
var extend = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {}, // 目标对象
        i = 1,
        length = arguments.length,
        deep = false;
    // 处理深度拷贝情况（第一个参数是boolean类型且为true）
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // 跳过第一个参数（是否深度拷贝）和第二个参数（目标对象）
        i = 2;
    }
    // 如果目标不是对象或函数，则初始化为空对象
    if (typeof target !== 'object' && !_.isFunction(target)) {
        target = {};
    }
    // 如果只指定了一个参数，则使用jQuery自身作为目标对象
    if (length === i) {
        target = this;
        --i;
    }
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // 如果对象中包含了数组或者其他对象，则使用递归进行拷贝
                if (deep && copy && ( _.isObject(copy) || (copyIsArray = _.isArray(copy)) )) {
                    // 处理数组
                    if (copyIsArray) {
                        copyIsArray = false;
                        // 如果目标对象不存在该数组，则创建一个空数组；
                        clone = src && _.isArray(src) ? src : [];
                    } else {
                        clone = src && _.isObject(src) ? src : {};
                    }
                    // 从不改变原始对象，只做拷贝
                    target[name] = extend(deep, clone, copy);
                    // 不拷贝undefined值
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // 返回已经被修改的对象
    return target;
};

/**
 * 填充目标对象中的空字符串
 * @param destination
 * @param defaultStr
 */
var fillEmptyStr = function (destination, defaultStr) {
    defaultStr = defaultStr || '-';
    for (var property in destination) {
        destination[property] = destination[property] || defaultStr;
    }
};

/**
 * 格式化get请求uri
 * @param uri
 * @param param
 * @returns {*}
 */
var formatGetRquestUri = function (uri, param) {
    var arr = [];
    for (var p in param) {
        arr.push([p, '=', param[p]].join(''));
    }
    if (uri.indexOf('?') == -1 && arr.length > 0) {
        uri = uri.concat('?');
    }
    if (arr.length > 0) {
        if (uri.charAt(uri.length - 1) !== '?') {
            uri = uri.concat('&');
        }
        uri = uri.concat(arr.join('&'));
    }
    return uri;
};

module.exports = {
    format: format,
    formatGetRquestUri: formatGetRquestUri,
    isEmail: isEmail,
    hasSpecialCaracters: hasSpecialCaracters,
    onlyLetterNumberUnderscore: onlyLetterNumberUnderscore,
    genRandomMiddleNum: genRandomMiddleNum,
    genRandomNumber: genRandomNumber,
    genRandomString: genRandomString,
    fillEmptyStr: fillEmptyStr,
    extendMixed: extendMixed,
    extend: extend
};