import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            billType: [{id: 0, name: '全部'},{id: 1, name: '调拨运单'}, {id: 2, name: '流转运单'}],
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}},
                box5: {show: false, hook: '.box4-hook', url: '', params: {}}
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
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
            searchTable: function () {
                $('.tracking-table-hook').bootstrapTable('onCustomSearch');
            },
            createTracking:function(){
                M.Page.emit(URI.RENT.TRACKING.CREATE.PAGE);
                IOT.setSessionStore(URI.RENT.TRACKING.CREATE.PAGE, JSON.stringify({action: ACTION.CREATE}));
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $defaultHook = $('.default-hook');
             //初始化时间
                modal.initDate("orderStartTime","orderEndTime");
                let tableHookName = '.tracking-table-hook';
                // 查询
                $defaultHook.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $defaultHook.find('.form-hook');
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    scrollbar: 'tracking-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.TRACKING.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('pallet-track-query'),
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
                            field: 'transportBillNo', title: '运单号', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'billType', title: '运单类型', align: 'center', fixedLeft: true,width:100,
                            formatter: function (value, row, index) {
                                /* 1平台出租；2代理商出租； */
                                if (value === 1 ){return "调拨运单";}
                                else if (value === 2 ){return "流转运单";}
                            }
                        },
                        {
                            field: 'totalStock', title: '托盘总数', align: 'center', fixedLeft: true,width:80
                        },
                        {
                            field: 'supplierCompanyName', title: '供货单位', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'supplierStorageName', title: '供货网点', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'consigneeCompanyName', title: '收货单位', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'operationCompany', title: '操作单位', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'operatorName', title: '操作人', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'createTime', title: '运单日期', align: 'center', fixedLeft: true, tips: true,width:155,
                            formatter: function (value, row, index) {
                                if (value) {
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:330,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.TRACKING.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.TRACKING.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                },
                                'click .tray-info': function (e, value, row, index) {
                                    M.Page.emit(URI.RENT.TRACKING.TRAY_INFO.PAGE, row);
                                    IOT.setSessionStore(URI.RENT.TRACKING.TRAY_INFO.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .location-info': function (e, value, row, index) {
                                      M.Page.emit(URI.RENT.TRACKING.LOCATION_INFO.PAGE, row);
                                      IOT.setSessionStore(URI.RENT.TRACKING.LOCATION_INFO.PAGE, JSON.stringify(row));
                                      return false;
                                },
                                'click .alarm-record': function (e, value, row, index) {
                                 M.Page.emit(URI.RENT.TRACKING.ALARM_RECORD.PAGE, row);
                                    return false;
                                },
                                'click .set-range': function (e, value, row, index) {
                                  M.Page.emit(URI.RENT.TRACKING.SET_RANGE.PAGE, row);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let html = [];
                                if (M.Authority.checkAuthority('pallet-track-detail')) {
                                    html.push('<a class="detail-account operate">查看</a>');
                                }
                               if (M.Authority.checkAuthority('pallet-track-pallet')) {
                                    html.push('<a class="tray-info operate">托盘信息</a>');
                                }
                                if (M.Authority.checkAuthority('pallet-track-position')) {
                                    html.push('<a class="location-info operate">位置跟踪</a>');
                                }
                                if (M.Authority.checkAuthority('pallet-track-alarm')) {
                                    html.push('<a class="alarm-record operate">告警记录</a>');
                                }
                                if (M.Authority.checkAuthority('pallet-track-fence')) {
                                    html.push('<a class="set-range operate">围栏设置</a>');
                                }
                                return html.join('');
                            }
                        }

                    ]
                });
            });
        }
    });
})();