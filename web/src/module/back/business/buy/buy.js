import $ from 'jQuery';
var wareCode = IOT.getLocalStore("baseWare");
(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            orderCode:'',
            itemName:'',
            itemCode:'',
            itemClass:'',
            price:'',
            orderNum:'',
            orderTotal:'',
            supplierCode:'',
            supplierName:'',
            state:'',
            ynBill:'',
            addTime:'',
            workStartTime:'',
            workEndTime:'',
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
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
                M.Page.emit(URI.BUSINESS.BUY.ADD.PAGE);
            },



        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.business-buy-main-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                $accountBox.find('input[name=workStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=workEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: true,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.business-buy-table-hook';

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
                    url:URI.BUSINESS.BUY.LIST,
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
                         
                        var wareCode = IOT.getLocalStore("backWare");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({type:1,wareCode:wareCode}, params, formParams);
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
                            field: 'orderCode', title: '采购单号', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'itemName', title: '产品名称', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'itemCode', title: '产品编号', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'itemClass', title: '产品类别', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'price', title: '单价', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'unitCode', title: '单位', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'orderNum', title: '数量', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'orderTotal', title: '总额', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'supplierCode', title: '供应商编号', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'supplierName', title: '供应商名称', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */
                                if (value === 1 ){return "初始化";}
                                else if (value === 2 ){return "已审核";}
                                else if (value === 3 ){return "作业中";
                                }else if (value === 4 ){return "完成";
                                }
                            }
                        },
                        {
                            field: 'ynBill', title: '是否入账', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'addTime', title: '创建时间', align: 'center', fixedLeft: true,
                        },



                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.BUSINESS.BUY.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BUSINESS.BUY.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                            }
                        }
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                         var billNo = row.billNo;

                        $detail.html("<table></table>");
                        let tableHookName2 = $detail.find("table");
                        tableHookName2.bootstrapTable({
                            scrollbar: 'patchAllocation-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url: URI.BUSINESS.BUY.DETAIL.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',

                            onClickRow: function (row) {
                                //  console.log("click:" + row.playerName)
                                var billNo = row.billNo;
                                console.log("click:" + billNoVch)
                            },
                            customQueryParams: function (params) {

                                return   {"billNo": billNo };
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
                                    field: 'areaName', title: '货区名', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'itemName', title: '物料名', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'itemClass', title: '规格', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'quantity', title: '数量', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'acceptQuantity', title: '验收数量', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'completeQuantity', title: '上架数量', align: 'center', fixedLeft: true,
                                },


                            ]
                        })
                    },

                });

            });
        }
    });
})();









