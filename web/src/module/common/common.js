import jQuery from 'jQuery';

/**
 * xxmi.org
 * 2017-6-19
 *  表单序列化为JSON
 */
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

/**
 * 扩展原生类型
 */
(function () {
    /**
     * 将字符串中的占位符转换为给定字符
     * @param str 目标字符串 形如：'/users/{0}?password={1}'，其中0\1代表占位符所对应的参数的顺序
     * @returns {*} 返回一个新的字符串
     */
    String.prototype.format = function () {
        var str = this;
        if (!str || !str.length) {
            return str;
        }
        for (var tempStr = str, i = 0, len = arguments.length; i < len; i++) {
            tempStr = tempStr.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
        }
        return tempStr;
    };

    /**
     * 判断字符串是否以指定字符串开头
     * @param str
     * @returns {boolean}
     */
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };

    /**
     * 判断字符串是否以制定字符串结尾
     * @param str
     * @returns {boolean}
     */
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) === str;
    };

    Date.prototype.Format = function (formatStr) {
        var str = formatStr;
        var month = this.getMonth() + 1;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/,
            (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString()
                : '0' + (this.getYear() % 100));

        str = str.replace(/MM/, month > 9 ? month
            .toString() : '0' + month);
        str = str.replace(/M/g, month);

        str = str.replace(/w|W/g, Week[this.getDay()]);

        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate()
            .toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());

        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours()
            .toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes()
            .toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());

        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds()
            .toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());
        return str;
    };
})();

/**
 * 字符统计插件
 * $.fn.charCount
 */
(function ($) {
    var defaults = {
        allowed: 200,
        warning: 180,
        css: 'counter',
        counterElement: 'span',
        cssWarning: 'warning',
        cssExceeded: 'exceeded',
        // counterText: '<font color="#333">{current}</font> / <font color="#999">{allowed}</font>'
        // 支持占位符写法，形如：{current}/{allowed}/{available}
        // 支持占位符写法，形如：{current}/{allowed}/{available}
        counterText: '<font color="#999" style="font-size:12px">还可以输入{available}字</font>'
    };

    function calculate (obj) {
        var count = $(obj).val().length;
        var options = $(obj).data('options');
        var allowed = options.allowed;
        var available = allowed - count;
        if (available <= options.warning && available >= 0) {
            $(obj).next().addClass(options.cssWarning);
        } else {
            $(obj).next().removeClass(options.cssWarning);
        }
        if (available < 0) {
            $(obj).next().addClass(options.cssExceeded);
        } else {
            $(obj).next().removeClass(options.cssExceeded);
        }
        var tpl = options.counterText;
        $(obj).next().html(tpl.replace('{current}', count).replace('{allowed}', allowed).replace('{available}', available));
    }

    $.fn.charCount = function (options) {
        var _options = $.extend(defaults, {allowed: $(this).attr('maxlength')}, options);
        var tpl = _options.counterText;
        var counterText = tpl.replace('{current}', 0).replace('{allowed}', _options.allowed).replace('{available}', 0);
        this.each(function () {
            var $parent = $(this).parent();
            if ($parent.css('position') === 'static') {
                $parent.css('position', 'relative');
            }
            $(this).data('_options', _options)
                .after('<' + _options.counterElement + ' class="' + _options.css + '" style="position:absolute; bottom:0; margin-left:10px">' + counterText + '</' + _options.counterElement + '>');
            calculate(this);
            $(this).keyup(function () {
                calculate(this);
            });
            $(this).change(function () {
                calculate(this);
            });
        });
    };
})(jQuery);

/**
 * 滑动开关按钮
 * jQuery.slideBtn
 */
(function ($) {
    var SPLITER = '_';
    var defaults = {
        ns: '', //命名空间
        chkID: 'chk', //自定义checkbox ID
        chkClazz: 'chk-clazz', //自定义checkbox class,
        checked: true, //是否选中
        disabled: false, //是否禁用
        minWidth: '110px', //定义wrap容器的最小宽度
        labels: null, //显示的文本，形如：['开阀', '关阀']
        changed: null //当状态改变时触发的回调
    };
    var renderWrapStyle = function ($wrap, option) {
        //checkbox样式
        var $chkbox = $('input:checkbox', $wrap);
        option.checked && $chkbox.attr('checked', true);
        option.disabled && $chkbox.attr('disabled', true);
        //定义wrap容器最小宽度
        option.minWidth && $wrap.css('min-width', option.minWidth);
    };
    var bindEvent = function ($wrap, option) {
        //input[type="checkbox"] - change事件
        $wrap.find('input:checkbox').unbind('change.slide').bind('change.slide', function (e) {
            var $wrap = $(this).parents('.slide-btn-wrap'),
                chkID = $(this).attr('id'),
                $labelOn = $('.slide-btn-on', $wrap).removeClass('slide-clickable').removeAttr('for'),
                $labelOff = $('.slide-btn-off', $wrap).removeClass('slide-clickable').removeAttr('for'),
                option = $wrap.data('option') || {};
            if ($(this).prop('checked')) {
                $labelOff.addClass('slide-clickable').attr('for', chkID);
            } else {
                $labelOn.addClass('slide-clickable').attr('for', chkID);
            }
            $.isFunction(option.changed) && option.changed($(this));
            return false;
        });
    };
    var generateDom = function (dom, option) {
        var $wrap = $('<div class="slide-btn-wrap"></div>'),
            $label = $('<label class="slide-btn-label"></label>'),
            $div = $('<div class="slide-btn-chk"></div>'),
            ns = option.ns,
            chkID = option.chkID,
            chkClazz = option.chkClazz,
            $checkbox = $(['#', chkID, '[type="checkbox"]'].join(''));
        $checkbox = $checkbox.length ? $checkbox : $('<input type="checkbox"/>').attr({
            id: [ns, chkID].join(SPLITER),
            'class': chkClazz
        });
        $label.append($checkbox).append($div).appendTo($wrap);
        if (option.labels && option.labels.length > 1) {
            var labels = option.labels.slice(0, 2),
                tempChkID = $checkbox.attr('id'),
                $labelOn = $('<label class="slide-btn-on slide-clickable"></label>').text(labels[0]).attr('for', tempChkID),
                $labelOff = $('<label class="slide-btn-off slide-clickable"></label>').text(labels[1]).attr('for', tempChkID);
            option.checked && $labelOn.removeClass('slide-clickable').removeAttr('for');
            !option.checked && $labelOff.removeClass('slide-clickable').removeAttr('for');
            $labelOn.insertAfter($label);
            $labelOff.insertBefore($label);
        }
        renderWrapStyle($wrap, option);
        bindEvent($wrap, option);
        dom.append($wrap.data('option', option));
        return $wrap;
    };
    var refreshDom = function ($wrap, option) {
        var ns = option.ns,
            chkID = option.chkID,
            chkClazz = option.chkClazz,
            $checkbox = $('input:checkbox', $wrap);
        $checkbox.attr({id: [ns, chkID].join(SPLITER), 'class': chkClazz});
        if (option.labels && option.labels.length > 1) {
            var labels = option.labels.slice(0, 2),
                tempChkID = $checkbox.attr('id'),
                $labelOn = $('.slide-btn-on', $wrap).addClass('slide-clickable').text(labels[0]).attr('for', tempChkID),
                $labelOff = $('.slide-btn-off', $wrap).addClass('slide-clickable').text(labels[1]).attr('for', tempChkID);
            option.checked && $labelOn.removeClass('slide-clickable').removeAttr('for');
            !option.checked && $labelOff.removeClass('slide-clickable').removeAttr('for');
        }
        renderWrapStyle($wrap, option);
        bindEvent($wrap, option);
        return $wrap.data('option', option);
    };
    var methods = {
        init: function (dom, option) {
            option = $.extend(true, {}, defaults, option);
            return generateDom(dom, option);
        },
        refresh: function ($wrap, option) {
            var original = $wrap.data('option');
            option = $.extend(true, {}, defaults, original, option);
            refreshDom($wrap, option);
            return $wrap;
        }
    };
    $.fn.slideBtn = function (method, option) {
        return methods[method].call(methods, $(this).first(), option);
    };
})(jQuery);

/**
 * 带加载效果的按钮
 * jQuery.spinner
 * @dependency: window.Spinner|String.prototype.format
 */
(function ($) {
    var DATA_TAG = 'loadingBtn'; //tag
    //ps: 自定义的JS配置项的优先级高于自定义的DOM节点配置项
    var DEFAULTS = {
        spinner: {
            size: 24, //spinner尺寸 对应的DOM节点属性：data-spinner-size
            color: '#FFF', //spinner颜色 data-spinner-color
            lines: 12 //spinner线条数量 data-spinner-lines
        },
        timeout: 5 * 60 * 1000, //超时时长（ms） data-spinner-timeout
        timeoutCallback: null //超时后需要执行的回调函数
    };

    //创建spinner
    var createSpinner = function ($dom, option) {
        var spinnerColor, spinnerLines, height = $dom.outerHeight(), opts = option.spinner;

        if (height === 0) {
            height = parseFloat($dom.css('height'));
        }

        if (height > 32) {
            height *= 0.8;
        }

        if (opts.size) {
            height = parseInt(opts.size, 10);
        }

        if (opts.color) {
            spinnerColor = opts.color;
        }

        if (opts.lines) {
            spinnerLines = parseInt(opts.lines, 10);
        }

        var radius = height * 0.2,
            length = radius * 0.6,
            width = radius < 7 ? 2 : 3;

        return new Spinner({
            color: spinnerColor || '#fff',
            lines: spinnerLines || 12,
            radius: radius,
            length: length,
            width: width,
            zIndex: 'auto',
            top: '50%',
            left: '50%'
        });
    };

    var startTick = function (dom, time) {
        var timer = setTimeout(function () {
            this.spinner('stop');
            var option = this.data(DATA_TAG) || {};
            $.isFunction(option.timeoutCallback) && option.timeoutCallback(this);
        }.bind(dom), time);
        dom.data('{0}timer'.format(DATA_TAG), timer);
    };
    var clearTick = function (dom) {
        clearTimeout(dom.data('{0}timer'.format(DATA_TAG)));
    };
    var methods = {
        create: function (dom, option) {
            if (!$.isPlainObject(dom.data(DATA_TAG))) {
                var nodeOption = {
                    spinner: {
                        size: dom.attr('data-spinner-size'),
                        color: dom.attr('data-spinner-color'),
                        lines: dom.attr('data-spinner-lines')
                    },
                    timeout: dom.attr('data-spinner-timeout'),
                    loadingHTML: dom.attr('data-spinner-text'),
                    normalHTML: dom.html()
                };
                option = $.extend(true, {}, DEFAULTS, nodeOption, option);
                var $label = $('<span class="loading-btn-label"></span>'),
                    $spinner = $('<div class="loading-btn-spinner"></div>');
                $label.html(dom.html());
                createSpinner(dom, option).spin($spinner[0]);
                dom.addClass('loading-btn').data(DATA_TAG, option);
                dom.empty().append($label).append($spinner);
                dom.attr('data-spinner-left') && $spinner.css('left', dom.attr('data-spinner-left'));
            }
            return dom;
        },
        start: function (dom) {
            var option = dom.data(DATA_TAG);
            if ($.isPlainObject(option)) {
                var bgColor = dom.css('background-color');
                var fontColor = dom.css('color');
                dom.attr('disabled', true).attr('data-loading', true).css('background-color', bgColor).css('color', fontColor);
                dom.find('.loading-btn-spinner').removeClass('hide');
                option.loadingHTML && dom.find('.loading-btn-label').empty().append(option.loadingHTML);
                startTick(dom, option.timeout);
            } else {
                console.error('option is empty', option);
            }
            return dom;
        },
        stop: function (dom) {
            clearTick(dom);
            var option = dom.data(DATA_TAG);
            dom.find('.loading-btn-spinner').addClass('hide');
            option && option.loadingHTML && dom.find('.loading-btn-label').empty().append(option.normalHTML);
            dom.removeAttr('data-loading').removeAttr('disabled').css('background-color', '').css('color', '');
            return dom;
        },
        isLoading: function (dom) {
            return dom[0].hasAttribute('data-loading');
        },
        destroy: function (dom) {
            var text = dom.find('.loading-btn-label').html();
            $.isPlainObject(dom.data(DATA_TAG)) && dom.spinner('stop').data(DATA_TAG, null).empty().html(text);
            return dom;
        }
    };
    $.fn.spinner = function (method, option) {
        return methods[method].call(null, $(this).first(), option);
    };
})(jQuery);

/**
 * 消息提示框 - IOTips
 * @dependency: String.prototype.format
 */
(function (window, $, undefined) {
    var COUNTER = 1; //计数器
    var role = 'iotips'; //tag标记
    var ANIMATION = 'clip'; //动画效果 参考jquery-ui.effect
    var ANIMATION_DURATION = 300; //动画效果持续时间
    var DEFAULTS = {
        ns: 'iot-tips', //命名空间
        type: 'error', //消息类型，支持：success | error
        content: '',
        parent: 'body', //容器
        time: 3000, //显示时长，false: 表示不自动关闭
        icon: '', //false: 不显示icon
        overlay: false, //是否需要显示蒙层，形如：['#000', 0.4]
        enableMultiple: false, //是否同时显示多条消息
        zIndex: 20160816, //Z轴高度
        //closable: false, //是否需要手动关闭消息框 *
        onHide: null //回调函数，消息框消失之后的回调
    };
    window.IOTips = function (option) {
        this.id = COUNTER++;
        this.option = $.extend(true, {}, DEFAULTS, option);
    };

    /**
     * 根据消息类型生成消息框class
     * @param option
     * @returns {{clazz: string, icon: string}}
     */
    var genDialogClazz = function (option) {
        var clazz = '', iconClazz = '';
        switch (option.type) {
            case 'success': {
                clazz = 'iotips-success';
                iconClazz = 'icon-ok succ-text';
                break;
            }
            case 'error': {
            }
            default: {
                clazz = 'iotips-error';
                iconClazz = 'icon-warning warning-text';
                break;
            }
        }
        option.icon && (iconClazz = option.icon);
        return {clazz: clazz, icon: iconClazz};
    };

    /**
     * 创建消息框
     * @param option
     */
    var createDialog = function (dtd, option, id) {
        var ns = option.ns,
            domId = [ns, id].join('_'),
            $vDom = $('#' + domId),
            dialogClazz = genDialogClazz(option),
            $content = $('<em class="iotips-content">{0}</em>'.format(option.content)),
            $dialog = $('<div class="iotips-layer {0}-cust-layer {1}"></div>'.format(ns, dialogClazz.clazz)),
            $overlay = '',
            $icon = $('<i class="icon {0}"></i>'.format(dialogClazz.icon));
        $vDom = $vDom.length ? $vDom : $('<div id="{0}" class="iotips-layer-wrapper" data-role="{1}"></div>'.format(domId, role));
        !option.enableMultiple && $('{0} [data-role="{1}"]'.format(option.parent, role)).not('#' + domId).each(function () {
            $(this).remove();
        });
        if (option.overlay && option.overlay.length > 1) {
            var overlayArr = option.overlay;
            $overlay = $('<div class="iotips-layer-overlay {0}-overlay"></div>'.format(ns)).css({
                backgroundColor: overlayArr[0] || '#000',
                opacity: $.isNumeric(overlayArr[1]) ? overlayArr[1] : 0.4
            });
            $vDom.css({
                left: 0,
                top: 0,
                width: '100%',
                height: '100%'
            });
        }
        $vDom.fadeOut(function () {
            $dialog.append($('<div class="iotips-content-wrap"></div>').append($icon).append($content)).css('z-index', option.zIndex);
            $vDom.empty().append($overlay).append($dialog).css('z-index', option.zIndex - 1);
            dtd.resolve($vDom);
        });
        return dtd;
    };
    /**
     * 关闭全部
     */
    IOTips.hideAll = function () {
        $('[data-role="{0}"]'.format(role)).each(function () {
            var instance = $(this).data('instance');
            if (instance instanceof IOTips) {
                instance.hide();
            } else {
                $(this).remove();
            }
        });
    };
    /**
     * 显示消息
     * @param option {Object} 配置项（可选）
     */
    IOTips.prototype.show = function (option) {
        var thiz = this,
            dtd = $.Deferred();
        $.extend(true, thiz.option, option);
        $.when(createDialog(dtd, thiz.option, thiz.id))
            .done(function ($dom) {
                var parent = thiz.option.parent,
                    $parent = $(parent);
                $dom.data('instance', thiz).hide();
                if (parent !== 'body' && parent !== 'html') {
                    $parent.css({
                        position: 'relative'
                    });
                    $dom.css({
                        position: 'absolute'
                    });
                }
                $dom.appendTo($parent).show(ANIMATION, 200);
            })
            .done(function () {
                //开启定时器
                thiz.option.time && setTimeout(function () {
                    thiz.hide();
                }, thiz.option.time);
            });

        return thiz;
    };
    /**
     * 关闭消息框
     */
    IOTips.prototype.hide = function () {
        var thiz = this,
            ns = thiz.option.ns,
            $dom = $('#{0}_{1}'.format(ns, thiz.id));
        $dom.hide(ANIMATION, ANIMATION_DURATION, function () {
            $dom.remove();
            $.isFunction(thiz.option.onHide) && thiz.option.onHide();
        });
    };
})(window, jQuery, undefined);

/**
 * 加载中 - window.IOTLoading
 */
(function (window, $, undefined) {
    var COUNTER = 1;
    var ROLE = 'iotloading'; //tag
    var THEME_SIMPLE = 1; //普通加载框
    var DEFAULTS = {
        ns: 'iot-loading',
        theme: THEME_SIMPLE, //显示风格
        content: '加载中...', //显示的文本（当style=STYLE_SIMPLE时有效）
        spinner: {//spinner图标（当style=STYLE_SIMPLE时有效）参考Spinner.js配置项
            color: '#333',
            lines: 12,
            top: '50%',
            left: '50%'
        },
        overlay: ['#000', 0.4], //是否显示蒙层（当style=STYLE_SIMPLE时有效），形如：['#000', 0.4]，false: 表示不显示
        parent: 'body', //依附的容器
        timeout: 50 * 60 * 1000, //最大等待时长（ms），默认5mins；false：表示永不过期
        enableMultiple: false, //是否允许多个实例同时显示在页面上(同一容器下（当style=STYLE_SIMPLE时有效）)
        onHide: null //回调
    };
    window.IOTLoading = function (option) {
        this.dom = null;
        this.id = COUNTER++;
        this.option = $.extend(true, {}, DEFAULTS, option);
    };
    IOTLoading.THEME_SIMPLE = THEME_SIMPLE;
    /**
     * 获取DOM模板
     * @returns {string}
     */
    var genTemplate = function () {
        var tplArr = [
            '<div class="iot-loading-wrapper" data-role="{0}">'.format(ROLE),
            '<div class="iot-loading-progress">',
            '<div class="progress-inner"></div>',
            '</div>',
            '<div class="iot-loading-activity"></div>',
            '</div>'
        ];
        return tplArr.join('');
    };
    var genSpinnerOption = function ($dom, option) {
        var spinnerOption = option.spinner,
            height = 28,
            radius = height * 0.2,
            length = radius * 0.6,
            width = radius < 7 ? 2 : 3,
            opts = {
                radius: radius,
                length: length,
                width: width,
                zIndex: 'auto'
            };
        return $.extend({}, opts, spinnerOption);
    };
    //创建普通加载框
    var createSimpleDialog = function (dtd, option, id) {
        var $parent = $(option.parent),
            overlay = option.overlay,
            $wrapper = $parent.find('> .iot-loading-wrapper'),
            theme = 'iot-loading-theme-simple';
        if (option.enableMultiple || $wrapper.length < 1) {
            var ns = option.ns,
                domId = [ns, id].join('_'),
                $dom = $(genTemplate()).addClass(theme).attr('id', domId).css('visibility', 'hidden').appendTo($parent),
                $progress = $dom.find('.iot-loading-progress').empty(),
                $spin = $('<span class="iot-loading-spinner"></span>').appendTo($progress),
                $content = $('<em class="iot-loading-content">{0}</em>'.format(option.content)).appendTo($progress);
            //render spinner
            new window.Spinner(genSpinnerOption($progress, option)).spin($spin[0]);
            //render overlay
            if (overlay && overlay.length > 1) {
                $dom.css('pointer-events', 'inherit');
                var $overlay = $('<div class="iot-loading-overlay"></div>').appendTo($dom);
                $overlay.css({
                    backgroundColor: overlay[0],
                    opacity: overlay[1]
                });
            } else {
                $dom.css('pointer-events', 'none');
            }
            $wrapper = $dom;
        } else {
            var $dom = $wrapper.is(':hidden') ? $wrapper.css('visibility', 'hidden').show() : $wrapper,
                $progress = $dom.find('.iot-loading-progress'),
                $spin = $('.iot-loading-spinner', $progress),
                $content = $('.iot-loading-content', $progress).html(option.content);
            //render overlay
            if (overlay && overlay.length > 1) {
                $dom.css('pointer-events', 'inherit');
                var $overlay = $('.iot-loading-overlay', $dom);
                $overlay = $overlay.length ? $overlay : $('<div class="iot-loading-overlay"></div>').appendTo($dom);
                $overlay.css({
                    backgroundColor: overlay[0],
                    opacity: overlay[1]
                });
            } else {
                $dom.css('pointer-events', 'none');
            }
        }
        return $wrapper;
    };

    //创建加载框
    var createDialog = function (dtd, option, id) {
        var $parent = $(option.parent),
            parentPos = $parent.css('position');
        if (option.parent !== 'body' && parentPos === 'static') {
            $parent.css('position', 'relative');
        }
        var calcStyle = function ($dom) {
            //caculate width
            var scale = 0.7;
            var $progress = $dom.find('.iot-loading-progress');
            var currContentWidth = $dom.find('.iot-loading-content').first().css('width');
            $dom.css('height', '100%').css('visibility', '');
            var minWidth = ((parseInt(currContentWidth) + 32) / scale).toFixed(0);
            if (minWidth % 2) {
                minWidth++;
            }
            $progress.css({minWidth: (minWidth + 'px')});
        };
        var adjustPosition = function ($dom) {
            option.parent === 'body' && $dom.css('position', 'fixed');
            $dom.fadeIn();
        };
        var $wrapper = createSimpleDialog(null, option, id);
        calcStyle($wrapper);
        adjustPosition($wrapper);
        return $wrapper;
    };

    IOTLoading.prototype.show = function (option) {
        var thiz = this,
            dtd = $.Deferred();
        thiz.option = $.extend(true, thiz.option, option);
        var $dom = createDialog(dtd, thiz.option, thiz.id);
        //缓存dom节点
        thiz.dom = $dom;
        var domId = $dom.attr('id'),
            timerTag = '{0}_timer'.format(domId);
        //开启超时定时器
        clearTimeout($dom.data(timerTag));
        var timer = thiz.option.timeout && setTimeout(function () {
            thiz.hide();
        }, thiz.option.timeout);
        $dom.data(timerTag, timer);
        return this;
    };

    IOTLoading.prototype.hide = function () {
        this.dom && this.dom.fadeOut(function () {
            $.isFunction(this.option.onHide) && this.option.onHide();
        }.bind(this));
    };

    IOTLoading.prototype.destroy = function () {
        this.dom && this.dom.fadeOut(function () {
            this.dom.remove();
            this.option = null;
            this.id = null;
        }.bind(this));
    };
})(window, jQuery, undefined);

/**
 * 进度条 - window.IOTProgressbar
 */
(function (window, $, undefined) {
    var COUNTER = 1;
    var ROLE = 'IOTProgressbar'; //tag
    var TAG_TIMER = 'IOTProgTimer'; //tag
    var DEFAULTS = {
        ns: 'iot-progress-bar',
        parent: 'body', //依附的容器
        timeout: 50 * 60 * 1000, //最大等待时长（ms），默认5mins；false：表示不超时
        onHide: null //回调
    };
    window.IOTProgressbar = function (option) {
        this.dom = null;
        this.id = COUNTER++;
        this.option = $.extend(true, {}, DEFAULTS, option);
    };

    /**
     * 获取DOM模板
     * @returns {string}
     */
    var genTemplate = function () {
        var tplArr = [
            '<div class="iot-progressbar-wrapper" data-role="{0}">'.format(ROLE),
            '<div class="iot-progressbar-progress">',
            '<div class="progress-inner"></div>',
            '</div>',
            '<div class="iot-progressbar-activity"></div>',
            '</div>'
        ];
        return tplArr.join('');
    };
    //创建导航条加载框
    var createNavbarDialog = function (dtd, option, id) {
        var $parent = $(option.parent),
            theme = 'iot-progressbar-theme-navbar',
            $wrapper = $parent.find('> .{0}'.format(theme));
        if (!$wrapper.length) {
            var ns = option.ns,
                domId = [ns, id].join('_'),
                $dom = $(genTemplate()).addClass(theme).attr('id', domId);
            $dom.find('.iot-progressbar-progress').css('width', 0);
            $dom.appendTo($parent);
            $wrapper = $dom;
            setTimeout(function () {
                dtd.resolve($wrapper);
            }, 0);
        } else {
            $wrapper.show().find('.iot-progressbar-progress').css('width', 0);
            setTimeout(function () {
                dtd.resolve($wrapper, new Error('Cannot create more loading dialog...'));
            }, 0);
        }
        return dtd;
    };

    //创建加载框
    var createDialog = function (dtd, option, id) {
        var $parent = $(option.parent),
            parentPos = $parent.css('position');
        if (option.parent !== 'body' && parentPos === 'static') {
            $parent.css('position', 'relative');
        }
        var promise = $.Deferred();
        $.when(createNavbarDialog(promise, option, id))
            .done(function ($dom) {
                if (option.parent !== 'body') {
                    $dom.css('position', 'absolute');
                } else {
                    $dom.css('position', 'fixed');
                }
                dtd.resolve($dom);
            })
            .fail(function ($dom, err) {
                dtd.reject(err);
            });
        return dtd;
    };

    IOTProgressbar.prototype.show = function () {
        var thiz = this,
            dtd = $.Deferred();
        $.when(createDialog(dtd, thiz.option, thiz.id))
            .done(function ($dom) {
                //缓存dom节点
                thiz.dom = $dom;
                //开启超时定时器
                clearTimeout($dom.data(TAG_TIMER));
                var timer = thiz.option.timeout && setTimeout(function () {
                    thiz.hide();
                }, thiz.option.timeout);
                $dom.data(TAG_TIMER, timer);
            })
            .fail(function (err) {
                console.error(err);
            });
    };

    IOTProgressbar.prototype.hide = function () {
        this.dom && this.dom.fadeOut(function () {
            clearTimeout(this.dom.data(TAG_TIMER));
            $.isFunction(this.option.onHide) && this.option.onHide();
        }.bind(this));
    };

    IOTProgressbar.prototype.destroy = function () {
        this.dom && this.dom.fadeOut(function () {
            clearTimeout(this.dom.data(TAG_TIMER));
            this.dom.remove();
            this.option = null;
        }.bind(this));
    };
    /**
     * 更新进度条
     * 当且仅当theme=THEME_NAVBAR时有效
     * @param{Number} progress 进度（十进制数：0-100）
     */
    IOTProgressbar.prototype.updateProgress = function (progress) {
        if (this.dom) {
            var $dom = this.dom;
            progress = progress > 100 ? 100 : progress;
            $dom.attr('data-progress', progress);
            $dom.find('.iot-progressbar-progress').css('width', (progress + '%'));
        }
        return this;
    };

})(window, jQuery, undefined);

/**
 * 自定义事件
 */
(function (window) {
    function EventEmitter () {
        this._events = {};
    }

    EventEmitter.prototype.on = function (name, listener) {
        var _listeners = this._events[name] || [];
        _listeners.push(listener);
        this._events[name] = _listeners;
        return this;
    };
    EventEmitter.prototype.once = function (name, listener) {
        this._events[name] = [listener];
        return this;
    };
    EventEmitter.prototype.emit = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        var _listeners = this._events[args[0]] || [];
        _listeners.forEach(function (listener) {
            listener.apply(null, Array.prototype.slice.call(args, 1));
        });
        return this;
    };
    EventEmitter.prototype.removeAllListeners = function () {
        this._events = {};
        return this;
    };
    window.EventEmitter = EventEmitter;
})(window);

/**
 * 表单生成
 * $.fn.form_builder_widget
 * @dependency
 */
(function (window, $, undefined) {
    //serialize-row-removable：是否可删除当前字段，默认true
    //serialize-key：字段标识
    var DATA_TAG = 'formBuilder';
    var ENUM_CLAZZ = {
        FORM_BUILDER_WRAPPER: 'form-builder',
        FORM: 'form',
        FORM_ROW: 'form-row',
        FORM_ROW_GROUP: 'form-row-group',
        FORM_LEVEL_1: 'form-level-1',
        FORM_LEVEL_2: 'form-level-2',
        FORM_FIELD_LIST: 'form-field-list',
        FORM_DELETE: 'form-delete',
        FORM_ROW_DELETE: 'form-row-delete',
        FORM_ROW_ADD: 'form-row-add'
    };
    var ENUM_CLAZZ_DOT = {
        FORM_BUILDER_WRAPPER: ['.', ENUM_CLAZZ.FORM_BUILDER_WRAPPER].join(''),
        FORM: ['.', ENUM_CLAZZ.FORM].join(''),
        FORM_ROW: ['.', ENUM_CLAZZ.FORM_ROW].join(''),
        FORM_ROW_GROUP: ['.', ENUM_CLAZZ.FORM_ROW_GROUP].join(''),
        FORM_LEVEL_1: ['.', ENUM_CLAZZ.FORM_LEVEL_1].join(''),
        FORM_LEVEL_2: ['.', ENUM_CLAZZ.FORM_LEVEL_2].join(''),
        FORM_FIELD_LIST: ['.', ENUM_CLAZZ.FORM_FIELD_LIST].join(''),
        FORM_DELETE: ['.', ENUM_CLAZZ.FORM_DELETE].join(''),
        FORM_ROW_DELETE: ['.', ENUM_CLAZZ.FORM_ROW_DELETE].join(''),
        FORM_ROW_ADD: ['.', ENUM_CLAZZ.FORM_ROW_ADD].join('')
    };
    var DEFAULTS = {
        template: '', //节点模板
        onDeleteRow: null,
        onAddRow: null,
        onDeleteForm: null,
        onAddForm: null,
        data: null,
        select_container: false //select插件容器
    };

    var util = {
        setOption: function ($wrap, option) {
            $wrap.data(DATA_TAG, option);
        },
        getOption: function ($wrap) {
            return $wrap.data(DATA_TAG);
        },
        getTemplate: function ($wrap) {
            var option = this.getOption($wrap) || {};
            return option.template;
        },
        getFieldRow: function ($wrap) {
            var template = util.getTemplate($wrap);
            var $template = $(template);
            var $row = $(ENUM_CLAZZ_DOT.FORM_ROW, $template).first();
            return $row;
        }
    };

    var ui = {
        /**
         * 生成form模块
         * @param dom
         * @param data
         */
        genFormModule: function (dom, data) {
            var tpl = util.getTemplate(dom);
            data = $.isPlainObject(data) ? [data] : ($.isArray(data) ? data : []);
            if (data.length) {
                $.each(data, function (i, formBean) {
                    var $template = $(tpl);
                    ui.genLevelOneFields($template, formBean);
                    ui.genLevelTwoFields($template, formBean);
                    dom.append($template);
                });
            } else {
                dom.append($(tpl));
            }
        },
        /**
         * 生成form-level-1中的字段
         * @param $wrap
         * @param bean
         */
        genLevelOneFields: function ($wrap, bean) {
            var $formLevelOne = $wrap.find(ENUM_CLAZZ_DOT.FORM_LEVEL_1);
            $.each(bean, function (key, value) {
                var $field = $('[serialize-level-key="{0}"]'.format(key), $formLevelOne);
                $field.length && $field.val(value);
            });
        },
        /**
         * 生成form-level-2中的字段
         * @param $wrap
         * @param bean
         */
        genLevelTwoFields: function ($wrap, bean) {
            var $formLevelTwo = $wrap.find(ENUM_CLAZZ_DOT.FORM_LEVEL_2);
            var identity = $formLevelTwo.attr('serialize-level2-identity') || 'fields';
            var $formFieldList = $formLevelTwo.find(ENUM_CLAZZ_DOT.FORM_FIELD_LIST);
            var $formRow = $formFieldList.find(ENUM_CLAZZ_DOT.FORM_ROW).remove();
            $.each(bean, function (key, value) {
                if (key === identity) {
                    $.each(value, function (i, field) {
                        //渲染form-row
                        var $formRowCloned = $formRow.clone().appendTo($formFieldList);
                        $.each(field, function (ckey, cvalue) {
                            var $field = $('[serialize-level2-key="{0}"]'.format(ckey), $formRowCloned);
                            $field.length && $field.val(cvalue);
                        });
                    });
                } else {
                    var $field = $('[serialize-level2-key="{0}"]'.format(key), $formLevelTwo);
                    $field.length && $field.val(value);
                }
            });
        },
        /**
         * 添加新行
         * @param $row 对应form-row
         */
        addFieldRow: function ($row) {
            var $wrap = $row.parents(ENUM_CLAZZ_DOT.FORM_BUILDER_WRAPPER).first(),
                $form = $row.parents(ENUM_CLAZZ_DOT.FORM).first(),
                $parent = $row.parents(ENUM_CLAZZ_DOT.FORM_FIELD_LIST),
                //$rowCloned = $row.clone();
                $rowCloned = util.getFieldRow($wrap);
            //clear data
            $('[serialize-level2-key]', $rowCloned).each(function () {
                $(this).val('');
            });
            $parent.append($rowCloned);
            ui._renderSelector();
            ui.refreshFieldIcon(undefined, $form);
        },
        /**
         * 删除给定行
         * @param $row
         */
        deleteFieldRow: function ($row) {
            var $form = $row.parents(ENUM_CLAZZ_DOT.FORM).first();
            //remove node
            $row.remove();
            ui.refreshFieldIcon(undefined, $form);
        },
        /**
         * 删除表单模块
         * @param $form
         */
        deleteFormModule: function ($form) {
            var $wrap = $form.parents(ENUM_CLAZZ_DOT.FORM_BUILDER_WRAPPER);
            //remove node
            $form.remove();
            ui.refreshFormLevelIcon($wrap);
        },
        /**
         * 渲染icon样式
         * @param $form
         * @private
         */
        _renderFieldIcon: function ($form) {
            $form.each(function () {
                var $form = $(this),
                    $formFieldList = $form.find(ENUM_CLAZZ_DOT.FORM_FIELD_LIST),
                    $formRow = $formFieldList.find(ENUM_CLAZZ_DOT.FORM_ROW),
                    length = $formRow.length;
                if (length > 1) {
                    var end = length - 1;
                    $formRow.each(function (i) {
                        var $thiz = $(this),
                            $iconDelete = $thiz.find(ENUM_CLAZZ_DOT.FORM_ROW_DELETE),
                            $iconAdd = $thiz.find(ENUM_CLAZZ_DOT.FORM_ROW_ADD);
                        if (i === end) {// last one
                            $iconDelete.removeClass('disabled').removeClass('hide');
                            $iconAdd.removeClass('disabled').removeClass('hide');
                        } else {
                            $iconDelete.removeClass('disabled').removeClass('hide');
                            $iconAdd.addClass('hide');
                        }
                    });
                } else if (length === 1) {
                    var $iconDelete = $(ENUM_CLAZZ_DOT.FORM_ROW_DELETE, $formRow),
                        $iconAdd = $(ENUM_CLAZZ_DOT.FORM_ROW_ADD, $formRow);
                    $iconAdd.removeClass('disabled').removeClass('hide');
                    $iconDelete.addClass('disabled').removeClass('hide');
                } else {
                    //do nothing
                }
            });
        },
        /**
         * 更新 form-field-list中的icon样式
         * @param $wrap
         * @param $form
         */
        refreshFieldIcon: function ($wrap, $form) {
            if ($form) {
                ui._renderFieldIcon($form);
            } else {
                ui._renderFieldIcon($wrap.find(ENUM_CLAZZ_DOT.FORM));
            }
        },
        /**
         * 更新 form-level-1中的icon样式
         * @param $wrap
         */
        refreshFormLevelIcon: function ($wrap) {
            var $form = $wrap.find(ENUM_CLAZZ_DOT.FORM),
                length = $form.length;
            if (length > 1) {
                $form.each(function () {
                    $form.find(ENUM_CLAZZ_DOT.FORM_DELETE).removeClass('disabled');
                });
            } else if (length === 1) {
                $form.find(ENUM_CLAZZ_DOT.FORM_DELETE).addClass('disabled');
            } else {
                //do nothing
            }

        },
        /**
         * 初始化select节点
         * @private
         */
        _renderSelector: function () {
            var $select = $('{0} .selectpicker'.format(ENUM_CLAZZ_DOT.FORM_BUILDER_WRAPPER));
            var container = $select.data('selectContainer');
            $select.selectpicker({
                width: '100px',
                showTick: true,
                container: container || false
            });
        },
        bindEvent: function ($wrap) {
            var clazzFormDelete = '{0} {1}:not(.disabled)'.format(ENUM_CLAZZ_DOT.FORM_LEVEL_1, ENUM_CLAZZ_DOT.FORM_DELETE);
            var clazzFormRowDelete = '{0} {1}:not(.disabled)'.format(ENUM_CLAZZ_DOT.FORM_LEVEL_2, ENUM_CLAZZ_DOT.FORM_ROW_DELETE);
            var clazzFormRowAdd = '{0} {1}:not(.disabled)'.format(ENUM_CLAZZ_DOT.FORM_LEVEL_2, ENUM_CLAZZ_DOT.FORM_ROW_ADD);
            //删除 form-delete
            $wrap.off('click.formBuilder', clazzFormDelete).on(
                'click.formBuilder',
                clazzFormDelete,
                function (e) {
                    var $thiz = $(this),
                        $form = $thiz.parents(ENUM_CLAZZ_DOT.FORM),
                        $wrap = $thiz.parents(ENUM_CLAZZ_DOT.FORM_BUILDER_WRAPPER);
                    ui.deleteFormModule($form);
                    var option = util.getOption($wrap);
                    $.isFunction(option.onDeleteForm) && option.onDeleteForm($form);
                });
            //删除 form-row-delete
            $wrap.off('click.formBuilder', clazzFormRowDelete).on(
                'click.formBuilder',
                clazzFormRowDelete,
                function (e) {
                    var $thiz = $(this),
                        $row = $thiz.parents(ENUM_CLAZZ_DOT.FORM_ROW),
                        $wrap = $thiz.parents(ENUM_CLAZZ_DOT.FORM_BUILDER_WRAPPER);
                    ui.deleteFieldRow($row);
                    var option = util.getOption($wrap);
                    $.isFunction(option.onDeleteRow) && option.onDeleteRow($row);
                });
            //添加 form-row-add
            $wrap.off('click.formBuilder', clazzFormRowAdd).on(
                'click.formBuilder',
                clazzFormRowAdd,
                function (e) {
                    var $thiz = $(this),
                        $row = $thiz.parents(ENUM_CLAZZ_DOT.FORM_ROW),
                        $wrap = $thiz.parents(ENUM_CLAZZ_DOT.FORM_BUILDER_WRAPPER);
                    ui.addFieldRow($row);
                    var option = util.getOption($wrap);
                    $.isFunction(option.onAddRow) && option.onAddRow($row);
                });
        }
    };

    /**
     * Grammer Sugar
     * @param wrap
     * @constructor
     */
    function FormBuilderWidget (wrap) {
        this._wrap = wrap;
    }

    FormBuilderWidget.prototype = {
        /**
         * 添加表单
         * @param data
         * @param cb
         * @returns {*}
         */
        add: function (data, cb) {
            return methods['add'].apply(this._wrap, arguments);
        },
        /**
         * 序列化
         * @returns {*}
         */
        serializeJSON: function () {
            return methods['serializeJSON'].apply(this._wrap, arguments);
        },
        /**
         * 对象比较
         */
        compareWithOriginalStatus: function () {
            return methods['compareWithOriginalStatus'].apply(this._wrap, arguments);
        },
        /**
         * 销毁
         */
        destroy: function () {
            methods['destroy'].apply(this._wrap, arguments);
        }
    };
    var methods = {
        /**
         * 初始化
         * @param option
         * @param cb
         * @returns {*|HTMLElement}
         */
        init: function (option, cb) {
            option = $.extend(true, {}, DEFAULTS, option);
            var $thiz = $(this),
                dtd = $.Deferred();
            $.when(function (dtd, option, dom) {
                if (!option.template) {
                    dtd.reject('option[template] is not defined!');
                }
                util.setOption(dom, option);
                dom.addClass(ENUM_CLAZZ.FORM_BUILDER_WRAPPER);
                ui.genFormModule(dom, option.data);
                dtd.resolve();
                return dtd;
            }(dtd, option, $thiz))
                .done(function () {
                    ui.bindEvent($thiz);
                    ui.refreshFieldIcon($thiz);
                    ui.refreshFormLevelIcon($thiz);
                    ui._renderSelector();
                    $.isFunction(cb) && cb();
                })
                .fail(function (msg) {
                    throw msg;
                });
            return new FormBuilderWidget($thiz);
        },
        /**
         * 创建新表单
         * @param data 参考option.data
         * @param cb
         */
        add: function (data, cb) {
            var $thiz = $(this);
            if ($.isFunction(data)) {
                cb = data;
                data = [];
            }
            $.when(function (dom, data) {
                var dtd = $.Deferred();
                ui.genFormModule($thiz, data);
                dtd.resolve();
                return dtd;
            }($thiz, data))
                .done(function () {
                    ui.refreshFieldIcon($thiz);
                    ui.refreshFormLevelIcon($thiz);
                    var option = util.getOption($thiz);
                    ui._renderSelector();
                    $.isFunction(option.onAddForm) && option.onAddForm();
                    $.isFunction(cb) && cb();
                });
            return $thiz;
        },
        /**
         * 序列化
         */
        serializeJSON: function () {
            var res = [];
            $(this).find(ENUM_CLAZZ_DOT.FORM).each(function () {
                var bean = {},
                    $form = $(this),
                    $formLevelOne = $(ENUM_CLAZZ_DOT.FORM_LEVEL_1, $form),
                    $formLevelTwo = $(ENUM_CLAZZ_DOT.FORM_LEVEL_2, $form),
                    $formFieldList = $(ENUM_CLAZZ_DOT.FORM_FIELD_LIST, $form),
                    identity = $formLevelTwo.attr('serialize-level2-identity') || 'fields';
                //serialize level-1
                $formLevelOne.find('[serialize-level-key]').each(function () {
                    var key = $(this).attr('serialize-level-key'),
                        value = $(this).val();
                    bean[key] = $.trim(value);
                });
                //serialize level-2 fields
                var fields = bean[identity] = [];
                $formFieldList.find(ENUM_CLAZZ_DOT.FORM_ROW).each(function () {
                    var row = {};
                    $(this).find('[serialize-level2-key]').each(function () {
                        var key = $(this).attr('serialize-level2-key'),
                            value = $(this).val();
                        row[key] = $.trim(value);
                    });
                    fields.push(row);
                });
                //serialize level-2 non-fields
                $formLevelTwo.find(ENUM_CLAZZ_DOT.FORM_ROW_GROUP).not($formFieldList).each(function () {
                    $(this).find('[serialize-level2-key]').each(function () {
                        var key = $(this).attr('serialize-level2-key'),
                            value = $(this).val();
                        bean[key] = $.trim(value);
                    });
                });
                //push
                res.push(bean);
            });
            return res;
        },
        /**
         * 将当前数据状态与初始化时的状态作比较
         * @param{function} comparator 比较算法，形如：function(currStatus, originalStatus){}
         */
        compareWithOriginalStatus: function (comparator) {
            var $thiz = $(this),
                currStatus = methods['serializeJSON'].apply($thiz),
                originalStatus = util.getOption($thiz).data,
                result = {};
            result = comparator.call(null, currStatus, originalStatus);
            return result;
        },
        /**
         * 销毁实例
         */
        destroy: function () {
            $(this).removeData(DATA_TAG)
                .removeClass(ENUM_CLAZZ.FORM_BUILDER_WRAPPER)
                .find(ENUM_CLAZZ_DOT.FORM).remove();
            return this;
        }
    };
    $.fn.form_builder_widget = function (method, option) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ($.isPlainObject(method)) {
            return methods['init'].apply(this, arguments);
        } else {
            throw new Error('Method[' + (method) + '] is not supported!');
        }
    };
})(window, jQuery, undefined);

/**
 * 验证码 - window.IOTCaptcha
 * 包含图片验证码和短信验证码两种，默认为图片验证码
 */
(function (window, $) {
    var MODES = {captcha: 0, sms: 1},//验证码模式，图片验证码，短信验证码
        defaultOption = {
            mode: MODES.captcha,
            url: '',
            captchaDom: '',//'#id'，'.className'
            codeBtnDom: '',
            internalSeconds: 60,//获取短信验证码的请求间隔
            paramDomId: ''
        };

    $.fn.IOTCaptcha = function (option, getSmsFunc) {
        var $wrap = this;
        setTimeout(function () {
            $.extend(defaultOption, option);
            _init($wrap, getSmsFunc);
        }, 500);
    };

    var _init = function ($wrap, getSmsFunc) {
        switch (defaultOption.mode) {
            default:
            case MODES.captcha:
                _bindEvent4Captcha($wrap);
                break;
            case MODES.sms:
                _bindEvent4SmsCode($wrap, getSmsFunc);
                break;
        }
    };

    var _bindEvent4Captcha = function ($wrap) {
        var $dom = $(defaultOption.captchaDom, $wrap);
        var url = defaultOption.url;
        $dom.bind('click', function () {
            var src = url + '?time=' + Date.now();
            $dom.attr('src', src); // reload the img source
        });
    };

    var _bindEvent4SmsCode = function ($wrap, getSmsFunc) {
        var $dom = $(defaultOption.codeBtnDom, $wrap);
        var url = defaultOption.url;
        $dom.bind('click', function () {
            $.isFunction(getSmsFunc) && getSmsFunc($wrap, url);
            // _getSmsCode(url);
        });
    };

    //todo
    // var _getSmsCode = function (url) {
    //     var $dom = $('#' + defaultOption.paramDomId);
    //     if(!defaultOption.paramDomId || $dom.length <= 0) {
    //         IOT.tips('缺少获取验证码所必要的参数字段', 'error', 1500, null);
    //         return false;
    //     }
    //
    //     if($dom.validationEngine('validate')){
    //         //设定时间间隔内不可重复点击
    //         _disableGetCodeBtn(defaultOption.internalSeconds);
    //         var data = $dom.serialize();
    //         IOT.getServerData(url, data, function (ret) {
    //                 if (ret.code === 200) {
    //                     IOT.tips(ret.msg || '验证码已发送，请注意查收', 'success', 1500, null);
    //                 } else {
    //                     IOT.tips(ret.error || '验证码发送失败，请稍后重试', 'error', 1500, null);
    //                 }
    //             }
    //         );
    //     }
    //     return false;
    // };
    //
    // //验证码发送后count秒内不允许多次点击发送
    // var _disableGetCodeBtn = function (count) {
    //     var countdown = setInterval(CountDown, 1000);
    //     function CountDown() {
    //         codeDOM.attr("disabled", true);
    //         codeDOM.val(count + " 秒后重试");
    //         if (count == 0) {
    //             codeDOM.attr("disabled", false);
    //             defaultOption && codeDOM.val(defaultOption.codeBtnText);
    //             clearInterval(countdown);
    //         }
    //         count--;
    //     }
    // }
})(window, jQuery);

// session manage plugin
(function (window, $) {
    var dataTag = 'sessionManageData';
    var sessionManageTimer = null; //session计时定时器
    var alarmCounterTimer = null; //告警倒计数定时器
    var resetRunTimerFlag = false; //插件充值开关
    var ANIMATION = 'clip'; //动画效果 参考jquery-ui.effect
    var ANIMATION_DURATION = 300; //动画效果持续时间
    var notifyFlag = true; //html5 Notifycation开关标志位
    var notifyInstance = null;
    var defaultOption = {
        sessionValidTime: 30 * 60, //session 有效时间
        alarmTime: 5 * 60, //告警时间
        differenceTime: 2 * 60, //客户端和服务器端session计算差异时间
        alarmDialogDom: '#session_message_layer',
        alarmCounterDom: '#session_remain_time',
        sessionTimeoutCallback: undefined,
        keepSessionCallback: undefined
    };

    //开启session计时定时器
    var startSessionManageTimer = function ($wrap, option) {
        destorySessionManageTimer();
        sessionManageTimer = setTimeout(function () {
            if (notifyFlag && 'Notification' in window) {
                showNotify(option, function () {
                    showSessionAlarmDialog($wrap, option);
                    startAlarmCounterTimer($wrap, option);
                });
            } else {
                showSessionAlarmDialog($wrap, option);
                startAlarmCounterTimer($wrap, option);
            }
        }, (option.sessionValidTime - option.alarmTime - option.differenceTime) * 1000);
    };

    //销毁session计时定时器
    var destorySessionManageTimer = function () {
        if (sessionManageTimer != null) {
            clearTimeout(sessionManageTimer);
            sessionManageTimer = null;
        }
    };

    //开启告警倒计数定时器
    var startAlarmCounterTimer = function ($wrap, option) {
        destoryAlarmCounterTimer();
        var counterDom = $(option.alarmCounterDom, $wrap);
        var counter = option.alarmTime;

        alarmCounterTimer = setInterval(function () {
            var currCounter = --counter;
            counterDom.text(currCounter);
            if (counter == 0) {
                resetRunTimerFlag = false;
                var cb = option.sessionTimeoutCallback;
                $.isFunction(cb) && cb();
            }
        }, 1000);
    };

    var showNotify = function (option, showMessage) {
        Notification.requestPermission(function (status) {
            if (status == 'granted') {
                if (notifyInstance == null) {
                    notifyInstance = new Notification('智慧平台-温馨提示', {
                        icon: 'img/message.ico',
                        body: '智慧平台系统会话即将过期!'
                    });
                    notifyInstance.onshow = function () {
                        destoryAlarmCounterTimer();
                        var counter = option.alarmTime;
                        alarmCounterTimer = setInterval(function () {
                            if (--counter == 0) {
                                resetRunTimerFlag = false;
                                var cb = option.sessionTimeoutCallback;
                                $.isFunction(cb) && cb();
                            }
                        }, 1000);
                    };
                    notifyInstance.onclick = function () {
                        var cb = option.keepSessionCallback;
                        $.isFunction(cb) && cb();
                    };
                }
            } else {
                showMessage();
            }
        });
    };

    //销毁告警倒计数定时器
    var destoryAlarmCounterTimer = function () {
        if (alarmCounterTimer != null) {
            clearTimeout(alarmCounterTimer);
            alarmCounterTimer = null;
        }
    };

    //显示session告警窗口
    var showSessionAlarmDialog = function ($wrap, option) {
        var dialogDom = $(option.alarmDialogDom, $wrap);
        if (!dialogDom || dialogDom.length <= 0) {
            var arr = [
                '<div class="session-message-layer" id="session_message_layer" style="display: none;">',
                '<div class="session-message-header">温馨提示</div>',
                '<div class="session-message-content">',
                '<p>智慧平台会话即将过期，还剩：<span id="session_remain_time" class="session-remain-time"></span>&nbsp;s</p>',
                '<p><button type="button" class="btn btn-default" id="keep_session_btn">保持会话</button></p>',
                '</div>',
                '</div>'
            ];
            dialogDom = $(arr.join('')).appendTo($wrap.find('#homepage'));
            $('#keep_session_btn', dialogDom).off('click').on('click', function () {
                var cb = option.keepSessionCallback;
                $.isFunction(cb) && cb();
            });
        }
        dialogDom.show(ANIMATION, ANIMATION_DURATION, function () {
            var counterDom = $(option.alarmCounterDom, $wrap);
            var counter = option.alarmTime;
            counterDom.text(counter);
        });
    };

    //隐藏session告警窗口
    var hideSessionAlarmDialog = function ($wrap, option) {
        if (notifyInstance != null) {
            notifyInstance.close();
            notifyInstance = null;
        }
        var dialogDom = $(option.alarmDialogDom, $wrap);
        if (dialogDom && dialogDom.length > 0) {
            dialogDom.hide(ANIMATION, ANIMATION_DURATION);
        }
    };

    var methods = {
        start: function ($wrap, option) {
            if (resetRunTimerFlag == false) {
                resetRunTimerFlag = true;
                // 缓存插件参数
                var options = $.extend(true, {}, defaultOption, option);
                $wrap.data(dataTag, {options: options});
                startSessionManageTimer($wrap, options);
            }
        },
        reset: function ($wrap, option) {
            if (resetRunTimerFlag == true) {
                var options = $wrap.data(dataTag).options;
                destorySessionManageTimer($wrap, options);
                destoryAlarmCounterTimer($wrap, options);
                hideSessionAlarmDialog($wrap, options);
                startSessionManageTimer($wrap, options);
            }
        },
        destory: function ($wrap, option) {
            var options = $wrap.data(dataTag).options;
            destorySessionManageTimer($wrap, options);
            destoryAlarmCounterTimer($wrap, options);
            hideSessionAlarmDialog($wrap, options);
        }
    };
    $.fn.sessionManagePlugin = function (method, option) {
        var $wrap = $(this);
        if (methods[method]) {
            return methods[method].call(methods, $wrap, option);
        } else {
            throw new Error('Method[' + (method) + '] is not supported!');
        }
    };
})(window, jQuery);

(function () {

    $.extend($.ui.position, {
        enflip: {
            left: function (position, data) {
                var within = data.within,
                    withinOffset = within.offset.left + within.scrollLeft,
                    outerWidth = within.width,
                    offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                    collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                    overLeft = collisionPosLeft - offsetLeft,
                    overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                    myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0,
                    atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0,
                    offset = -2 * data.offset[0],
                    newOverRight,
                    newOverLeft;

                var $elem = $(data.elem).removeData('flipLeft');

                if (overLeft < 0) {
                    newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
                        outerWidth - withinOffset;
                    if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                        position.left += myOffset + atOffset + offset;
                        $elem.data('flipLeft', true);
                    }
                } else if (overRight > 0) {
                    newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
                        atOffset + offset - offsetLeft;
                    if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                        position.left += myOffset + atOffset + offset;
                        $elem.data('flipLeft', true);
                    }
                }
            },
            top: function (position, data) {
                var within = data.within,
                    withinOffset = within.offset.top + within.scrollTop,
                    outerHeight = within.height,
                    offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                    collisionPosTop = position.top - data.collisionPosition.marginTop,
                    overTop = collisionPosTop - offsetTop,
                    overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                    top = data.my[1] === 'top',
                    myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0,
                    atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0,
                    offset = -2 * data.offset[1],
                    newOverTop,
                    newOverBottom;

                var $elem = $(data.elem).removeData('flipTop');

                if (overTop < 0) {
                    newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
                        outerHeight - withinOffset;
                    if (newOverBottom < 0 || newOverBottom < Math.abs(overTop)) {
                        position.top += myOffset + atOffset + offset;
                        $elem.data('flipTop', true);
                    }
                } else if (overBottom > 0) {
                    newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
                        offset - offsetTop;
                    if (newOverTop > 0 || Math.abs(newOverTop) < overBottom) {
                        position.top += myOffset + atOffset + offset;
                        $elem.data('flipTop', true);
                    }
                }
            }
        }
    });

    /**
     * ISSUES:
     *  #1-当父元素为flex定位时，子元素为fixed定位时，在FF中会有页面抖动
     */
    $.widget('ui.tooltips', {
        version: '1.12.1',
        options: {
            template: '<div class="tooltips"><div class="tooltips-arrow"></div><div class="tooltips-inner"></div></div>',
            tooltipsClass: 'iot-tooltips',
            content: function (done) { //提示框显示内容
                done.call(this, $(this).attr('title'));
            },
            container: '', //提示框依附的容器
            position: {//提示框出现的位置 具体配置请参考jqueryui-position
                my: 'left top+20',
                at: 'left top',
                collision: 'enflip'
            },
            selector: '[title]:not([disabled])', //选择器
            trigger: 'hover', //事件触发方式
            arrow: true, //显示带箭头的提示框（template属性中必须含有[div.tooltips-arrow]元素）
            animation: false, //提示框显示或隐藏时会有过渡效果
            showOnlyOnTextOverflow: true, //当前仅当文字溢出时才显示提示框
            track: false, //提示框是否跟随鼠标移动
            create: null, //回调
            close: null, //回调
            open: null //回调
        },
        ENUM_POSITION: {
            AUTO: 'auto',
            LEFT: 'left',
            RIGHT: 'right',
            TOP: 'top',
            BOTTOM: 'bottom'
        },
        _genPanel: function () {
            return $(this.options.template).addClass(this.options.tooltipsClass).uniqueId();
        },
        _genContainer: function ($target) {
            var $container = $(this.options.container);
            //$container = $container.length ? $container : $target.parent();// 若container不存在则使用parentNode
            return $container;
        },
        _genContent: function ($target) {
            var promise = $.Deferred(),
                _content = this.options.content;
            if ($.isFunction(_content)) {
                _content.call($target, function (content) {
                    promise.resolve(content);
                });
            } else {
                promise.resolve(_content);
            }

            return promise;
        },
        _genEventMaps: function () {
            var maps = {},
                trigger = this.options.trigger,
                selector = this.options.selector;
            $.each(trigger.split(/\s/), function (i, event) {
                //event = event.replace(':', ' ');
                event = [event, selector || ''].join(' ');
                maps[event] = 'open';
            });
            return maps;
        },
        _refreshPosition: function ($panel, $target) {
            var arrow = this._getTargetAttr($target, 'arrow') || this.options.arrow;
            var opt = {
                of: $target,
                using: function (props, feedback) {
                    var $panel = $(feedback.element.element);
                    var $target = $(feedback.target.element);
                    var $arrow = $panel.find('.tooltips-arrow').hide();
                    if (!!arrow) {
                        //显示箭头
                        var direction = arrow,//箭头指向
                            flipLeft = $panel.data('flipLeft'),
                            flipTop = $panel.data('flipTop'),
                            arrowClazz = ['arrow-', direction].join(''),
                            arrowLeft = $target.attr('tooltips-arrow-left'),
                            arrowTop = $target.attr('tooltips-arrow-top'),
                            left = typeof (arrowLeft) === 'undefined' ? '' : arrowLeft.match(/\d+%$/) ? arrowLeft : parseInt(arrowLeft),
                            top = typeof (arrowTop) === 'undefined' ? '' : arrowTop.match(/\d+%$/) ? arrowTop : parseInt(arrowTop);

                        //反转
                        if (flipLeft || flipTop) {
                            switch (direction) {
                                case 'up': {
                                    flipTop && (arrowClazz = 'arrow-down');
                                    break;
                                }
                                case 'down': {
                                    flipTop && (arrowClazz = 'arrow-up');
                                    break;
                                }
                                case 'left': {
                                    flipLeft && (arrowClazz = 'arrow-right');
                                    break;
                                }
                                case 'right': {
                                    flipLeft && (arrowClazz = 'arrow-left');
                                    break;
                                }
                            }
                        }

                        $arrow.removeClass('arrow-up arrow-down arrow-left arrow-right')
                            .addClass(arrowClazz)
                            .css({left: left, top: top})
                            .show();
                    }
                    $(this).offset(props);
                }
            };
            var nodeOpt = {
                my: this._getTargetAttr($target, 'my'),
                at: this._getTargetAttr($target, 'at')
            };
            var position = $.extend(true, {}, this.options.position, opt, nodeOpt);
            $panel.position(position);
        },
        _create: function () {//入口
            this.$panel = this._genPanel().hide().appendTo(this._genContainer());
            this._on(this._genEventMaps());
        },
        _registerCloseHandlers: function (e, $target) {
            this._on(true, $target, {
                mouseleave: 'close',
                mouseup: 'close',
                mousewheel: 'close'
            });
        },
        _isTextOverflow: function ($target) {
            return $target.get(0).scrollWidth > $target.width();
        },
        _getTargetAttr: function ($target, attr) {
            return $target.attr(['tooltips', attr].join('-'));
        },
        open: function (event) {
            var thiz = this,
                $panel = this.$panel,
                $arrow = $panel.find('.tooltips-arrow').hide(),
                $target = $(event ? event.target : this.element).closest(this.options.selector || '[title]');

            if (!$target.length || $target.data('is-open')) {
                return;
            }
            $target.data('is-open', true);
            $.when(thiz._genContent($target))
                .done(function (content) {
                    //显示内容
                    $panel.find('.tooltips-inner').text(content);
                    //提示框出现的位置
                    thiz._refreshPosition($panel, $target);
                    //注册关闭事件
                    thiz._registerCloseHandlers(event, $target);
                })
                .done(function () {
                    //优先级: DOM attr > options.showOnlyOnTextOverflow
                    var showOnlyTextOverflow = thiz._getTargetAttr($target, 'showonlyontextoverflow');
                    if (showOnlyTextOverflow === 'false') {
                        $panel.show();
                    } else if (showOnlyTextOverflow === 'true' || thiz.options.showOnlyOnTextOverflow) {
                        thiz._isTextOverflow($target) && $panel.show();
                    } else {
                        $panel.show();
                    }
                });
        },
        close: function (event) {
            var $target = $(event ? event.currentTarget : this.element);
            $target.removeData('is-open');
            this._off($target, ['mouseup', 'mouseleave', 'mousewheel', this.options.trigger].join(' '));
            this.$panel.hide().css({left: '', top: ''});
        },
        destroy: function (e) {
            this.$panel = null;
        }
    });
})();

(function ($) {
    //全局ajax控制
    $.ajaxPrefilter(function (options) {
        options.url = encodeURI(options.url.replace(/^\//, ''));
        options.headers = {
            'non-guest': IOT._isNonGuest()
        };
    });
})(jQuery);

window.IOT = {
    /**
     * 检测客户段浏览器版本
     * @returns {*}
     */
    checkBrowserVersion: function () {
        var userAgent = navigator.userAgent,
            rMsie = /(msie\s|trident\/7)([\w.]+)/,
            rTrident = /(trident)\/([\w.]+)/,
            rFirefox = /(firefox)\/([\w.]+)/,
            rOpera = /(opera).+version\/([\w.]+)/,
            rNewOpera = /(opr)\/(.+)/,
            rChrome = /(chrome)\/([\w.]+)/,
            rSafari = /version\/([\w.]+).*(safari)/;
        var matchBS, matchBS2;
        var ua = userAgent.toLowerCase();

        matchBS = rMsie.exec(ua);
        if (matchBS != null) {
            matchBS2 = rTrident.exec(ua);
            if (matchBS2 != null) {
                switch (matchBS2[2]) {
                    case '4.0':
                        return {
                            browser: 'IE',
                            version: '8'
                        };
                        break;
                    case '5.0':
                        return {
                            browser: 'IE',
                            version: '9'
                        };
                        break;
                    case '6.0':
                        return {
                            browser: 'IE',
                            version: '10'
                        };
                        break;
                    case '7.0':
                        return {
                            browser: 'IE',
                            version: '11'
                        };
                        break;
                    default:
                        return {
                            browser: 'IE',
                            version: 'undefined'
                        };
                }
            } else return {
                browser: 'IE',
                version: matchBS[2] || '0'
            };
        }
        matchBS = rFirefox.exec(ua);
        if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
            return {
                browser: matchBS[1] || '',
                version: matchBS[2] || '0'
            };
        }
        matchBS = rOpera.exec(ua);
        if ((matchBS != null) && (!(window.attachEvent))) {
            return {
                browser: matchBS[1] || '',
                version: matchBS[2] || '0'
            };
        }
        matchBS = rChrome.exec(ua);
        if ((matchBS != null) && ( !!(window.chrome)) && (!(window.attachEvent))) {
            matchBS2 = rNewOpera.exec(ua);
            if (matchBS2 == null) return {
                browser: matchBS[1] || '',
                version: matchBS[2] || '0'
            };
            else return {
                browser: 'Opera',
                version: matchBS2[2] || '0'
            };
        }
        matchBS = rSafari.exec(ua);
        if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
            return {
                browser: matchBS[2] || '',
                version: matchBS[1] || '0'
            };
        }
        if (matchBS != null) {
            return {
                browser: 'undefined',
                version: ' browser'
            };
        }
    },
    /**
     * 向服务器端发送请求
     * @param url 请求地址（相对路径）
     * @param param 参数（支持JSON格式或表单序列化参数）
     * @param success 可选，成功时回调；此字段为空表示使用同步请求。
     * @param fail 可选，失败时回调
     * @param overlay 可选，格式：{enable:false, overlay:['#ccc', 0.6], content:'数据查询中...'}；默认不开启overlay
     */
    getServerData: function (url, param, success, fail, overlay) {
        var suppression = $.extend(true, {content: '处理中...'}, overlay);
        suppression.enable && (IOT.showOverlay(suppression));
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            async: $.isFunction(success),
            data: param
        }).done(function (data) {
            // session manage plugin reset
            $('body').sessionManagePlugin('reset');
            if ($.isFunction(success)) {
                success(data);
            } else {
                return data;
            }
        }).error(function (xhr) {
            if ($.isFunction(fail)) {
                fail(xhr);
            } else {
                IOT.handleXHRError(xhr);
            }
        }).complete(function () {
            IOT.hideOverlay();
        });
    },

    uploadFormData: function (url, param, success, fail, overlay) {
        var suppression = $.extend(true, {content: '处理中...'}, overlay);
        suppression.enable && (IOT.showOverlay(suppression));
        var formData = new FormData();
        for (let key in param) {
            formData.append(key, param[key]);
        }
        return $.ajax({
            url: url,
            type: 'POST',
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            data: formData
        }).done(function (data) {
            // session manage plugin reset
            $('body').sessionManagePlugin('reset');
            if ($.isFunction(success)) {
                success(data);
            } else {
                return data;
            }
        }).error(function (xhr) {
            if ($.isFunction(fail)) {
                fail(xhr);
            } else {
                IOT.handleXHRError(xhr);
            }
        }).complete(function () {
            IOT.hideOverlay();
        });
    },
    /**
     * 显示模态框(可以满足大部分需求)
     * @param title {String}
     * @param content {String|Function}
     * @param width {Number}
     * @param height {Number}
     * @param buttons [{click:null, text:'', clazz:'', hotkey:null, enabled:true}]
     * @param onshown {Function} 模态框渲染完成后立即调用
     * @return {{BootstrapDialog}}
     */
    displayDefaultDialog: function (title, content, width, height, buttons, onshown) {
        var btnArr = [], opts = {
            cssClass: 'light-theme',
            title: title,
            message: content,
            nl2br: false,
            size: BootstrapDialog.SIZE_CUSTOM,
            width: (width || 500) + 'px',
            height: (height || 370) + 'px',
            draggable: true,
            closable: true,
            closeByBackdrop: false,
            buttons: []
        };

        (buttons || []).forEach(function (item) {
            btnArr.push({
                action: $.isFunction(item.click) ? item.click : null,
                label: item.text,
                cssClass: item.clazz || '',
                hotkey: item.hotKey,
                enabled: item.enabled
            });
        });
        opts.buttons = btnArr;
        $.isFunction(onshown) && (opts.onshown = onshown);
        var dialog = new BootstrapDialog(opts);
        dialog.realize();
        (typeof title === 'undefined') && dialog.getModalHeader().hide();
        return dialog.open();
    },
    /**
     * 显示模态框(可以满足大部分需求)
     * @param title {String}
     * @param content {String|Function}
     * @param width {Number}
     * @param height {Number}
     * @param buttons [{click:null, text:'', clazz:'', hotkey:null, enabled:true}]
     * @param onshown {Function} 模态框渲染完成后立即调用
     * @return {{BootstrapDialog}}
     */
    customDialog: function (title, content, clazz, width, height, buttons, onshown) {
        clazz = clazz || '';
        var btnArr = [], opts = {
            cssClass: 'light-theme ' + clazz,
            title: title,
            message: content,
            nl2br: false,
            size: BootstrapDialog.SIZE_CUSTOM,
            width: (width || 500) + 'px',
            height: (height || 370) + 'px',
            draggable: true,
            closable: true,
            closeByBackdrop: false,
            buttons: []
        };

        (buttons || []).forEach(function (item) {
            btnArr.push({
                action: $.isFunction(item.click) ? item.click : null,
                label: item.text,
                cssClass: item.clazz || '',
                hotkey: item.hotKey,
                enabled: item.enabled
            });
        });
        opts.buttons = btnArr;
        $.isFunction(onshown) && (opts.onshown = onshown);
        var dialog = new BootstrapDialog(opts);
        dialog.realize();
        (typeof title === 'undefined') && dialog.getModalHeader().hide();
        return dialog.open();
    },
    /**
     * 显示模态框（可以自定义对话框属性）
     * @param opt
     * @returns {*}
     */
    displayAdvancedDialog: function (opt) {
        var DEFAULTS = {
            cssClass: 'light-theme',
            title: null,
            message: null,
            nl2br: false,
            size: BootstrapDialog.SIZE_CUSTOM,
            width: null,
            height: null,
            draggable: true,
            closable: true,
            closeByBackdrop: false,
            onshown: null,
            buttons: []
        };
        opt.cssClass = opt.cssClass ? [DEFAULTS.cssClass, opt.cssClass].join(' ') : '';
        var dialog = new BootstrapDialog($.extend(true, {}, DEFAULTS, opt));
        dialog.realize();
        return dialog.open();
    },
    /**
     * 更新SessionStore中的当前页面
     */
    storeCurrPage2Storage: function () {
        IOT.setSessionStore('currPage', location.hash.replace(/^#/, ''));
    },
    /**
     * 确认框
     * @param content
     * @param buttons [{click:null, text:'', clazz:''}]
     * @returns {*}
     */
    confirm: function (content, yesFunc, cancelFunc, clazz) {
        clazz = clazz || '';
        var genPanel = function (dialog, content, yesFunc, cancelFunc) {
            var isJQueryObj = (content instanceof jQuery),
                $panel = $('<div class="confirm-panel text-center center-block"></div>'),
                $btnWrap = $('<div class="btn-wrap"></div>'),
                $yesBtn = $('<button class="btn btn-default">确认 </button>'),
                $cancelBtn = $('<button class="btn btn-cancel btn-gray-confirm">取 消</button>');

            $panel.append(isJQueryObj ? content : ('<em class="confirm-desc ' + clazz + '">' + (content) + '</em>')).append($btnWrap);
            $btnWrap.append(
                $yesBtn.click(function () {
                    (yesFunc || $.noop).call(null, dialog);
                })
            ).append(
                $cancelBtn.click(function () {
                    (cancelFunc || $.noop).call(null, dialog);
                })
            );
            return $panel;
        };
        var option = {
            cssClass: 'light-theme',
            nl2br: false,
            size: BootstrapDialog.SIZE_CUSTOM,
            width: '460px',
            height: '190px',
            closable: false,
            draggable: true
        };
        var dialog = new BootstrapDialog(option);
        dialog.realize();
        dialog.getModal().css('justify-content', 'center');
        dialog.getModalDialog().addClass('clearfix');
        dialog.getModalHeader().hide();
        dialog.setMessage(genPanel(dialog, content, yesFunc, cancelFunc));
        return dialog.open();
    },
    /**
     * 消息提示
     * @param content{String|Object} 显示内容|配置对象（形如：{}）
     * @param type {String} 消息类型 包括：'success'|'error'，默认：error
     * @param time {Number} 显示{time}毫秒后自动消失
     * @param end {Function} 回调函数(消息提示框消失后立即执行)
     */
    tips: function (content, type, time, end) {
        var instance = null;
        if ($.isPlainObject(content)) {
            instance = new window.IOTips(content);
        } else {
            instance = new window.IOTips({
                content: content,
                type: type,
                time: time || 1500,
                onHide: end
            });
        }
        return instance.show();
    },
    /**
     * 显示蒙层效果-加载中...
     * 只产生一个IOTLoading实例
     * (全局显示)
     * @param content
     */
    showOverlay: function (content) {
        var opt, thiz = this, tag = 'IOTLoading', inst = thiz[tag];
        var DEFAULTS = {
            // overlay: false, //解决多次点击BUG - TODO
            parent: 'body',
            content: '加载中...'
        };
        if ($.isPlainObject(content)) {
            opt = $.extend(true, DEFAULTS, content);
        } else {
            opt = $.extend(true, DEFAULTS, {content: content});
        }
        if (!(inst instanceof IOTLoading)) {
            inst = new window.IOTLoading(opt);
            thiz[tag] = inst;
        }
        return inst.show(opt);
    },
    /**
     * 隐藏蒙层效果-加载中...
     * （针对IOT.showOverlay产生的实例）
     */
    hideOverlay: function () {
        var thiz = this, tag = 'IOTLoading', inst = thiz[tag];
        inst && inst.hide();
        return thiz;
    },
    /**
     * 显示蒙层效果（内联样式）
     * @param $dom
     * @param content 要显示的内容
     * @param options 配置 {
     *  spinnerColor: '#fff', //data-spinner-color
     *  fontColor: '#fff', //data-spinner-fontcolor
     *  lines: '10' //data-spinner-lines
     * }
     */
    showInlineOverlay: function ($dom, content, options) {
        $dom.each(function () {
            var $loadingPanel = $([
                '<div class="e-spin-wrap">',
                '<span class="spin-item"></span>',
                '<em>{0}</em>'.format(content || ''),
                '</div>'
            ].join(''));
            var $thiz = $(this),
                oPosition = $thiz.css('position'),
                $wrap = $('<div class="iot-spinner-wrapper" hidden></div>').appendTo($thiz),
                DEFAULTS = {
                    spinnerColor: '#333',
                    fontColor: '#333',
                    lines: 12
                };
            options = $.extend(true, {}, DEFAULTS, options, {
                spinnerColor: $thiz.data('spinnerColor'),
                fontColor: $thiz.data('spinnerFontcolor'),
                lines: $thiz.data('spinnerLines')
            });
            var height = 30,
                radius = height * 0.2,
                length = radius * 0.6,
                width = radius < 7 ? 2 : 3,
                spinner = new Spinner({
                    color: options.spinnerColor,
                    lines: options.lines,
                    radius: radius,
                    length: length,
                    width: width,
                    zIndex: 'auto',
                    top: '50%',
                    left: '50%'
                });
            spinner.spin($loadingPanel.find('.spin-item').get(0));
            options.fontColor && $loadingPanel.find('em').css('color', options.fontColor);
            if (oPosition === 'static') {
                $thiz.css('position', 'relative').attr('data-iot-position', oPosition);
            }
            $thiz.children().wrapAll($wrap);
            $thiz.append($loadingPanel);
        });
        return this;
    },
    /**
     * 隐藏蒙层效果（内联样式）
     * @param $dom
     */
    hideInlineOverlay: function ($dom) {
        $dom.each(function () {
            var $thiz = $(this),
                oPosition = $thiz.attr('data-iot-position'),
                $spin = $thiz.find('.e-spin-wrap');
            $spin.fadeOut(function () {
                $spin.remove();
                oPosition && $thiz.css('position', oPosition);
                $thiz.find('.iot-spinner-wrapper').children().unwrap();
            });
        });
        return this;
    },
    /**
     * 向服务器上传文件
     * @param fileDomId file input的id
     * @param params 可选 其他与上传文件相关的参数 格式 [{name: 'name', value: 'test.txt'}, {name: 'desc' value: 'test description'}]
     * @param destUrl 上传地址
     * @param succFunc 可选，成功时回调；
     * @param failFunc 可选，失败时回调
     * @param overlay
     * @returns {boolean}
     */
    doFileUpload: function (fileIds, params, destUrl, succFunc, failFunc, overlay) {
        var formData = new window.FormData();
        for (let i in fileIds) {
            var dom = document.getElementById(fileIds[i]);
            if (dom && dom.files.length > 0) {
                formData.append(dom.getAttribute('name'), dom.files[0]);
            }
        }

        if (params && params.length > 0) {
            params.forEach(function (item) {
                formData.append(item.name, item.value);
            });
        }

        var xhr = new XMLHttpRequest();
        xhr.open('post', destUrl, true);
        //xhr.upload.onprogress = function(e) {
        //    if (e.lengthComputable) {
        //
        //    }
        //};
        xhr.onerror = failFunc;
        xhr.onload = function () {
            var result = JSON.parse(xhr.responseText);
            succFunc(result);
        };
        xhr.send(formData);
        return false;
    },
    /**
     * 上传文件及附带数据
     * @param url
     * @param params {file:'',userName:''}
     * @param succFunc
     * @param failFunc
     * @param overlay
     * @returns {boolean}
     */
    doFileUpload2: function (url, params, succFunc, failFunc, overlay) {
        let baseURI = $('base').context.baseURI;
        var formData = new window.FormData();
        for (let key in params) {
            formData.append(key, params[key]);
        }
        var xhr = new XMLHttpRequest();
        xhr.open('post', baseURI + url, true);
        xhr.onerror = failFunc;
        xhr.onload = function () {
            var result = JSON.parse(xhr.responseText);
            succFunc(result);
        };
        xhr.send(formData);
        return false;
    },
    /**
     * 文件下载
     * 使用get方式
     * @param url 路由地址
     * @param params 参数
     * @param success 回调
     * @param fail 回调
     */
    doFileDownload: function (url, params, success, fail) {
        IOT.loadScript(['lib/fileDownload/jquery.fileDownload.js'], function () {
            $.fileDownload(
                url.replace(/^\//, ''),
                {
                    httpMethod: 'GET', // use GET since Android does not support file downloads with POST
                    data: params,
                    successCallback: success || $.noop,
                    failCallback: function (respHTML, url) {
                        $.isFunction(fail) && fail(respHTML, url);
                        console.error(respHTML);
                    }
                }
            );
        });
    },
    /**
     * 获取datatables配置对象
     * @param sAjaxSource{String|Object} 路由地址
     * @param aoColumns{Array} 显示列
     * @param extraParams{Function} 需要传递到后端的额外参数
     * @param fnDrawCallback{Function} dataTables每次渲染完数据后的回调函数（翻页、没有数据时均会触发）
     * @param enablePaginate{boolean} 是否支持分页
     */
    dataTableOption: function (sAjaxSource, aoColumns, extraParams, fnDrawCallback, enablePaginate) {
        var option = {},
            defaultOpt = {
                'dom': 't<"tbl-bottom"ip>',
                'processing': false,
                'ordering': false,
                'scrollY': 200,
                'scrollCollapse': true,
                'jQueryUI': true,
                'searching': false,
                'info': true,
                'lengthChange': false,
                'iDisplayLength': 10, //: 每页的行数，每页默认数量:10
                'bPaginate': true, //开关，是否显示分页器
                'bServerSide': true,
                fnDrawCallback: null,
                'oLanguage': {
                    'sProcessing': '<i class="icon-spin5 animate-spin spin-item"></i>数据查询中......',
                    'sZeroRecords': '对不起，查询不到相关数据！',
                    'sEmptyTable': '表中无数据存在！',
                    'sInfo': '共_PAGES_页 &nbsp; / &nbsp; _TOTAL_条数据',
                    'sInfoEmpty': '共_TOTAL_条数据',
                    'oPaginate': {
                        'sPrevious': '<span class="png png-prev"><i class="icon-left-open-1"></i></span>',
                        'sNext': '<span class="png png-next" ><i class="icon-right-open-1"></i></span>'
                    }
                }
            },
            _fnDrawCallback = null;
        if ($.isPlainObject(sAjaxSource)) {
            option = sAjaxSource;
        } else {
            option = {
                sAjaxSource: sAjaxSource,
                aoColumns: aoColumns,
                fnDrawCallback: fnDrawCallback || $.noop,
                fnServerData: function (sSource, aoData, fnCallback) {
                    var oDraw = aoData[0],
                        oStart = aoData[3],
                        oLength = aoData[4],
                        param = {
                            pageNum: (oStart.value / oLength.value + 1),
                            pageSize: oLength.value
                        };
                    IOT.getServerData(sSource, $.extend(param, $.isFunction(extraParams) ? extraParams() : {}), function (data) {
                        IOT.renderDataTableData(oDraw.value, data, fnCallback);
                    });
                }
            };
        }
        if (!option.sAjaxSource || !option.sAjaxSource.length) {
            throw Error('Field [sAjaxSource] is required.');
        }
        if (enablePaginate === false) {
            option.bPaginate = false;
            option.oLanguage = option.oLanguage || {};
            option.oLanguage.sInfoEmpty = '';
            option.oLanguage.sInfo = '';
        }
        var opts = $.extend(true, {}, defaultOpt, option);
        _fnDrawCallback = opts.fnDrawCallback || $.noop;
        opts.fnDrawCallback = function () {
            _fnDrawCallback();
        };
        return opts;
    },
    /**
     * 设置datatable的数据和总数
     * @param sEcho
     * @param result {object}
     * @param fnCallback{Function}
     */
    renderDataTableData: function (sEcho, result, fnCallback) {
        var rData = {
            sEcho: sEcho,
            iTotalRecords: result.totalCount || 0,
            iTotalDisplayRecords: result.totalCount || 0,
            aaData: result.data || []
        };
        fnCallback(rData);
    },
    /**
     * 跳转页面至给定URL地址
     * @param url
     * @param target 是否在新窗口中打开
     */
    redirect2URL: function (url, target) {
        window.open(url.replace(/^\//, ''), target || '_self');
    },
    /**
     * 处理XHR异常
     * @param xhr
     */
    handleXHRError: function (xhr) {
        if (xhr.status === 401) {// session time out
            var errInfo = $.parseJSON(xhr.responseText);
            var flag = !!errInfo.msg;
            flag && IOT.tips(errInfo.msg, 'error', 1500, function () {
                IOT.redirect2URL(errInfo.url);
            });
            !flag && IOT.redirect2URL(errInfo.url);
        } else if (xhr.status === 403) {
            IOT.tips('没有权限，请与管理员联系', 'error');
        } else {
            IOT.tips('系统忙，请稍后再试！', 'error');
        }
        console.error(xhr);
    },
    /**
     * 判断是否是游客身份
     * @returns {boolean}
     * @private
     */
    _isNonGuest: function () {
        return $('#non_guset').length;
    },
    /**
     * 加载HTML模板
     * @param url 路径
     * @param{function} succ
     * @param{function} fail
     * @returns {XHR}
     */
    loadTemplate: function (url, succ, fail) {
        IOT.showOverlay();
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'text',
            cache: false //Fix IE
        })
            .done(function (html) {
                var $wrap = $('<div></div>').append(html),
                    $scripts = $('script[src]', $wrap).not('[custom]').remove(),
                    $scriptsCustom = $('script[src][custom]', $wrap).remove(),
                    $links = $('link[href]', $wrap).remove(),
                    cssArr = [],
                    jsArr = [],
                    jsCustomArr = [];
                $links.each(function () {
                    var src = $(this).attr('href');
                    cssArr.push(src);
                });
                IOT.loadCSS(cssArr, function () {
                    IOT.hideOverlay();
                });
                $scripts.each(function () {
                    var src = $(this).attr('src');
                    jsArr.push(src);
                });
                IOT.loadScript(jsArr, function () {
                    $scriptsCustom.each(function () {
                        var src = $(this).attr('src');
                        jsCustomArr.push(src);
                    });
                    jsCustomArr.length && $wrap.append([
                        '<script type="text/javascript" defer>',
                        'IOT.loadCustomScript("{0}")'.format(jsCustomArr.join(',')),
                        '</script>'
                    ].join(''));
                    // session manage plugin reset
                    $('body').sessionManagePlugin('reset');
                    $.isFunction(succ) && succ($wrap.html());
                });
            })
            .error(function (xhr) {
                $.isFunction(fail) && fail.apply(null, arguments);
                IOT.hideOverlay();
                IOT.handleXHRError(xhr);
            });
    },
    /**
     * 页面导航
     * @param{String} hash 路径
     * @param{Function} end 回调
     * @param{Function} fail 失败回调
     */
    navigate2Page: function (hash, end, fail) {
        IOT.loadTemplate(hash, function (html) {
            // var $page = $(html).hide();
            var $page = $(html);
            // $('.page-container-hook').find('.page').fadeOut().end().empty().append($page);
            // $page.fadeIn('fast');
            $('.page-container-hook').empty().append($page);
            // $page.fadeIn('fast');
            (end || $.noop)();
        }, (fail || $.noop));
    },
    /**
     * 加载CSS文件
     * @param{Array} css
     * @param cb
     */
    loadCSS: function (css, cb) {
        $.xLazyLoader({
            css: css,
            complete: function () {
                $.isFunction(cb) && cb();
            }
        });
    },
    /**
     * 加载js文件（浏览器端缓存）
     * @param{Array} js
     * @param{Function} cb
     */
    loadScript: function (js, cb) {
        $.xLazyLoader({
            js: js,
            complete: function () {
                $.isFunction(cb) && cb();
            }
        });
    },
    /**
     * 加载js文件（业务js文件）
     * @param{Array} js
     * @param{Function} cb
     */
    loadCustomScript: function (js, cb) {
        if (typeof js === 'string') {
            js = js.split(',');
        }
        var ep = new EventEmitter(),
            len = js.length;
        $.each(js, function (i, url) {
            url && ep.once(url, function () {
                $.ajax({
                    url: url,
                    dataType: 'text'
                })
                    .done(function (text) {
                        try {
                            $.globalEval(text);
                        } catch (e) {
                            console.error(e);
                        } finally {
                            (i + 1 < len) && ep.emit(js[i + 1]);
                            (i + 1 === len) && $.isFunction(cb) && cb();
                        }
                    })
                    .error(function (xhr, status, err) {
                        console.error('Failed to load script [%s], cause: %s', url, err);
                    });
            });
        });
        ep.emit(js[0]);
    },
    /**
     * 返回事件实例（单例）
     * @returns {EventEmitter}
     * @constructor
     */
    getEvent: function () {
        var thiz = this, tag = 'iotevent', ep = thiz[tag];
        if (!(ep instanceof EventEmitter)) {
            ep = new EventEmitter();
            thiz[tag] = ep;
        }
        return ep;
    },
    /**
     * 获取sessionStore中存储的值
     * @param key
     * @returns {Object}
     */
    getSessionStore: function (key) {
        var session = window.sessionStorage;
        return session.getItem(key) || null;
    },
    /**
     * 向sessionStore中存储值
     * @param key
     * @param value
     */
    setSessionStore: function (key, value) {
        var session = window.sessionStorage;
        session.setItem(key, value);
    },
    /**
     * 清除sessionStore
     * @param key
     */
    clearSessionStore: function (key) {
        var session = window.sessionStorage;
        if (key) {
            session.removeItem(key);
        } else {
            session.clear();
        }
    },
    /**
     * 获取LocalStore中存储的值
     * @param key
     * @returns {Object}
     */
    getLocalStore: function (key) {
        var local = window.localStorage;
        return local.getItem(key) || null;
    },
    /**
     * 向LocalStore中存储值
     * @param key
     * @param value
     */
    setLocalStore: function (key, value) {
        var local = window.localStorage;
        local.setItem(key, value);
    },
    /**
     * 清除LocalStore
     * @param key
     */
    clearLocalStore: function (key) {
        var local = window.localStorage;
        if (key) {
            local.removeItem(key);
        } else {
            local.clear();
        }
    },
    /**
     * 初始化一个全屏部件（div或textarea等）
     * @param trigger 全屏触发dom(可以是原生dom也可以jquery对象)
     * @param target 全屏展示dom
     */
    initFullScreen: function (trigger, target) {
        var $btn = (trigger instanceof jQuery) ? trigger : $(trigger),
            $dom = (target instanceof jQuery) ? target : $(target);
        if ($btn.length <= 0 || $dom.length <= 0) {
            return;
        }
        var element = $dom.get(0);
        var top = element.offsetTop, left = element.offsetLeft + element.offsetWidth - 20;
        $btn.css({top: top, left: left})
            .on('click', function () {
                // if already full screen; exit
                // else go fullscreen
                if (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                ) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.webkitRequestFullscreen) {
                        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    } else if (element.msRequestFullscreen) {
                        element.msRequestFullscreen();
                    }
                }
            });
    },
    validateForm: function ($form, option) {
        var flag = true;
        $form.each(function () {
            var invalid = option ? $(this).validationEngine('validate', option) : $(this).validationEngine('validate');
            if (!invalid) {
                flag = false;
                return false;
            }
        });
        return flag;
    },
    /**
     * delay毫秒内多次请求仅执行一次
     * @param func {function} 执行方法
     * @param delay {int} 延时毫秒数
     * @returns {Function}
     */
    debounce: function (func, delay) {
        var timer = null;
        return function () {
            clearTimeout(timer);
            (delay < 200) && (delay = 200);
            timer = setTimeout(func, delay);
        };
    },
    /**
     * xss检查
     * @param str 检查替换目标字符串
     * @param reg
     * @returns {*}
     */
    xssCheck: function (str, reg) {
        return str ? ('' + str).replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
            if (b) {
                return a;
            } else {
                return {
                    '<': '&lt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    '>': '&gt;',
                    '\'': '&#39;',
                    'javascript:': '',
                    'jscript:': '',
                    'vbscript:': ''
                }[a];
            }
        }) : '';
    },
    /**
     * 判断字符命名是否符合规则
     * （字母、数字、下划线，且非数字开头）
     * @param str
     */
    check4Chars: function (str) {
        var regx = /^[a-zA-Z_][\w\s]*$/;
        return regx.test(str);
    },
    /**
     * 判断字符命名是否符合规则
     * （字母、数字、下划线、中文，且非数字开头）
     * @param str
     */
    check4CharsWithChinese: function (str) {
        var regx = /^[a-zA-Z_\u4e00-\u9fa5][\w\s\u4e00-\u9fa5]*$/;
        return regx.test(str);
    },
    /**
     * 将特殊字符转义为空字符串
     * Usage:
     *  Input:
     *   'abcd~!@#$%^&^&123  4_中文'
     *  Output:
     *   'abcd123  4_'
     * @param str
     * @returns {void|*|string|XML}
     */
    escapeChars: function (str) {
        return str.replace(/[^\w\s]/g, '');
    },
    /**
     * 将特殊字符转义为空字符串
     * Usage:
     *  Input:
     *   'abcd~!@#$%^&^&123  4_中文'
     *  Output:
     *   'abcd123  4_中文'
     * @param str
     * @returns {void|*|string|XML}
     */
    escapeCharsWithChinese: function (str) {
        return str.replace(/[^\w\s\u4e00-\u9fa5]/g, '');
    },
    /**
     * 格式化get请求uri
     * @param uri
     * @param param
     * @returns {*}
     */
    formatGetUri: function (uri, param) {
        var arr = [];
        for (var p in param) {
                arr.push([p, '=', param[p]].join(''));
            // if (param[p]) {
            // }
        }
        if (uri.indexOf('?') === -1 && arr.length > 0) {
            uri = uri.concat('?');
        }
        if (arr.length > 0) {
            if (uri.charAt(uri.length - 1) !== '?') {
                uri = uri.concat('&');
            }
            uri = uri.concat(arr.join('&'));
        }
        return uri;
    },
    /**
     * 滑动条初始化方法
     * @param $rangeId  绑定元素
     * @param rangeWidth  滑动条宽度
     * @param min  最小值（整数）
     * @param max  最大值（int）
     * @param value  初始值（int）
     * @returns {jQuery|HTMLElement}
     */
    fnBarInit: function ($rangeId, rangeWidth, min, max, value) {
        $rangeId.width(rangeWidth + 80);
        var circle = 'circle' + new Date().getTime(),
            berin = 'berin' + new Date().getTime(),
            range = 'range' + new Date().getTime(),
            boxText = 'boxText' + new Date().getTime(),
            brightLamp = 'brightLamp' + new Date().getTime();
        var html = '<div class="range-out"id="' + range + '" style="width: ' + rangeWidth + 'px;"><div class="ber-in" id="' + berin + '">' +
            '<div class="circle" id="' + circle + '"><div class="box"id="' + boxText + '"></div></div></div>' +
            '<span class="first-info">' + min + '</span><span class="last-info">' + max + '</span></div>' +
            '<input type="text" name="brightness" class="form-control brightness"id="' + brightLamp + '">';
        $rangeId.append(html);
        // 绑定滑动事件
        var $berin = $('#' + berin);
        var $range = $('#' + range);
        var $brightLamp = $('#' + brightLamp);
        var $boxText = $('#' + boxText);
        $('#' + circle).on({
            mousedown: function (e) {
                var el = $(this);
                var os = el.offset();
                var wth = el.parent().parent().width();
                var parentPositionLeft = el.parent().offset().left;
                var parentPositionRight = parentPositionLeft + wth;
                var dx = e.pageX - os.left, dy = e.pageY - os.top;
                $(document).on('mousemove.drag', function (e) {
                    var position = e.pageX - dx;
                    var leftset = position;
                    if (position > parentPositionRight) {
                        leftset = parentPositionRight;
                    } else if (position < parentPositionLeft) {
                        leftset = parentPositionLeft;
                    }
                    $berin.width(leftset - parentPositionLeft);
                    var result = parseInt((leftset - parentPositionLeft) / wth * (max - min)) + min;
                    $brightLamp.val(result);
                    $boxText.html(result);
                    value = result;
                });
            },
            mouseup: function (e) {
                $(document).off('mousemove.drag');
            },
            mouseleave: function () {
                // $(document).off('mousemove.drag');
            }
        });
        $brightLamp.val(min);
        $boxText.html(min);
        // 绑定输入框事件
        $brightLamp.on('change onpropertychange ', function () {
            var thiz = $(this);
            var writeVal = thiz.val();
            if (!(/^(?!0[0-9]+)[0-9]*$/.test(writeVal)) || !writeVal) {
                writeVal = value;
            }
            writeVal = writeVal > max ? max : writeVal;
            writeVal = writeVal < min ? min : writeVal;
            $boxText.html(writeVal);
            var wth = $range.width();
            var newWidth = parseInt((writeVal - min) / (max - min) * wth);//新宽度
            $berin.width(newWidth);
            thiz.val(writeVal);
            value = writeVal;
        });
        $('body').off('mouseup').on('mouseup', function () {
            $(document).off('mousemove.drag');
        });
        if (value) {
            $brightLamp.val(value > max ? max : value);
            $brightLamp.trigger('change');
        } else {
            value = min;
        }
        // 返回输入框对象
        return $brightLamp;
    }
};

// 咨询客服
(function () {
    let pathname = location.pathname;
    if (/^\/(([a-z]+\/|)(index)|[a-z]+\/|)$/.test(pathname)) {
        $('.link-hook>li:nth-child(1)').addClass('active');
    } else if (/^\/([a-z]+\/|)(product)$/.test(pathname)) {
        $('.link-hook>li:nth-child(2)').addClass('active');
    } else if (/^\/([a-z]+\/|)(discounts|discounts\/[0-9]+)$/.test(pathname)) {
        $('.link-hook>li:nth-child(3)').addClass('active');
    }
    $('.consult-service-hook').click(function () {
        let html = `
                <div class="consult-content">
                        <form class="form-horizontal form-consult-content-hook">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">您的称呼</label>
                                <div class="col-sm-9">
                                    <input type="text" name="consultUserName" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">手机号码</label>
                                <div class="col-sm-9">
                                    <input type="text" name="consultUserMobile" class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">查询内容</label>
                                <div class="col-sm-9">
                                    <textarea name="consultContent" class="form-control" rows="6"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-9">
                                    <button type="submit" class="btn btn-blue-consult">提交</button>
                                    <button type="button" class="btn btn-gray-consult cancel-hook">取消</button>
                                </div>
                            </div>
                        </form>
                    </div>`;
        IOT.customDialog('客服咨询', html, 'consult-dialog', 510, 330, null, function () {
            $('.form-consult-content-hook .cancel-hook').off('click').on('click', function () {
                BootstrapDialog.closeAll();
            });
            $('.form-consult-content-hook').validate({
                debug: true,
                rules: {
                    consultUserName: {
                        required: true,
                        minlength: 1,
                        maxlength: 20
                    },
                    consultUserMobile: {
                        required: true,
                        phoneCN: true
                    },
                    consultContent: {
                        required: true,
                        minlength: 10,
                        maxlength: 1000
                    }
                },
                submitHandler: function (form) {
                    let params = $(form).serializeJson();
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.CONSULT.CREATE.SAVE, params, function (ret) {
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            BootstrapDialog.closeAll();
                        } else {
                            IOT.tips(ret.message || '操作失败，请重试！', 'error');
                        }
                    });
                    return false;
                }
            });
        });
    });
})();
