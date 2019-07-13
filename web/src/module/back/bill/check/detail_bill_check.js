import $ from 'jQuery';
(function () {
    let masterData = JSON.parse(IOT.getSessionStore(URI.BILL.BILL_CHECK.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            masterData:{},
            details:[],
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prePage: function () {
                M.Page.prePage(this.boxs);
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

            task:function(){
                var countId = masterData.countId;

                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_CHECK.TASK,{countId:countId},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            $("#prepareModal").modal('hide');
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

            }

        },
        created:function(){
            //获取详情信息
            var countId = masterData.countId;
            IOT.getServerData(URI.BILL.BILL_CHECK.LIST,{countId:countId},(ret) => {

                if (ret.code === 200) {
                    var  list = ret.rows;

                    $vue.$data.masterData= list[0];
                    var masterData = list[0];
                    if(masterData.countType ==1){
                        masterData.countType = "明盘"
                    }else if(masterData.countType ==2){
                        masterData.countType="暗盘"
                    }

                    if(masterData.state ==1){
                        masterData.state ="初始化"
                    }else if(masterData.state ==2){
                        masterData.state ="已审核"
                    }else if(masterData.state =3){
                        masterData.state ="作业中"
                    }else if(masterData.state ==4){
                        masterData.state ="已完成"
                    }
                    $vue.$data.masterData= masterData;

                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });



        },

        mounted: function () {





            this.$nextTick(() => {

                $(".billDetail-check-table-hook").bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BILL.BILL_CHECK.DETAIL.DATA,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',


                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {

                        var queryParams ={countId:masterData.countId};
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
                            field: 'areaName', title: '盘点货区', align: 'center', fixedLeft: true,tips:true,
                            formatter: function (value, row, index) {
                                if(value ==null || value == ''){
                                    return "所有货区"
                                }else {
                                    return value
                                }

                            }

                        },
                        {
                            field: 'shelfName', title: '盘点货架', align: 'center', fixedLeft: true,tips:true,
                            formatter: function (value, row, index) {
                                if(value ==null || value == ''){
                                    return "所有货架"
                                }else {
                                    return value
                                }

                            }

                        },
                        {
                            field: 'itemName', title: '盘点物料', align: 'center', fixedLeft: true,tips:true,
                            formatter: function (value, row, index) {
                                if(value ==null || value == ''){
                                    return "所有物料"
                                }else {
                                    return value
                                }

                            }
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */
                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>初始化</button>";}
                                else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>作业中</button>";}
                                else if (value === 3 ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>初盘完成</button>";}
                                else if (value === 4 ){return "<button style='background-color: #9acfea ;border-style: none' class='btn btn-blue detail-account'>复盘中</button>";}

                                else if (value ===5 ){return "<button style='background-color: #7B68EE;border-style: none' class='btn btn-blue detail-account'>复盘完成</button>";}
                                else if (value ===5 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>完成</button>";}
                            }



                            //1-新建  2-作业中  3-初盘完成  4-复盘作业中 5-复盘完成 6-完成
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },
                                'click .print': function (e, value, rowData, index) {

                                    var detailNo = rowData.detailNo;

                                    IOT.getServerData(URI.BASE.ITEM.BATCH,{detailNo:detailNo},(ret) => {

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
                                            $("#itemName").text(rowData.itemName);
                                            $("#batch").text(rowData.batch);
                                            $("#itemClass").text(rowData.itemClass);
                                            $("#itemCode").text(rowData.itemCode);

                                        } else {
                                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                        }
                                        $("#batchPrintArea").printArea();
                                    });
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

                                'click .complete': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#upModal").modal('show');

                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                if(row.state ==1){

                                    operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                    operate.push(' <button class="btn btn-red delete">删除</button>');
                                }

                                if(row.state ==2){  //已验收
                                    operate.push(' <button style="" class="btn btn-blue complete">上架</button>');
                                }
                                operate.push(' <button style="" class="btn btn-blue print">打印条码</button>');



                                return  operate.join(' ');
                            }
                        }


                    ]
                });

            });
        }

    });
})();









