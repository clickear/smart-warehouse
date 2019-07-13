require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-bill-out-hook',
        data: {
            message:'',
            info:{

                itemCode:'',
                areaCode:'',
                quantity:'',
                nowQuantity:'',
                itemTypeCode:'',
                itemName:'',
                areaName:'',
                type:'2',
                index:'',

                batchId:'',
                needReturn:'2',

            },
            typeItems:[],
            items:[],
            itemItems:[],
            batchItems:[],
            areaItems:[],
            list:[],
            account:{},
            insert:{
                billMaster:{
                    contractNo:'',
                    memo:'',
                    type:'2',
                    state:'1',
                    wareCode:IOT.getLocalStore("backWare"),
                    itemMasterId:IOT.getLocalStore("itemMasterId")
                },
                details:[]
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
            save: function(){



                var insert = $vue.$data.insert;
                var billDetails = insert.details;
                if(billDetails == null || billDetails.length ==0){
                    layer.alert('请添加出库详情');
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
                IOT.getServerData(URI.BASE.ITEM.LIST2,{itemTypeCode:selectVal},(ret) => {
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
                //获取物料信息

                $vue.$data.batchItems = [];
                $vue.$data.info.batchId = null;
                var selectVal = $vue.$data.info.itemCode;
                var itemName = $("#select_item").find("option:selected").text();
                $vue.$data.info.itemName = itemName;


                var wareCode = IOT.getLocalStore("backWare");
                var itemMasterId = IOT.getLocalStore("itemMasterId");
                IOT.getServerData(URI.BASE.ITEM.ITEM_BATCH.LIST,{itemCode:selectVal,wareCode:wareCode,itemMasterId:itemMasterId},(ret) => {
                    if (ret.code === 200) {

                        var  list = ret.rows;

                        var nowQuantity = 0;
                        $.each(list,function(i,v){
                            $vue.$data.batchItems.push({text:v.batch,value:v.batchId,quantity:v.quantity});
                            nowQuantity = nowQuantity+ v.quantity;
                        });
                        $vue.$data.info.nowQuantity = nowQuantity;

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                $vue.$data.info.value = ""

            },
            changeBatch:function(){

                var batch = $("#select_batch").find("option:selected").text();
                $vue.$data.info.batch = batch;

                var batchId = $vue.$data.info.batchId;
                var batchItems = $vue.$data.batchItems;

                for(var i =0;i<batchItems.length;i++){
                    if(batchItems[i].value == batchId){
                        $vue.$data.info.nowQuantity =batchItems[i].quantity;
                    }
                }

             },

            changeQuantity:function(){
                if($vue.$data.info.quantity >$vue.$data.info.nowQuantity){
                    $vue.$data.info.quantity = '';
                }

            },

            newDetail:function(){
                var wareCode = IOT.getLocalStore("backWare")
                if(wareCode == "" || wareCode ==null){
                    layer.alert('请选择仓库');
                    return false;
                };
                $("#myModal2").modal('show');


            },

            createTable(){
                var  that = this;
                var $box = $('.create-bill-out-hook');
                let tableHookName = '.billDetail-out-table-hook';

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
                                    '批次'
                            },
                            {
                                field:
                                    'batchId',
                                title:
                                    '批次编码'
                            },
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
                                field:
                                    'nowQuantity',
                                title:
                                    '现有数量'
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
            },

            //提交模态框数据
            commit:function(){
                var itemCode = $vue.$data.info.itemCode;

                var quantity = $vue.$data.info.quantity;
                var nowQuantity = $vue.$data.info.nowQuantity;
                var itemName = $vue.$data.info.itemName;
                var batch = $vue.$data.info.batch;
                var batchId = $vue.$data.info.batchId;
                var needReturn = $vue.$data.info.needReturn;





                if($vue.$data.info.quantity ==''){
                    return false;
                }

                if($vue.$data.info.itemCode ==''){
                    return false;
                }
                if($vue.$data.info.itemName ==''){
                    return false;
                }

                if(  quantity>nowQuantity){
                    $vue.$data.info.quantity = '';
                    return false;
                }

                $vue.$data.insert.details.push({itemCode:itemCode, quantity:quantity,nowQuantity:nowQuantity,itemName:itemName ,batch:batch,batchId:batchId,needReturn: needReturn})

                 $vue.$data.info.itemCode ='';
                 $vue.$data.info.batchId ='';
                 $vue.$data.info.quantity ='';
                 $vue.$data.info.nowQuantity ='';
                 $vue.$data.info.itemName ='';
                 $vue.$data.info.batch ='';
                $vue.$data.info.needReturn ='2';



                $('#myModal2').modal('hide')

                this.createTable();
            },

        },
        mounted: function () {
            this.$nextTick(() => {


            });
        }
    });


})();



