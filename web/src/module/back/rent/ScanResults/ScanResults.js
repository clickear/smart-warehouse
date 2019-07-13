import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            scanType: [{id: 0, name: '出库'}, {id:1, name: '入库'}, {id: 2, name: '盘点'}, {id: 3, name: '报损'}],
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
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.ScanResults-hook');
                //初始化时间插件
                modal.initDate("startdate","enddate");
                let tableHookName = '.ScanResults-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'ScanResults-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.RENT.SCAN_RESULTS.LIST,
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
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {
                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 60,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'palletCount', title: '录入托盘总数', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'orderNo', title: '运单号', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'uploadUserId', title: '上传账户', align: 'center', fixedLeft: true,tips:true
                        },
                         {
                            field: 'deviceType', title: '设备类型', align: 'center', fixedLeft: true,
                            /*formatter: function (value, row, index) {
                                /!* 1入库；2出库； *!/
                                if (value === 1 ){return "入库";}
                                else if (value === 2 ){return "出库";}
                            }*/
                        },
                        {
                            field: 'scanType', title: '扫描类型', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if (value === 0 ){return "出库";}
                                else if (value === 1 ){return "入库";}
                                else if (value === 2 ){return "盘点";}
                                else if (value === 3 ){return "报损";}
                            }
                        },
                        {
                            field: 'createTime', title: '扫描录入日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if ((!value)&&(value!=0)){
                                    return '-';
                                }else{
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.RENT.SCAN_RESULTS.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.SCAN_RESULTS.DETAIL.PAGE, JSON.stringify(rowData));
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