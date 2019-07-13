import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/billCheck/page', params: {}},
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
            selectBillMaster:function(){

                let tableHookName2 = '.ScanResults2-table-hook';
            },
            newBill:function(){
                M.Page.emit(URI.BILL.BILL_CHECK.ADD.PAGE);
            },

            //初始化子表格(无线循环)
            SubTable :function (index, row, $detail) {

                var parentid = row.billnovch;
            //    var cur_table = $detail.find('table');
             /**   var $tableHook = $(cur_table).bootstrapTable({
                    url: URI.BILL.BILL_IN.LIST,
                    method: 'post',
                    queryParams: { billnovch: parentid },
                    ajaxOptions: { billnovch: parentid },
                    clickToSelect: true,
                    detailView: true,//父子表
                    uniqueId: "MENU_ID",
                    pageSize: 10,
                    pageList: [10, 25],
                    columns: [{
                        field: 'billNoVch', title: '单据号', align: 'center', width: 60,
                    },
                        {
                            field: 'wareNameVch', title: '仓库', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'planNoVch', title: '合同号', align: 'center', fixedLeft: true,tips:true
                        }, ],

                });  */
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

                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BILL.BILL_CHECK.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',

                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {
                        var wareCode = IOT.getLocalStore("backWare");
                        var itemMasterId = IOT.getLocalStore("itemMasterId");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({wareCode:wareCode,itemMasterId:itemMasterId}, params, formParams);
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
                            field: 'countId', title: '单据号', align: 'center', width: 60,
                        },
                        {
                            field: 'createUserName', title: '创建人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '创建时间', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */
                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>初始化</button>";}
                                else if (value === 2 ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>已审核</button>";}
                                else if (value === 3 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>作业中</button>";}
                                else if (value === 4 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>已完成</button>";}

                            }

                        },

                        {
                            field: 'wareName', title: '仓库', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'itemMasterName', title: '货主', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'countType', title: '盘点类型', align: 'center', fixedLeft: true,tips:true,
                            formatter: function (value, row, index) {

                                if (value === 1 ){return "明盘";}
                                else if (value === 2 ){return "暗盘";}


                            }
                        },



                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.BILL.BILL_CHECK.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_CHECK.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                            }
                        }
                    ],

                });

            });
        }
    });
})();









