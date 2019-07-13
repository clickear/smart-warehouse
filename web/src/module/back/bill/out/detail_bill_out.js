import $ from 'jQuery';
require('../../../../less/back/bill/detail_bill_out.less');
(function () {

    let masterData = JSON.parse(IOT.getSessionStore(URI.BILL.BILL_OUT.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            masterData:masterData,
            rowData:{},
            detailItems:[],
            prepareDara:[],

            prepareInsert:{
                prepareType:'',
                taskBatch:'',
                billNo:masterData.billNo,
            },

            insertData:{
                billMaster:JSON.parse(IOT.getSessionStore(URI.BILL.BILL_OUT.DETAIL.PAGE)),
                billDetails:[],

            },
        },
        created:function (){
            if(masterData.state   =='1'){  //初始化状态可以删除、审核
                $('#export').after('<button class="primary_btn"  @click.stop="deleteBill()">删除</button><button class="primary_btn"  @click.stop="checkBill()">审核</button><button class="primary_btn" id="accept"data-toggle="modal"@click="prepare()">配货</button>')
            }
            if(masterData.state   =='2'){  //审核状态，可以完成
                $('#export').after('<button class="primary_btn" id="accept"data-toggle="modal"@click="prepare()">配货</button>')
            }

            if(masterData.state   =='4'){  //已分拣，可以完成
                $('#export').after('<button class="primary_btn" id="accept"data-toggle="modal"@click="prepare()">出库</button>')
            }
            if(masterData.state   =='5'){  //已复核，可以完成
                $('#export').after('<button class="primary_btn" id="accept"data-toggle="modal"@click="completeOut()">出库</button>')
            }

            //获取详情信息
            IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:masterData.billNo},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows

                    $.each(list,function(i,v){
                        var index = i+1;
                        var itemName = v.itemName;
                        var itemClass = v.itemClass;
                        var unitName = v.unitName;
                        var batch =v.batch;
                        var quantity = v.quantity;
                        $vue.$data.insertData.billDetails.push({index:index,itemName:itemName,itemClass:itemClass,unitName:unitName,batch:batch,quantity:quantity})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            var billNo = masterData.billNo;
            $("#bcTarget").barcode(billNo, "code128",{
                // output:'css',       //渲染方式 css/bmp/svg/canvas
                //bgColor: '#ff0000', //条码背景颜色
                color: '#000000',   //条码颜色
                barWidth: 1,        //单条条码宽度
                barHeight: 50,     //单体条码高度
                // moduleSize: 5,   //条码大小
                // posX: 10,        //条码坐标X
                // posY: 5,         //条码坐标Y
                //  addQuietZone: false  //是否添加空白区（内边距）
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
            
            printBill:function(){
                $("#printArea").printArea();
            },

            newCss:function(i,id,isAll,areaName,shelfName,cellName,itemName,itemClass,quantity){
                i +=1;
                var x ;
                var y;

                if(i%4 == 0){
                    x = 4
                }else{
                    x = i%4
                }
                y = Math.ceil(i/4)
                var left = 200*(x -1) + 25 + 'px';
                var top =(Math.ceil(i/4)-1)*80 +2 + '%';
                var html = "<div  class='cell' style='left:"+left+";top:"+top+"'>" +
                    "<img class = 'close' src='./close.png'></img>" +
                    "<div class = 'cell1'>" +
                    "<div class = 'row'>" +
                    "<span class = 'name'>货区：</span>" +
                    "<span class = 'value'>"+areaName+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name'>货架：</span>" +
                    "<span class = 'value'>"+shelfName+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name'>货位：</span>" +
                    "<span class = 'value'>"+cellName+"</span>" +
                    "</div>" +
                    "</div>" +
                    "<div class = 'cell2'>" +
                    "<div class = 'row'>" +
                    "<span class = 'name2'>物料：</span>" +
                    "<span class = 'value2'>"+itemName+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name2'>规格：</span>" +
                    "<span class = 'value2'>"+itemClass+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name2'>数量：</span>" +
                    "<span class = 'value2'>"+ quantity +"</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                var html0 = "<div  class='cell' style='left:"+left+";top:"+top+"'>" +
                    "<img class = 'close' src='./close.png'></img>" +
                    "<div class = 'cell0'>" +
                    "<div class = 'row'>" +
                    "<span class = 'name'>货区：</span>" +
                    "<span class = 'value'>"+areaName+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name'>货架：</span>" +
                    "<span class = 'value'>"+shelfName+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name'>货位：</span>" +
                    "<span class = 'value'>"+cellName+"</span>" +
                    "</div>" +
                    "</div>" +
                    "<div class = 'cell2'>" +
                    "<div class = 'row'>" +
                    "<span class = 'name2'>物料：</span>" +
                    "<span class = 'value2'>"+itemName+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name2'>规格：</span>" +
                    "<span class = 'value2'>"+itemClass+"</span>" +
                    "</div>" +
                    "<div class = 'row'>" +
                    "<span class = 'name2'>数量：</span>" +
                    "<span class = 'value2'>"+ quantity +"</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                if(isAll ==1){
                    return html;
                 //   return "<div  class='cell' style='left:"+left+";top:"+top+"'><img class = 'close' src='./close.png'></img><div class = 'cell1'><div class = 'row'><span class = 'name'>货区：</span><span class = 'value'>"+areaName+"</span></div><div class = 'row'><span class = 'name'>货架：</span><span class = 'value'>"+shelfName+"</span></div><div class = 'row'><span class = 'name'>货位：</span><span class = 'value'>"+cellName+"</span></div></div><div class = 'cell2'><div class = 'row'><span class = 'name2'>物料：</span><span class = 'value2'>"+itemName+"</span></div><div class = 'row'><span class = 'name2'>规格：</span><span class = 'value2'>"+itemClass+"</span></div><div class = 'row'><span class = 'name2'>数量：</span><span class = 'value2'>"+ quantity +"</span></div></div></div>";
                }else if(isAll == 0){
                    return html0;
                 //   return "<div  class='cell' style='left:"+left+";top:"+top+"'><img class = 'close' src='./close.png'></img><div class = 'cell0'><div class = 'row'><span class = 'name'>货区：</span><span class = 'value'>"+areaName+"</span></div><div class = 'row'><span class = 'name'>货架：</span><span class = 'value'>"+shelfName+"</span></div><div class = 'row'><span class = 'name'>货位：</span><span class = 'value'>"+cellName+"</span></div></div><div class = 'cell2'><div class = 'row'><span class = 'name2'>物料：</span><span class = 'value2'>"+itemName+"</span></div><div class = 'row'><span class = 'name2'>规格：</span><span class = 'value2'>"+itemClass+"</span></div><div class = 'row'><span class = 'name2'>数量：</span><span class = 'value2'>"+ quantity +"</span></div></div></div>";
                }
            },

            getArr:function(list){
                var arr = "";
                if(list.length == 0){
                    return
                }
                for(var i = 0 ;i <list.length;i++){
                    var cellItem = list[i];
                    var css = this.newCss(i,i,cellItem.isAll,cellItem.areaName,cellItem.shelfName,cellItem.cellName,cellItem.itemName,cellItem.itemClass,cellItem.quantity);
                    arr = arr+css
                }
                return arr;
            },

            innertCell:function(list){
                document.getElementById("xian").innerHTML = this.getArr(list);
            },

            createCell:function(style){
                var list1 = [{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:154,itemName:'fasdfa',isAll:'0'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:154,itemName:'fasdfa',isAll:'0'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:154,itemName:'fasdfa',isAll:'0'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:154,itemName:'fasdfa',isAll:'0'}];

                var list2 = [{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:1212,itemName:'帽子',isAll:'0',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'}];
                var list3 = [{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'}];
                var list4 = [{cellCode:1212,itemName:'帽子',isAll:'0',areaName:'四区'}];
                  list3 = [{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:1212,itemName:'帽子',isAll:'0',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'},{cellCode:1212,itemName:'帽子',isAll:'1',areaName:'一区',shelfName:'一号架',cellName:'一行一列',itemCode:'帽子',itemClass:'红色',quantity:'100'}];
                var prepareData = $vue.$data.prepareData;
                if(style ==1){
                    document.getElementById("xian").innerHTML = this.getArr(prepareData.xian);

                }else if(style ==2){
                    document.getElementById("xian").innerHTML = this.getArr(prepareData.qing);
                }
                else if(style ==3){
                    document.getElementById("xian").innerHTML = this.getArr(list3);
                }
                else if(style ==4){
                    this.innertCell(list4);
                }
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
                $("#acceptModal").modal('hide');
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

            okPrepare:function () {
                $("#aaaaa").css("display","none");
            },

            noPrepare:function () {
                $("#aaaaa").css("display","none");
            },

            prepare:function(){
                /*var billNo = $vue.$data.masterData.billNo;
                IOT.getServerData(URI.BILL.BILL_OUT.PREPARE,{billNo:billNo},(ret) => {
                    if (ret.code === 200) {


                        $vue.$data.prepareData = ret.data;

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                this.createCell(1);

                $("#aaaaa").css("display","block");*/

                $("#prepareModal").modal('show');

            },

            commitPrepare:function(){

                var taskBatch = $vue.$data.prepareInsert.taskBatch;
                var prepareType = $vue.$data.prepareInsert.prepareType;
                var prepareInsert = $vue.$data.prepareInsert;
                if(prepareType ==null || prepareType=='' ){
                    return false
                }

                IOT.showOverlay('保存中，请稍等...');
                $("#prepareModal").modal('hide');
                IOT.getServerData(URI.TASK.PREPARE_TASK.ADD,prepareInsert,(ret) => {
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

            completeOut:function(){
                var billNo = masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL_OUT.COMPLETE,prepareInsert,(ret) => {
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

        },
        mounted: function () {
            var that = this;





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
                            field: 'batch', title: '批次', align: 'center', fixedLeft: true,tips:true,
                            formatter: function (value, row, index) {

                                if (value === null || value =='' ){return "所有批次";}

                            }
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
                            field: 'needReturn', title: '是否返库', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {

                                if (value === 1 ){return "需要";}
                                if (value === 2 ){return "不需要";}

                            }

                        },


                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },
                              /*  'click .prepare': function (e, value, rowData, index) {
                                    $("#prepareModal").modal('show');

                                  /!*  that.createCell(2);
                                     $("#aaaaa").css("display","block");
*!/

                                },*/
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
                                  //  this.onExpandRow(index,rowData,e)
                                  
                                    var details = $('.detail-icon');
                                    var detail = details[index +1];
                                    var length = details.length;


                                    $.each(details,function(i,v){
                                            details.splice(0,1)
                                    });
                                    details.push(detail);

                                    details.trigger("click");
                                 //   $('.detail-icon')[index +1].trigger("click");
                                 //   $('.detail-icon').parentElement.trigger("click");


                                 //   $detail.html("<div style='width: 100%;height: 270px;border-style: solid'></div>");
                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];

                            /*    operate.push(' <button style="" class="btn btn-blue prepare">配货</button>');*/
                                operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                operate.push(' <button class="btn btn-red delete">删除</button>');

                                return  operate.join(' ');
                            }
                        }


                    ],
                     

                });

            });
        }
    });
})();









