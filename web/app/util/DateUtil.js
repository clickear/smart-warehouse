'use strict';
var moment = require('moment'),
    logger = require('./LoggerUtil').logger('DateUtil'),
    StringUtil = require('./StringUtil');

/**
 * 获取当前时间
 * @returns {Date}
 */
var now = function () {
    return moment.apply(null, Array.prototype.slice.call(arguments, 0)).toDate();
};

/**
 * Date转String
 * @param date
 * @param fmt 日期格式 (例如：YYYY-MM-DD HH:mm:ss)
 * @returns {string}
 */
var date2String = function (date, fmt) {

    return moment(date).format(fmt || 'YYYY-MM-DD HH:mm:ss');
};

/**
 * String转Date
 * @param dateStr
 * @param fmt 日期格式 (例如：YYYY-MM-DD HH:mm:ss)
 * @returns {string}
 */
var string2Date = function (dateStr, fmt) {
    return moment(dateStr, fmt);
};

/**
 * 计算两个日期之间的差值
 * @param{Date} date1
 * @param{Date} date2
 * @param{String} type 测量单位，包括： years, months, weeks, days, hours, minutes, and seconds
 * @returns {Number}
 */
var diff = function (date1, date2, type) {
    var moment1 = moment(date1), moment2 = moment(date2);
    return moment1.diff(moment2, type);
};

/**
 * 返回给定时间点距当前时刻的描述(例如：a year ago)
 * @param{Date} date
 * @returns {String}
 */
var timeFromNow = function (date) {
    return moment(date).fromNow();
};

/**
 * 判断date1是否在date2之前
 * @param{Date|String} date1 可以是Date对象或者形如'yyyy-MM-dd hh:mm:ss'
 * @param{Date|String} date2
 * @param{String} type 测量单位，包括：year|month|week|day|hour|minute|second
 * @returns {Boolean}
 */
var isBefore = function (date1, date2, type) {
    return moment(date1).isBefore(moment(date2), type);
};

/**
 * 判断是否为Date对象
 * @param obj
 * @returns {boolean}
 */
var isDate = function (obj) {
    return moment.isDate(obj);
};

/**
 * StopWatch - 时间片记录工具
 * @constructor
 */
var StopWatch = function () {
    this.isRunning = false;
    this.startTimeMillis = null;
    this.totalTimeMillis = 0;
    this.currentTaskName = null;
    this.taskList = [];
};
StopWatch.prototype = {
    start: function (taskName) {
        if (this.isRunning) {
            logger.error("Can't start StopWatch: it's already running");
        } else {
            this.isRunning = true;
            this.startTimeMillis = Date.now();
            this.currentTaskName = taskName;
        }
        return this;
    },
    stop: function () {
        if (!this.isRunning) {
            logger.error("Can't stop StopWatch: it's not running");
        } else {
            this.isRunning = false;
            var lastTime = Date.now() - this.startTimeMillis;
            this.totalTimeMillis += lastTime;
            this.taskList.push({
                task: this.currentTaskName,
                time: lastTime
            });
            this.startTimeMillis = null;
            this.currentTaskName = null;
        }
        return this;
    },
    toString: function () {
        var arr = [],
            tpl = "StopWatch - TASK_NAME[{0}]: running time {1} ms",
            tplTotal = "StopWatch - ALL_TASKS: running time {0} ms";
        this.taskList.forEach(function (item) {
            arr.push(StringUtil.format(tpl, item.task, item.time));
        });
        arr.length > 1 && arr.push(StringUtil.format(tplTotal, this.totalTimeMillis));
        return arr.join('\n');
    }
};

/**
 * 获取时间片实例
 * @param taskName
 * @returns {StopWatch}
 */
var getStopWatch = function (taskName) {
    var stopWatch = new StopWatch();
    return typeof taskName === 'string' ? stopWatch.start(taskName) : stopWatch;
};

module.exports = {
    now: now,
    date2String: date2String,
    string2Date: string2Date,
    diff: diff,
    timeFromNow: timeFromNow,
    isBefore: isBefore,
    isDate: isDate,
    getStopWatch: getStopWatch
};