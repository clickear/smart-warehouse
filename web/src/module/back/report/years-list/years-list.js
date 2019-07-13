import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {

            typeItems:[{text:'全部',value:''}],
            wareItems:[{text:'全部',value:''}],
            keywords:'',
            wareidint:'',
            goodstypecodevch:'',

            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/dayList/page', params: {}},
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

            clearType:function(){

                $vue.$data.goodstypecodevch = '';

            },



        },
        created: function () {
            //获取产品类型信息
            IOT.getServerData(URI.BASE.TYPE.LIST2,{},(ret) => {
                if (ret.code === 200) {

                    var  list = ret.data.list;
                    $.each(list,function(i,v){
                        $vue.$data.typeItems.push({text:v.goodstypenamevch,value:v.goodstypecodevch})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            //获取仓库信息
            IOT.getServerData(URI.BASE.WAREHOUSE.LIST,{},(ret) => {
                if (ret.code === 200) {

                    var  rows = ret.rows;
                    $.each(rows,function(i,v){
                        $vue.$data.wareItems.push({text:v.warenamevch,value:v.wareidint})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
            
                var $accountBox = $('.report-detail-hook');


                let tableHookName = '.report-detail-table-hook';
                $accountBox.find('input[name=workstarttime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d H',
                    formatDate: 'Y-m-d H',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: true // 关闭时间选项
                });
                $accountBox.find('input[name=workendtime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d H',
                    formatDate: 'Y-m-d H',
                    scrollMonth: false,
                    scrollTime: true,
                    scrollInput: false,
                    timepicker: true // 关闭时间选项
                });

                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');


                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'inventory-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.REPORT.REPORT_YEARS.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    detailView:true,
                    customQueryParams: function (params) {
                        var wareidint = IOT.getLocalStore("backWare");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({wareidint:wareidint}, params, formParams);
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
                            field: 'itemnamevch', title: '物料名称', align: 'center', fixedLeft: true, tips:true,width:320,
                        },
                        {
                            field: 'abctypeVch', title: '规格', align: 'center', fixedLeft: true, tips:true,width:200,
                        },

                        {
                            field: 'inquantityfl', title: '入库数量', align: 'center', fixedLeft: true, tips:true,width:100,
                        },
                        {
                            field: 'outquantityfl', title: '出库数量', align: 'center', fixedLeft: true, tips:true,width:100,
                        },
                        {
                            field: 'unitcodevch', title: '单位', align: 'center', fixedLeft: true, tips:true,width:80,
                        },
                        {
                            field: 'workstarttime', title: '统计开始时间', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'workendtime', title: '统计结束时间', align: 'center', fixedLeft: true, tips:true
                        },


                    ],

                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
             
                        var itemcodevch = row.itemcodevch;
                        var wareidint = row.wareidint;
                        var workstarttime = row.workstarttime;
                        var workendtime = row.workendtime;

                        $detail.html("<table></table>");
                        let tableHookName2 = $detail.find("table");
                        tableHookName2.bootstrapTable({
                            scrollbar: 'patchAllocation-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url:URI.BILL.BILL_IN.DETAIL.DATA,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',

                            onClickRow: function (row) {

                            },
                            customQueryParams: function (params) {
                                return   {"itemcodevch": itemcodevch ,"wareidint":wareidint,workstarttime:workstarttime,workendtime:workendtime};
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
                                    field: 'wareNameVch', title: '仓库', align: 'center',
                                },
                                {
                                    field: 'plannovch', title: '合同号', align: 'center',
                                },
                                {
                                    field: 'billtypeint', title: '操作类型', align: 'center',
                                    formatter: function (value, row, index) {
                                        /* 0初始化；1已审核；2已完成 */
                                        if (value === 1 ){return "入库";}
                                        else if (value === 2 ){return "出库";}
                                        else if (value === 3 ){return "移库";
                                        }
                                    }
                                },

                                {
                                    field: 'itemnamevch', title: '物料', align: 'center',
                                },

                                {
                                    field: 'quantityfl', title: '数量', align: 'center',
                                },
                                {
                                    field: 'operatedt', title: '时间', align: 'center',
                                },

                            ],


                        });
                    },

                });

            });
        }
    });
})();