import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {

            typeItems:[{text:'全部',value:''}],
            typeItems1:[{text:'全部',value:''}],
            unitCode:'',
            itemTypeCode:'',
            rowData:{},
            info:{
                itemName:'',
                unitCode:'',
                itemTypeCode:'',
                itemClass:'',
                floorLimit:'',
                upperLimit:'',
                memo:'',
                itemBarCode:'',
                unitName:'',
            },


            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: 'back/item/page', params: {}},
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
                $("#insertModal").modal('show');
            },

            updateItem:function(){
                var item = $vue.$data.rowData;
                $("#updateModal").modal('hide');
                $vue.$data.rowData = [];
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BASE.ITEM.UPDATE,item,(ret) => {

                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            layer.closeAll();
                            M.Table.refresh.all();


                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            insertItem:function(){

                var item = $vue.$data.info;
                $("#newModal").modal('hide');
                $vue.$data.info ={
                    itemName:'',
                        unitCode:'',
                        itemTypeCode:'',
                        itemClass:'',
                        floorLimit:'',
                        upperLimit:'',
                        memo:'',
                        itemBarCode:'',
                        unitName:'',
                };

                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BASE.ITEM.ITEM_ADD.SAVE,item,(ret) => {

                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {

                            layer.closeAll();
                            M.Table.refresh.all();


                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }


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
                var $accountBox = $('.return-hook');
                let tableHookName = '.item-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'return-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.BASE.ITEM.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                   // fixedColumns: true,
                    customButton: '',
                    //是否启用排序
                    sortable: true,
                    //排序方式
                    sortOrder: "asc",//排序
                    sortName: 'itemTypeName',//排序字段
                    showColumns: true,                  //是否显示所有的列（选择显示的列）
                    // showRefresh: true,                  //是否显示刷新按钮
                    vidField: "id",












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


                    queryParams : function (params) {
                        //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                        var temp = {
                            rows: params.limit,                         //页面大小
                            page: (params.offset / params.limit) + 1,   //页码
                            sort: params.sort,      //排序列名
                            sortOrder: params.order //排位命令（desc，asc）
                        };
                        return temp;
                    },





                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'itemCode', title: '物料编号', align: 'center', fixedLeft: true, tips:true,sortable: true
                        },
                        {
                            field: 'itemName', title: '物料名称', align: 'center', fixedLeft: true, tips:true,sortable: true
                        },

                        {
                            field: 'itemClass', title: '规格型号', align: 'center', fixedLeft: true, tips:true,width:180,sortable: true
                        },
                        {
                            field: 'itemTypeName', title: '物料类型', align: 'center', fixedLeft: true, tips:true,width:120,sortable: true
                        },

                        {
                            field: 'unitName', title: '单位', align: 'center', fixedLeft: true, tips:true ,width:80
                        },
                        {
                            field: 'abcClass', title: 'ABC分类', align: 'center', fixedLeft: true, tips:true,width:80
                        },

                        {
                            field: 'upperlimit', title: '库存上限', align: 'center', fixedLeft: true, tips:true,width:80
                        },
                        {
                            field: 'floorlimit', title: '库存下限', align: 'center', fixedLeft: true, tips:true,width:80
                        },

                        {
                            field: 'memo', title: '备注', align: 'center', fixedLeft: true, tips:true,width:160
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },

                                'click .print': function (e, value, rowData, index) {
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#itemBar").barcode(rowData.itemCode, "code128",{
                                        // output:'css',       //渲染方式 css/bmp/svg/canvas
                                        //bgColor: '#ff0000', //条码背景颜色
                                        color: '#000000',   //条码颜色
                                        barWidth: 2,        //单条条码宽度
                                        barHeight: 40,     //单体条码高度
                                        moduleSize: 3,   //条码大小
                                        posX: 0,        //条码坐标X
                                        posY:0,         //条码坐标Y
                                      addQuietZone: false  //是否添加空白区（内边距）
                                    });
                                    $("#itemCode").text(rowData.itemCode);
                                    $("#itemName").text(rowData.itemName);
                                    $("#itemClass").text(rowData.itemClass);
                                    $("#itemTypeName").text(rowData.itemTypeName);
                                    $("#unitName").text(rowData.unitName);
                                    $("#abcClass").text(rowData.abcClass);
                                    $("#itemPrintArea").printArea();

                                },


                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此物料？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var itemCode = rowData.itemCode;
                                        IOT.getServerData(URI.BASE.ITEM.DELETE,{itemCode:itemCode},(ret) => {
                                            IOT.hideOverlay();
                                            if (ret.code === 200) {
                                                IOT.tips('保存成功！', 'success', 1000 , function () {
                                                    layer.closeAll();
                                                    M.Table.refresh.all();
                                                });

                                            } else {
                                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                            }
                                        });
                                    }, function(){
                                        //取消
                                    });

                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                operate.push(' <button class="btn btn-red delete">删除</button>');
                                operate.push(' <button class="btn btn-blue print">打印条码</button>');
                                return  operate.join(' ');
                            }





                        }
                    ]
                });





                //权限——查看
                /*if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();