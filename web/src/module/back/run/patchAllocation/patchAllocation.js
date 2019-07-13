import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.main-hook',
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
            createAllocation: function () {
                M.Page.emit(URI.RUN.PATCH_ALLOCATION.ADD.PAGE);
            }

        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.patchAllocation-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                $accountBox.find('input[name=workStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d h:i:s',
                    formatDate: 'Y-m-d h:i:s',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: true // 关闭时间选项
                });
                $accountBox.find('input[name=workEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d h:i:s',
                    formatDate: 'Y-m-d h:i:s',
                    scrollMonth: false,
                    scrollTime: true,
                    scrollInput: false,
                    timepicker: true // 关闭时间选项
                });
                let tableHookName = '.patchAllocation-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');
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
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.RUN.PATCH_ALLOCATION.LIST,
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
                    onLoadSuccess: function (data) {
                        console.log(data);
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
                            field: 'orderNo', title: '调拨ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'fromOrderNo', title: '订单ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalQuantity', title: '调拨总数', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerName', title: '客户', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'pickupAddress', title: '目的地', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'musterStatus', title: '调拨状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1未调拨；2已调拨；3拒绝调拨；*/
                                if (value === 1 ){return "未调拨";}
                                else if (value ===2 ){return "已调拨";}
                                else if (value === 3 ){return "拒绝调拨";}
                            }
                        },
                        {
                            field: 'placeOrderTime', title: '申请时间', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.RUN.PATCH_ALLOCATION.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RUN.PATCH_ALLOCATION.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;
                            }
                        }
                    ]
                });
            });
        }
    });
})();









