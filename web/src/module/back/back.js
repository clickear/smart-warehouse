import $ from 'jQuery';
import URI from 'URI';

require('../../less/back/back-common.less');
require('../../less/back/back.less');
require('../../less/back/rent/rent.less');
require('../../less/back/rent/rent_detail.less');
require('../../less/back/dialog.less');
require('../../less/back/run/release.less');
$(function () {
    var $body = $('body');

    var wareCode = '';


    // 绑定页面销毁事件
    $('.page-container-hook').bind('DOMNodeRemoved', function (e) {
        if ($(e.target).hasClass('page')) {
            // 页面销毁
            IOT.getEvent().emit('onPageDestroy');
        }
    });
    // $('.scrollbr-hook').scrollbar();
    // wrapper scrollbar-dynamic
    var DEFAULT_PAGE = '';
    var ENUM_TAG = {
        HISTORY: 'history',
        CURRENT_PAGE: 'currPage'
    };
    // 得到所有的菜单URL
    var menus = [];
    $('div.menu [module-menu]').each(function () {
        let url = $(this).attr('module-menu');
        if (url !== '') {
            !DEFAULT_PAGE && (DEFAULT_PAGE = url);
            menus.push(url);
        }
    });

    // 激活菜单
    function activeMenuItem (hash) {
        var uri = hash.substring(0, (hash.indexOf('?') !== -1 ? hash.indexOf('?') : hash.length));
        $('.menu [module-menu]').removeClass('active');
        let $currentMenu = $('.menu [module-menu="{0}"]'.format(uri));
        $currentMenu.addClass('active');
        while (true) {
            $currentMenu = $currentMenu.parent();
            if ($currentMenu.attr('module-menu') !== undefined) {
                $currentMenu.addClass('active');
            } else {
                return false;
            }
        }
    }

    $('.header-menu-hook').off('click').on('click', function () {
        var $thiz = $(this);
        var url = $thiz.attr('module-menu-header');
        IOT.navigate2Page(url);
        activeMenuItem(url);
    });
    // 绑定
    $body.on('click', '[module-menu]', function (e) {
        var $thiz = $(this);
        var url = $thiz.attr('module-menu');
        if (url === '') {
            return false;
        }
        var target = $thiz.attr('module-target') || 'page'; // 支持page|dialog
        if (url && url.length) {
            switch (target) {
                case 'dialog': {
                    IOT.loadTemplate(url, function (html) {
                        var dialogTitle = $thiz.attr('module-dialog-title') || '',
                            dialogWidth = $thiz.attr('module-dialog-width'),
                            dialogHeight = $thiz.attr('module-dialog-height');
                        IOT.displayDefaultDialog(dialogTitle, html, dialogWidth, dialogHeight);
                    });
                    break;
                }
                case 'download': {
                    IOT.doFileDownload(url);
                    break;
                }
                case 'page': {
                    var currHash = location.hash.replace('#', '');
                    var isHashChanged = (currHash !== url); // true ：不是当前
                    var historyLinks = JSON.parse(IOT.getSessionStore(ENUM_TAG.HISTORY)) || [];
                    if (!(historyLinks.length && $.inArray(url, historyLinks) !== -1)) {
                        historyLinks.push(url);
                        IOT.setSessionStore(ENUM_TAG.HISTORY, JSON.stringify(historyLinks));
                    }
                    if (isHashChanged) {
                        location.hash = url;
                    } else {
                        IOT.navigate2Page(url);
                    }
                    IOT.setSessionStore(ENUM_TAG.CURRENT_PAGE, url); // 更新为当前页面地址
                    break;
                }
                default: {
                    console.error('module-target[%s] is not matched.', target);
                    break;
                }
            }
        } else {
            console.error('module-menu is null or empty.');
        }
        e.stopPropagation();
    });

    window.onhashchange = function () {
        var hash = location.hash.replace(/^#+/, '');
        var uri = hash.substring(0, (hash.indexOf('?') !== -1 ? hash.indexOf('?') : hash.length));
        var historyLinks = JSON.parse(IOT.getSessionStore(ENUM_TAG.HISTORY)) || [];
        if (hash && hash.length && $.inArray(uri, menus) !== -1) {
            var decodeHash = decodeURI(hash);
            if ($.inArray(decodeHash, historyLinks) !== -1) {
                IOT.navigate2Page(hash, function () {
                    // 同步菜单样式
                    activeMenuItem(hash);
                    IOT.setSessionStore(ENUM_TAG.CURRENT_PAGE, hash); // 更新为当前页面地址
                });
                return;
            }
        }
        if (!!DEFAULT_PAGE) {
            // hash为空时，跳转到首页
            location.hash = DEFAULT_PAGE;
        }
    };

    // 跳转至指定页面
    (function () {
        setTimeout(function () {
            var page = IOT.getSessionStore(ENUM_TAG.CURRENT_PAGE);
            if (!page) {
                page = DEFAULT_PAGE;
                var history = [page];
                IOT.setSessionStore(ENUM_TAG.HISTORY, JSON.stringify(history));
            }
            if (!page) {
                return;
            }
            IOT.navigate2Page(page, function () {
                activeMenuItem(page);
            }, function () {
                // 若出错，则默认加载首页
                if (DEFAULT_PAGE) {
                    IOT.navigate2Page(DEFAULT_PAGE, function () {
                        activeMenuItem(DEFAULT_PAGE);
                    });
                }
            });
        }, 1);
    })();

    // dialog中的取消按钮
    $body.off('click.modal').on('click.modal', '.modal-dialog .btn-cancel', function () {
        $(this).closest('.modal-dialog').find('.bootstrap-dialog-close-button .btn.close').trigger('click');
    });

    $body.tooltips({
        container: 'body',
        selector: '[tooltips]:not(.disabled,[disabled])',
        trigger: 'mouseenter',
        arrow: false,
        showOnlyOnTextOverflow: false,
        position: {
            my: 'left top+30'
        },
        content: function (done) {
            done($(this).attr('tooltips'));
        }
    });
    $('.logout').off('click').on('click', function () {
        IOT.loadTemplate(URI.LOGOUT.PAGE, function (html) {
            IOT.displayDefaultDialog('退出登录', html, 400, 120);
        }, null);
    });
});


var M = window.M = M || {};

// 显示隐藏页
(function ($) {
    var BEFOREHAND_URL = 'beforehand_url';
    var BEFOREHAND_PARAMS = 'beforehand_params';

    var _beforehand = {
        url: '',
        params: {}
    };

    var Page = M.Page = function () {
    };

    /**
     * 触发请求页
     * @param url
     * @param params
     */
    Page.emit = function (url, params) {
        params = params || {};
        params = JSON.stringify(params);
        IOT.clearSessionStore(BEFOREHAND_URL);
        IOT.clearSessionStore(BEFOREHAND_PARAMS);
        IOT.setSessionStore(BEFOREHAND_URL, url);
        IOT.setSessionStore(BEFOREHAND_PARAMS, params);
        $('.main-hook').find('.emit-page-hook').trigger('click');
    };

    /**
     * 加载页
     * @param boxs
     * @returns {boolean}
     */
    Page.load = function (boxs) {
        var keys = Object.keys(boxs);
        var i = 0, len = keys.length;
        for (i; i < len; i++) {
            var key = keys[i];
            var box = boxs[key];
            if (box.show) {
                if ((i + 1) < len) {
                    box.show = false;
                    boxs[keys[(i + 1)]].show = true;
                }
                break;
            } else if (i === (len - 1)) {
                boxs[keys[0]].show = true;
            }
        }
        var url = IOT.getSessionStore(BEFOREHAND_URL);
        if (url === null) {
            return false;
        }
        var beforehandParams = IOT.getSessionStore(BEFOREHAND_PARAMS);
        var params = beforehandParams ? JSON.parse(beforehandParams) : {};
        var uri = M.StringUtil.formatGetUri(url, params);
        for (var key in boxs) {
            var box = boxs[key];
            if (box.show) {
                box.url = uri;
                box.params = params;
                $('.main-hook').find(box.hook).empty();
                IOT.loadTemplate(uri, function (html) {
                    // var $page = $(html).hide();
                    var $page = $(html);
                   $('.main-hook').find(box.hook).html($page);

                    // $page.fadeIn('fast');
                });
                break;
            }
        }
        IOT.clearSessionStore(BEFOREHAND_URL);
        IOT.clearSessionStore(BEFOREHAND_PARAMS);
    };

    /**
     * 触发-刷新（默认最后显示的哪一个（一般是详情页面））
     */
    Page.emitRefreshPage = function () {
        $('.main-hook').find('.refresh-page-hook').trigger('click');
    };
    /**
     * 刷新页（最后一个页面）
     */
    Page.refreshPage = function (boxs) {

        var keys = Object.keys(boxs).reverse();
        var i = 0, len = keys.length;
        var box = null;
        for (i; i < len; i++) {
            var key = keys[i];
            box = boxs[key];
            if (box.show) {
                $(box.hook).empty();
                break;
            }
        }
        $('.main-hook').find(box.hook).empty();

        var uri = M.StringUtil.formatGetUri(box.url, box.params || {});
        IOT.loadTemplate(uri, function (html) {
            var $page = $(html).hide();
            $('.main-hook').find(box.hook).html($page);
            // $page.fadeIn('fast');
            $page.show();
        });
    };


    /**
     * 触发-上一页
     */
    Page.emitPrePage = function () {
        $('.main-hook').find('.pre-page-hook').trigger('click');
    };
    /**
     * 上一页
     * @param boxs
     */
    Page.prePage = function (boxs) {
        var keys = Object.keys(boxs).reverse();
        var i = 0, len = keys.length;
        for (i; i < len; i++) {
            var key = keys[i];
            var box = boxs[key];
            if (box.show) {
                box.show = false;
                $(box.hook).empty();
                if ((i + 1) < len) {
                    boxs[keys[(i + 1)]].show = true;
                }
                break;
            }
        }
    };

    /**
     *
     * 修改货主和仓库后使用
    *
    */
    Page.changeWareAndMaster = function(){

        $("#btnBase").css(
            {
                'background-color': '#00a0e9',

            }
        );

        $("#btnWare").css(
            {

                'background-color': ' #c7ddef',


            }
        );

        $("#btnReport").css(
            {

                'background-color': ' #c7ddef',


            }
        );

        $("#2").css("display","");
        $("#0").css("display","none");
        $("#1").css("display","none");
        $("#3").css("display","none");
    }

    // 表格
    var Table = M.Table = function () {
    };
    Table.refresh = function (hook) {
        if (!(/^(#|\.)/.test(hook))) {
            hook = `.${hook}`;
        }
        $(hook).bootstrapTable('refresh');
    };
    Table.refresh.account = function () {
        M.Table.refresh('.account-table-hook');
    };
    Table.refresh.platformBranch = function () {
        M.Table.refresh('.platform-branch-table-hook');
    };
    Table.refresh.client = function () {
        M.Table.refresh('.client-table-hook');
    };
    Table.refresh.storage = function () {
        M.Table.refresh('.storage-table-hook');
    };
    Table.refresh.supplier = function () {
        M.Table.refresh('.supplier-table-hook');
    };
    Table.refresh.investor = function () {
        M.Table.refresh('.investor-table-hook');
    };
    Table.refresh.agent = function () {
        M.Table.refresh('.agent-table-hook');
    };
    Table.refresh.poi = function () {
        M.Table.refresh('.poi-table-hook');
    };
    Table.refresh.role = function () {
        M.Table.refresh('.role-table-hook');
    };
    Table.refresh.lifecycle = function () {
        M.Table.refresh('.lifecycle-table-hook');
    };
    Table.refresh.location = function () {
        M.Table.refresh('.location-table-hook');
    };
    Table.refresh.possess = function () {
        M.Table.refresh('.possess-table-hook');
    };
    Table.refresh.message = function () {
        M.Table.refresh('.message-table-hook');
    };
    Table.refresh.warn = function () {
        M.Table.refresh('.warn-table-hook');
    };
    Table.refresh.preferential = function () {
        M.Table.refresh('.preferential-table-hook');
    };
    Table.refresh.order = function () {
        M.Table.refresh('.order-table-hook');
    };
    Table.refresh.confirmOrder = function () {
        M.Table.refresh('.confirm-table-hook');
    };
    Table.refresh.settlement = function () {
        M.Table.refresh('.settlement-table-hook');
    };
    Table.refresh.rental = function () {
        M.Table.refresh('.rental-table-hook');
    };
    Table.refresh.relet = function () {
        M.Table.refresh('.relet-table-hook');
    };
    Table.refresh.sublet = function () {
        M.Table.refresh('.sublet-table-hook');
    };
    Table.refresh.allocation = function () {
        M.Table.refresh('.allocation-table-hook');
    };
    Table.refresh.return = function () {
        M.Table.refresh('.return-table-hook');
    };
    Table.refresh.createReturn = function () {
        M.Table.refresh('.create-return-table-hook');
    };
    Table.refresh.contract = function () {
        M.Table.refresh('.contract-table-hook');
    };
    Table.refresh.schedule = function () {
        M.Table.refresh('.schedule-table-hook');
    };
    Table.refresh.unread = function () {
        M.Table.refresh('.unread-table-hook');
    };
    Table.refresh.already = function () {
        M.Table.refresh('.already-read-table-hook');
    };
    Table.refresh.helpDocument = function () {
        M.Table.refresh('.help-document-table-hook');
    };
    Table.refresh.rentBind = function () {
        M.Table.refresh('.has-bind-order-table-hook');
    };
    Table.refresh.rentCanBind = function () {
        M.Table.refresh('.choose-bind-order-table-hook');
    };
    Table.refresh.offRentBind = function () {
        M.Table.refresh('.off-bind-order-table-hook');
    };
    Table.refresh.scanResults = function () {
        M.Table.refresh('.ScanResults-table-hook');
    };
    Table.refresh.scanDetail = function () {
        M.Table.refresh('.ScanDetail-table-hook');
    };
    Table.refresh.scanBind = function () {
        M.Table.refresh('.ScanBind-table-hook');
    };

    Table.refresh.trackTable =function () {
        M.Table.refresh('.tracking-table-hook');
    };
    Table.refresh.trackScanBind =function () {
        M.Table.refresh('.bind-order-info-table-hook');
    };
    Table.refresh.financeType =function () {
        M.Table.refresh('.finance-type-table-hook');
    };
    Table.refresh.ware =function () {
        M.Table.refresh('.ware-table-hook');
    };
    Table.refresh.aaaaa =function () {
        M.Table.refresh('.table-hook');
    };
    Table.refresh.shelf =function () {
        M.Table.refresh('.shelf-table-hook');
    };
    Table.refresh.inventory =function () {
        M.Table.refresh('.inventory-table-hook');
    };
    Table.refresh.item =function () {
        M.Table.refresh('.item-table-hook');
    };
    Table.refresh.itemType =function () {
        M.Table.refresh('.itemType-table-hook');
    };

    Table.refresh.financeIn =function () {
        M.Table.refresh('.finance-in-table-hook');
    };
    Table.refresh.financeOut =function () {
        M.Table.refresh('.finance-out-table-hook');
    };
    Table.refresh.billDetailCreate =function () {
        M.Table.refresh('.BillDetail-create-table-hook');
    };
    Table.refresh.pllet =function () {
        M.Table.refresh('.pllet-table-hook');
    };
    Table.refresh.agencyClient =function () {
        M.Table.refresh('.agency-client-table-hook');
    };
    Table.refresh.agencySupplier =function () {
        M.Table.refresh('.agency-supplier-table-hook');
    };
    Table.refresh.billDetailIn =function () {
        M.Table.refresh('.billDetail-in-table-hook');
    };
	Table.refresh.unit =function () {
        M.Table.refresh('.unit-table-hook');
    };
    Table.refresh.buy =function () {
        M.Table.refresh('.business-buy-table-hook');
    };
    Table.refresh.cell =function () {
        M.Table.refresh('.cell-table-hook');
    };
    Table.refresh.upShelf =function () {
        M.Table.refresh('.upShelf-table-hook');
    };
    Table.refresh.itemMaster =function () {
        M.Table.refresh('.item-master-table-hook');
    };
    Table.refresh.checkContent =function () {
        M.Table.refresh('.check-content-table-hook');
    };
    Table.refresh.deviceSingle =function () {
        M.Table.refresh('.device-single-table-hook');
    };
    Table.refresh.deviceInfo =function () {
        M.Table.refresh('.device-info-table-hook');
    };








    Table.refresh.all = function () {
        Table.refresh.already();
        Table.refresh.unread();
        Table.refresh.account();
        Table.refresh.platformBranch();
        Table.refresh.client();
        Table.refresh.supplier();
        Table.refresh.investor();
        Table.refresh.agent();
        Table.refresh.poi();
        Table.refresh.role();
        Table.refresh.lifecycle();
        Table.refresh.location();
        Table.refresh.possess();
        Table.refresh.message();
        Table.refresh.warn();
        Table.refresh.preferential();
        Table.refresh.order();
        Table.refresh.confirmOrder();
        Table.refresh.rental();
        Table.refresh.relet();
        Table.refresh.sublet();
        Table.refresh.settlement();
        Table.refresh.allocation();
        Table.refresh.contract();
        Table.refresh.schedule();
        Table.refresh.return();
        Table.refresh.createReturn();
        Table.refresh.helpDocument();
        Table.refresh.rentBind();
        Table.refresh.rentCanBind();
        Table.refresh.offRentBind();
        Table.refresh.scanResults();
        Table.refresh.scanDetail();
        Table.refresh.scanBind();
        Table.refresh.trackScanBind();
        Table.refresh.trackTable();
        Table.refresh.financeType();
        Table.refresh.ware();
        Table.refresh.aaaaa();
        Table.refresh.shelf();
        Table.refresh.inventory();
        Table.refresh.item();
        Table.refresh.itemType();
        Table.refresh.financeIn();
        Table.refresh.financeOut();
        Table.refresh.billDetailCreate();
        Table.refresh.pllet();
        Table.refresh.agencyClient();
        Table.refresh.agencySupplier();
        Table.refresh.billDetailIn();
        Table.refresh.unit();
        Table.refresh.buy();
        Table.refresh.cell();
        Table.refresh.upShelf();
        Table.refresh.itemMaster();
        Table.refresh.checkContent();
        Table.refresh.deviceSingle();
        Table.refresh.deviceInfo();




    };

    // 字符工具
    var StringUtil = M.StringUtil = function () {
    };

    /**
     * 格式化get请求uri
     * @param uri
     * @param param
     * @returns {*}
     */
    StringUtil.formatGetUri = function (uri, param) {
        var arr = [];
        for (var p in param) {
            if (param[p]) {
                arr.push([p, '=', param[p]].join(''));
            }
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
    };

    /**
     * 预览图片
     * @param content
     */
    M.previewImg = function (src) {
        var content = '<div class="layui-layer-wrap" style="display: block; text-align: center;"><img src="' + src + '"></div>';
        layer.open({
            type: 1,
            title: false,
            closeBtn: 1,
            area: ['95%', '95%'],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: content
        });
    };


    /**
     * 上传图片
     * @param $box
     * @param ids '#license,#cardFront,#cardContrary'
     * @param hint {license:'营业执照',cardFront:'身份证正面',cardContrary:'身份证反面'}
     * @param successFunction
     * @param errorFunction
     */
    M.uploadImg = function ($box, ids, hint, successFunction, errorFunction) {
        $box.find(ids).off('change').on('change', function () {
            let files = this.files;
            if (files.length <= 0) {
                return false;
            }
            let file = files[0];
            let filedName = this.getAttribute('name');
            let hintText = hint[filedName];

            if (file.type.indexOf('image') != -1) { // 校验是否为图片
                if ((file.size / 1024) > 2048) {
                    $(this).val('');
                    errorFunction(filedName);
                    IOT.tips(`图片太大,请从新上传${hintText}`, 'error');
                } else {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        successFunction(filedName, e.target.result, file);
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                errorFunction(filedName);
                $(this).val('');
                IOT.tips(`只能上传图片,请从新上传${hintText}`, 'error');
                return false;
            }
        });
    };


    let Request = M.Request = function () {
    };


    /**
     *
     * @param url
     * @param params
     * @param showError true : 显示错误, false：不显示
     * @param callback
     */
    Request.get = function (url, params, showError, callback) {
        params = params || {};
        IOT.getServerData(url, params, (ret) => {
            if (ret.code !== 200 && showError) {
                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
            }
            callback(ret.data || {}, ret);
        });
    };

    /**
     * 获取角色列表(不分页)
     * @param showError true : 显示错误, false：不显示
     * @param callback
     */
    Request.getRoleList = function (showError, callback) {
        Request.get(URI.ORGANIZATION.ROLE.ROLE_LIST, {}, showError, callback);
    };

    /**
     * 获取机构（公司）列表（不分页）
     * @param params {keywords:'公司名称'}
     * @param showError true : 显示错误, false：不显示
     * @param callback
     */
    Request.getCompanyList = function (params, showError, callback) {
        Request.get(URI.ORGANIZATION.COMPANY_LIST, params, showError, callback);
    };

    /**
     * 获取仓库列表（不分页）
     * @param params {keywords:'公司名称'}
     * @param showError true : 显示错误, false：不显示
     * @param callback
     */
    Request.getWareList = function (params, showError, callback) {
        Request.get(URI.BASE.WAREHOUSE.LIST, params, showError, callback);
    };



    var Authority = M.Authority = function () {
    };

    Authority.checkAuthority = function (authorityCode) {
        return _.contains(window.permission || [], authorityCode);
    };

})(jQuery);

// 动态JS刷新
if (module.hot) {
    module.hot.accept();
}
