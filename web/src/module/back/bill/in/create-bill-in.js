require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-bill-in-hook',
        data: {
            info:{

                itemCode:'',

                quantity:'',
                itemTypeCode:'',
                itemName:'',
                unitName:'',
                unitCode:'',
                batch:'2018-08-31',

                keyWords:'',

                wareCode:'',

            },
            typeItems:[],
            items:[],
            itemItems:[],
            itemBatchs:[],


            list:[],
            account:{},
            insert:{
                billMaster:{
                    wareCode:IOT.getLocalStore("backWare"),
                    itemMasterId:IOT.getLocalStore("itemMasterId"),
                    contractNo:'',
                    memo:'',
                    type:'1',
                    state:'1',



                },
                details:[],
                itemBatchs:[]

            }
        },
        computed:{


            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },

        },
        created: function () {


            var that = this
            this.$nextTick(() => {
                that.createTable()

            });

            //获取产品种类信息
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
                        $vue.$data.info.push({text:v.unitName,value:v.unitCode})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });





        },
        methods: {

            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            clean:function(){
              $vue.$data.info.keyWords = '';
              $vue.$data.info.itemTypeCode = '';
            },
            save: function(){


                var insert = $vue.$data.insert;
                var billDetails = insert.details;
                if(billDetails == null || billDetails.length ==0){
                    layer.alert('请添加入库详情');
                    return false;
                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.ADD.SAVE,{billMaster:insert.billMaster,billDetails:insert.details},(ret) => {
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



            changeType:function(){

                //获取物料信息

                $vue.$data.itemItems = [];
                var selectVal = $vue.$data.info.itemTypeCode;
                var keyWords =  $vue.$data.info.keyWords;
                IOT.getServerData(URI.BASE.ITEM.LIST2,{itemTypeCode:selectVal,keyWords:keyWords},(ret) => {
                    if (ret.code === 200) {
                        var  list = ret.data.list;

                        $.each(list,function(i,v){
                            $vue.$data.itemItems.push({text:v.itemName,value:v.itemCode})
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                $vue.$data.info.value = ""


            },
            changeItem:function(){


                var text = $("#select_item").find("option:selected").text();
                var value = $("#select_item").value;
                $vue.$data.info.itemName = text;
                var wareCode = IOT.getLocalStore('backWare');
                var itemMasterId = IOT.getLocalStore("itemMasterId");





            },


            newDetail:function(){

                var wareCode = IOT.getLocalStore("backWare");
                if(wareCode == "" || wareCode ==null){
                    layer.alert('请选择仓库');
                    return false;
                };
                $("#myModal3").modal('show');


            },


            commitItem:function(){
                var that= this;
                var wareCode = IOT.getLocalStore("backWare");
                var toWareCode =$vue.$data.info.toWareCode;

                var $accountBox2 = $('.itemInfo-table-hook-wrapper');

                let tableHookName2 = '.itemInfo-table-hook';





                var getSelectRows = $accountBox2.find(tableHookName2).bootstrapTable('getAllSelections');
                var details= $vue.$data.insert.details;

                if(getSelectRows.length>0){
                    $.each(getSelectRows,function(i,v){
                        if(details.length>0){
                            var flag = 0
                            $.each(details,function(i2,v2){

                                if(v.itemCode == v2.itemCode){
                                    flag =1
                                }


                            });
                            if(flag ==0){
                                var itemCode = v.itemCode;
                                var itemMasterId = IOT.getLocalStore("itemMasterId");
                                var wareCode = IOT.getLocalStore("backWare");
                                var batchList = [];
                                IOT.getServerData(URI.REPORT.INVENTORY.BATCH.LIST,{itemCode:itemCode,itemMasterId:itemMasterId,wareCode:wareCode},(ret) => {

                                    if (ret.code === 200) {
                                        batchList = ret.rows;
                                        if(batchList.length>0){
                                            for(var i = 0;i<batchList.length;i++){
                                                batchList[i].value= batchList[i].batchId +':'+  batchList[i].batch
                                            }
                                            $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:batch,batchId:'',itemName:v.itemName,quantity:1,})
                                        }else {
                                            $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:[],batch:batch,batchId:'',itemName:v.itemName,quantity:1,})
                                        }


                                    } else {
                                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                    }
                                });


                            }
                        }else {
                            var itemCode = v.itemCode;
                            var itemMasterId = IOT.getLocalStore("itemMasterId");
                            var wareCode = IOT.getLocalStore("backWare");
                            var batchList = [];
                            IOT.getServerData(URI.REPORT.INVENTORY.BATCH.LIST,{itemCode:itemCode,itemMasterId:itemMasterId,wareCode:wareCode},(ret) => {

                                if (ret.code === 200) {
                                    var batchList = ret.rows;
                                    if(batchList.length>0){
                                        for(var i = 0;i<batchList.length;i++){
                                            batchList[i].value= batchList[i].batchId +':'+  batchList[i].batch
                                        }
                                        $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:batch,batchId:'',itemName:v.itemName,quantity:1,})
                                    }else {
                                        $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:[],batch:batch,batchId:'',itemName:v.itemName,quantity:1,})
                                    }



                                } else {
                                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                }
                            });

                        }


                    });


                }
                $("#myModal3").modal('hide');
            },
            changeBatch:function(index){
                var detail = $vue.$data.insert.details[index];
                var id = '#'+ detail.itemCode;
                var value = $(id).find("option:selected").val();
                var details = $vue.$data.insert.details;
                var batchId = value.split(":")[0];
                var quantity = value.split(":")[1];
                detail.batchId = batchId;
                detail.nowQuantity = parseInt(quantity);
                if(detail.quantity>detail.nowQuantity){
                    detail.quantity = detail.nowQuantity;
                }
                $vue.$data.insert.details[index] =detail;
                /* for(var i = 0;i<details.length;i++){
                     if(detail.itemCode == details[i].itemCode){
                         $vue.$data.insert.details[i]= detail;
                     }

                 }*/

            },
            onFocus:function(detail){
            },

            deleteDetail:function(index){
                this.insert.details.splice(index,1);
            },

            reCreateTable(){
                this.createTable();
            },

            /*createTable(){
               var  that = this;
                var $box = $('.create-bill-in-hook');
                let tableHookName = '.BillDetail-create-table-hook';
                $box.find(tableHookName).bootstrapTable('destroy');//将原来的销毁

                var $tableHook = $box.find(tableHookName).bootstrapTable({
                    columns:
                        [
                            {
                                field: 'no', title: '序号', align: 'center', width: 50,

                            },
                            {
                                field:
                                    'itemCode',
                                title:
                                    '物料编码'
                            },
                            {
                                field:
                                    'itemName',
                                title:
                                    '物料名字'
                            },
                            {
                                field:
                                    'batch',
                                title:
                                    '批次名'
                            },
                           /!* {
                                field:
                                    'areaCode',
                                title:
                                    '货区编码'
                            },
                            {
                                field:
                                    'areaName',
                                title:
                                    '货区名字'
                            },*!/
                            {
                                field:
                                    'quantity',
                                title:
                                    '数量',
                                editable: {
                                    type: 'text',
                                    title: '数量',
                                    emptytext: 0,       //空值的默认文本
                                    mode: "inline",      //编辑框的模式：支持popup和inline两种模式，默认是popup
                                    validate: function (v) {
                                        if (!v) return '数量不能为空！';
                                        if (v==0) return '数量不能为0！';
                                        if (v> 100000000) return '数字输入太长！';
                                        var ival = parseInt(v);
                                        if(isNaN(ival)){
                                            return '数量必须为数字！';
                                        }



                                    }
                                }
                            },
                            {
                                field: 'operate', title: '操作', align: 'center', fixedLeft: true,
                                events: {

                                    'click .delete': function (e, value, rowData, index) {

                                        layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此行？', {
                                            btn: ['确定','取消']
                                        }, function(){
                                            IOT.hideOverlay();
                                    
                                            $vue.$data.insert.details.splice(index,1);
                                            layer.closeAll();
                                            that.createTable();
                                        }, function(){
                                            //取消
                                        });

                                    }
                                },
                                formatter: function (value, row, index) {
                                    let operate = [];

                                    operate.push(' <button class="btn btn-red delete">删除</button>');

                                    return  operate.join(' ');
                                }
                            }


                        ],
                    data: $vue.$data.insert.details,
                });
            },*/

            //提交模态框数据
            commit:function(){

                var itemCode = $vue.$data.info.itemCode;

                var quantity = $vue.$data.info.quantity;
                var itemName = $vue.$data.info.itemName;
                var areaName = $vue.$data.info.areaName;

                var wareCode = $vue.$data.insert.billMaster.wareCode;
                var no = $vue.$data.insert.details.length +1;

                var batch = $vue.$data.info.batch;

                if( itemCode ==''|| quantity==''){
                    return
                }

               /* $vue.$data.insert.details.push({no:no,areaName:areaName,itemCode:itemCode,itemName:itemName,areaCode:areaCode,quantity:quantity,wareCode:wareCode})
*/
                $vue.$data.insert.details.push({no:no, itemCode:itemCode,batch:batch,itemName:itemName, quantity:quantity,wareCode:wareCode})




                $vue.$data.info.itemCode = '';

                $vue.$data.info.quantity = '',
                $vue.$data.info.itemName ='',




                $('#myModal2').modal('hide')

                this.createTable();


            },








        },

        mounted: function () {
            this.$nextTick(() => {

                var $accountBox2 = $('.item-hook');

                let tableHookName3 = '.itemInfo-table-hook';

                // 查询
                $accountBox2.find('.search-hook').on('click', function () {
                    $(tableHookName3).bootstrapTable('onCustomSearch');
                });

                var $form = $accountBox2.find('.form-search-hook');

                var $tableHook2 = $accountBox2.find(tableHookName3).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.BASE.ITEM.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 10,
                    // fixedColumns: true,
                    customButton: '',
                    clickToSelect:true,

                    onClickRow: function (row) {
                        //  console.log("click:" + row.playerName)
                        var billNoVch = row.billNoVch;
                        console.log("click:" +billNoVch)
                    },
                    customQueryParams: function (params) {


                        var formParams = $form.serializeJson();
                        var queryParams = $.extend(  params, formParams);
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
                            checkbox: true,

                        },
                        {
                            field: 'itemName', title: '物料', align: 'center',width:240
                        },
                        {
                            field: 'itemClass', title: '规格', align: 'center', fixedLeft: true
                        },

                    ],



                });

            });
        }

    });






})();



