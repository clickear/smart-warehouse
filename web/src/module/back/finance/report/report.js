import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/financeReport/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '/back/financeReport/page', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '/back/financeReport/page', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '/back/financeReport/page', params: {}}
            },
            items:[{"text":"aaa","value":"bbb"}],

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
            selectBillMaster:function(){

                let tableHookName2 = '.ScanResults2-table-hook';
            },


            newBillIn:function(){
                M.Page.emit(URI.BILL.BILL_IN.ADD.PAGE);
            }


        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.ScanResults-hook');
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
                let tableHookName = '.ScanResults-table-hook';
                let tableHookName2 = '.ScanResults2-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BILL.BILL_IN.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    detailView: true,
                    onClickRow: function (row) {
                        //  console.log("click:" + row.playerName)
                        var billNoVch = row.billNoVch;
                        console.log("click:" +billNoVch)
                    },
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
                            checkbox: true
                        },
                        {
                            field: 'billnovch', title: '单据号', align: 'center', width: 60,
                        },
                        {
                            field: 'warenamevch', title: '仓库', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'plannovch', title: '合同号', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'stateint', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 0初始化；1已审核；2已完成 */
                                if (value === 0 ){return "初始化";}
                                else if (value === 1 ){return "已审核";}
                                else if (value === 2 ){return "已完成";
                                }
                            }
                        },
                        {
                            field: 'operatervch', title: '操作人员', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'operatedt', title: '操作时间', align: 'center', fixedLeft: true,

                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;
                            }
                        }
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                         var billnovch = row.billnovch;

                        $detail.html("<table></table>");
                        let tableHookName2 = $detail.find("table");
                        tableHookName2.bootstrapTable({
                            scrollbar: 'patchAllocation-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url: URI.BILL.BILL_IN.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',

                            onClickRow: function (row) {
                                //  console.log("click:" + row.playerName)
                                var billNoVch = row.billNoVch;
                                console.log("click:" + billNoVch)
                            },
                            customQueryParams: function (params) {

                                return   {"billnovch": billnovch };
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
                                    field: 'areanamevch', title: '货区名字', align: 'center', fixedLeft: true
                                },

                                {
                                    field: 'itemnamevch', title: '物料编码', align: 'center', fixedLeft: true, tips: true
                                },
                                {
                                    field: 'abctypevch', title: '物料规格', align: 'center', fixedLeft: true, tips: true
                                },
                                {
                                    field: 'quantityfl', title: '数量', align: 'center', fixedLeft: true, tips: true
                                },

                                {
                                    field: 'operaterVch', title: '操作人员', align: 'center', fixedLeft: true,
                                },

                                {
                                    field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                                    events: {
                                        'click .detail-account': function (e, value, rowData, index) {
                                            M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                            IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));
                                            return false;
                                        }
                                    },
                                    formatter: function (value, row, index) {
                                        return `<a class="detail-account">查看</a>`;
                                    }
                                }
                            ]
                        })
                    },

                });

            });
        }
    });
})();









