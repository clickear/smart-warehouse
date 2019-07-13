require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-bill-allot-hook',
        data: {
            info:{

                itemCode:'',

                quantity:'',
                itemTypeCode:'',
                itemName:'',

                batch:'2018-08-31',

                keyWords:'',

                wareCode:'',

            },
            typeItems:[],
            items:[],
            itemItems:[],
            itemBatchs:[],
            wareItems:[],


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

            //获取产品种类信息
            IOT.getServerData(URI.BASE.WAREHOUSE.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;
                    var wareCode = IOT.getLocalStore("backWare");
                    $.each(list,function(i,v){
                        if(v.wareCode != wareCode){
                            $vue.$data.wareItems.push({text:v.wareName,value:v.wareCode})
                        }

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

            changeQuantity:function(){


            },
            newDetail:function(){

                var wareCode = IOT.getLocalStore("backWare");
                if(wareCode == "" || wareCode ==null){
                    layer.alert('请选择仓库');
                    return false;
                };
                $("#myModal2").modal('show');


            },

            reCreateTable(){
                this.createTable();
            },

            createTable(){
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
                           /* {
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
                            },*/
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
            },

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

                $vue.$data.info.batch ='',



                $('#myModal2').modal('hide')

                this.createTable();


            },








        },

    });






})();



