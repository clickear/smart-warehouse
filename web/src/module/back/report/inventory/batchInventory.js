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
            batch:{},

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
                            field: 'wareName', title: '仓库', align: 'center',
                        },
                        {
                            field: 'itemMasterName', title: '货主', align: 'center',
                        },
                        {
                            field: 'itemCode', title: '物料编码', align: 'center',
                        },
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
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {

                                'click .print': function (e, value, rowData, index) {

                                    var batchId = rowData.batchId;

                                    IOT.getServerData(URI.BASE.ITEM.BATCH,{batchId:batchId},(ret) => {

                                        if (ret.code === 200) {
                                            $vue.$data.batch = ret.rows[0];
                                            var batchId = $vue.$data.batch.itemBatchBarCode;


                                            $("#batchBar").barcode(batchId, "code128",{
                                                // output:'css',       //渲染方式 css/bmp/svg/canvas
                                                //bgColor: '#ff0000', //条码背景颜色
                                                color: '#000000',   //条码颜色
                                                barWidth: 2,        //单条条码宽度
                                                barHeight: 80,     //单体条码高度
                                                // moduleSize: 5,   //条码大小
                                                // posX: 10,        //条码坐标X
                                                // posY: 5,         //条码坐标Y
                                                //  addQuietZone: false  //是否添加空白区（内边距）
                                            });
                                            $("#itemName").text($vue.$data.batch.itemName);
                                            $("#batch").text($vue.$data.batch.batch);
                                            $("#itemClass").text($vue.$data.batch.itemClass);
                                            $("#itemCode").text($vue.$data.batch.itemCode);

                                        } else {
                                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                        }
                                        $("#batchPrintArea").printArea();
                                    });
                                },



                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                operate.push(' <button style="" class="btn btn-blue print">打印条码</button>');
                                return  operate.join(' ');
                            }
                        }

                    ],
                })
                //权限——查看
               /* if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();