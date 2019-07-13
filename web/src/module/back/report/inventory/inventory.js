import $ from 'jQuery';
require('../../../../../static/lib/bootstrap-table/tableExport');

(function () {
    let $vue = new Vue({
        el: '.inventory-main-hook',
        data: {

            typeItems:[{text:'全部',value:''}],
            wareItems:[{text:'全部',value:''}],
            keyWords:'',
            wareCode:'',
            itemTypeCode:'',
            unitName:'',
            unitCode:'',

            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/inventory/page', params: {}},
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

                $vue.$data.itemTypeCode = '';

            },

            writeXls:function(datas) {
                var buffer = xlsx.build({worksheets: [{"name": "Group", "data": datas},{"name": "Group", "data": datas}]});
                fs.writeFileSync("Group.csv", buffer, 'binary');
            },

            parseXls:function() {
                var obj = xlsx.parse('myFile.xlsx');

            },

            exports:function(){
                $('.inventory-table-hook').tableExport({type:'excel',escape:false});


            },



        },
        created: function () {
            //获取产品类型信息
            IOT.getServerData(URI.BASE.TYPE.LIST,{},(ret) => {
                if (ret.code === 200) {

                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.typeItems.push({text:v.itemTypeName,value:v.itemTypeCode})
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
                        $vue.$data.wareItems.push({text:v.wareName,value:v.wareCode})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            //获取单位信息
            IOT.getServerData(URI.BASE.UNIT.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.typeItems1.push({text:v.unitName,value:v.unitCode})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.inventory-hook');
                let tableHookName = '.inventory-table-hook';
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
                    url: URI.REPORT.INVENTORY.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    showExport: true,                     //是否显示导出
                    exportDataType: "all",
                    editable:true,//开启编辑模式

                    customQueryParams: function (params) {
                        var wareCode = IOT.getLocalStore("backWare");
                        var itemMasterId = IOT.getLocalStore("itemMasterId");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({wareCode:wareCode,itemMasterId:itemMasterId}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function () {
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    detailView: true,
                    columns: [


                        {
                            field: 'itemCode', title: '物料编码', align: 'center',
                        },
                        {
                            field: 'itemName', title: '物料名称', align: 'center',
                        },

                        {
                            field: 'quantity', title: '数量', align: 'center',
                       

                        },

                        {
                            field: 'unitName', title: '单位', align: 'center', fixedLeft: true, tips:true
                        },

                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                        var itemCode = row.itemCode;
                        if(itemCode ==null || itemCode ==''){
                        	return false;
                        }
                        var wareCode = IOT.getLocalStore("backWare");
                        var itemMasterId = IOT.getLocalStore("itemMasterId");


                        $detail.html("<table></table>");
                        let tableHookName2 = $detail.find("table");
                        tableHookName2.bootstrapTable({
                            scrollbar: 'patchAllocation-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url: URI.REPORT.INVENTORY.BATCH.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',
                            detailView: true,
                            customQueryParams: function (params) {

                                return   {"itemCode": itemCode,"wareCode":wareCode,"itemMasterId":itemMasterId };
                            },
                            onLoadSuccess: function (data) {
                                console.log(data);
                            },
                            onLoadError: function (status, xhr) {
                            },
                            onCheckAll: function (rows) {

                            },
                            columns: [

                                /*{
                                    field: 'wareName', title: '仓库', align: 'center',
                                },
                                {
                                    field: 'itemMasterName', title: '货主', align: 'center',
                                },
                                {
                                    field: 'itemCode', title: '物料编码', align: 'center',
                                },*/
                                {
                                    field: 'itemName', title: '物料名称', align: 'center',
                                },
                                {
                                    field: 'batch', title: '批次', align: 'center',
                                },
                                {
                                    field: 'quantity', title: '数量', align: 'center',


                                },

                                {
                                    field: 'unitName', title: '单位', align: 'center', fixedLeft: true, tips:true
                                },

                            ],
                            //注册加载子表的事件。注意下这里的三个参数！
                            onExpandRow: function (index, row, $detail) {
                                var batchId = row.batchId;
                                var wareCode = IOT.getLocalStore("backWare");
                                var itemMasterId = IOT.getLocalStore("itemMasterId");


                                $detail.html("<table></table>");
                                let tableHookName2 = $detail.find("table");
                                tableHookName2.bootstrapTable({
                                    scrollbar: 'patchAllocation-table-body',
                                    striped: true, // 设置为 true 会有隔行变色效果
                                    pagination: true, // true 显示分页
                                    paginationDetail: false, // 分页详情
                                    sidePagination: 'server', // 服务器端
                                    method: 'post',
                                    url: URI.BASE.PLLET.BATCH,
                                    debug: false,
                                    cache: false,
                                    pageNumber: 1,
                                    pageSize: 20,
                                    // fixedColumns: true,
                                    customButton: '',
                                    editable:true,//开启编辑模式
                                    customQueryParams: function (params) {

                                        return   {"batchId": batchId,"wareCode":wareCode,"itemMasterId":itemMasterId };
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
                                            field: 'itemName', title: '物料名称', align: 'center',
                                        },
                                        {
                                            field: 'batch', title: '批次', align: 'center',
                                        },
                                        {
                                            field: 'areaName', title: '货区', align: 'center',
                                        },
                                        {
                                            field: 'shelfName', title: '货架', align: 'center',
                                        },
                                        {
                                            field: 'cellName', title: '货位', align: 'center',
                                        },
                                        {
                                            field: 'palletId', title: '托盘', align: 'center',
                                        },
                                        {
                                            field: 'quantity', title: '数量', align: 'center',

                                        },

                                        {
                                            field: 'unitName', title: '单位', align: 'center', fixedLeft: true, tips:true
                                        },

                                    ],
                                })
                            },
                        })
                    },
                });
                //权限——查看
               /* if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();