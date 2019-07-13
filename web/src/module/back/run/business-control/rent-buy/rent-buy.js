/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.buy-main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            }
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },
            // 新增换购页面
            newBuy: function () {
                M.Page.emit(URI.RUN.BUSINESS_CONTROL.CLIENT_CREATE_BUY.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.buy-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                let tableHookName = '.buy-table-hook';
                var $form = $accountBox.find('.search-hook');
                // 省份-城市-区域
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };
                //初始化-省份、城市、区县
                distpicker.init();
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'buy-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: '/back/demo/list',
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function () {
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'count', title: '换购ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'count', title: '托盘总数', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'count', title: '托盘金额', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'count', title: '确认状态', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'count', title: '换购客户', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'address', title: '目的地', align: 'center', fixedLeft: true,width: 180
                        },
                        {
                            field: 'datetime', title: '换购日期', align: 'center', fixedLeft: true,width: 180
                        }
                    ]
                });
            });
        }
    });
})();





















