import $ from 'jQuery';

(function () {

    let masterData = JSON.parse(IOT.getSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {
         /*   billnovch:'',
            plannovch:'',
            wareNameVch:'',
            memovch:'',
            operatervch:'',
            operatedt:'',
            billtypeint:'',
*/

            masterData:masterData,
            rowData:{},
            detailItems:[],


        },
        created:function (){
            if(masterData.state   =='1'){  //初始化状态可以删除、审核
                $('#export').after('<button class="primary_btn"  @click.stop="deleteBill()">删除</button><button class="primary_btn"  @click.stop="checkBill()">审核</button>')
            }
            if(masterData.stateint   =='2'){  //审核状态，可以完成
                $('#export').after('<button class="primary_btn"  @click.stop="okBill()">下发上架任务</button>')
            }

            //获取详情信息
            IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:masterData.billNo},(ret) => {
             
                if (ret.code === 200) {
                    var  list = ret.rows

                    $.each(list,function(i,v){
                        $vue.$data.detailItems.push(v)
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },

            exportBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.EXPORT,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            deleteBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            checkBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.CHECK,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            okBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.OK,{billNo:billNo},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },


            updateDetail:function(){
                $("#updateModal").modal('hide');
                var detail = $vue.$data.rowData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.UPDATE,detail,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            acceptDetail:function(){
                $("#updateModal").modal('hide');
                var detail = $vue.$data.rowData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.ACCEPT,detail,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },



        },
        mounted: function () {





            this.$nextTick(() => {
                var $accountBox = $('.client-detail-hook');


                let tableHookName = '.billDetail-in-table-hook';


                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BILL.BILL_DETAIL.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',


                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {

                        var queryParams ={billNo:$vue.$data.masterData.billNo};
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
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },
                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此行？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var id = rowData.id;
                                        IOT.getServerData(URI.BILL.BILL_DETAIL.DELETE,{id:id},(ret) => {
                                            IOT.hideOverlay();
                                            if (ret.code === 200) {
                                                IOT.tips('删除成功！', 'success', 1000 , function () {
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

                                },
                                'click .accept': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#acceptModal").modal('show');

                                },
                                'click .complete': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#completeModal").modal('show');

                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                operate.push(' <button style="" class="btn btn-blue accept">验收</button>');
                                operate.push(' <button style="" class="btn btn-blue complete">上架</button>');
                                operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                operate.push(' <button class="btn btn-red delete">删除</button>');

                                return  operate.join(' ');
                            }
                        }


                    ]
                });

            });
        }
    });
})();









