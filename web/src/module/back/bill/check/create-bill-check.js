require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-bill-check-hook',
        data: {
            message:'',
            info:{

                itemCode:'',
                areaCode:'',
                itemName:'',
                areaName:'',

                shelfCode:'',
                shelfName:'',



                index:'',



            },
            typeItems:[],

            itemItems:[],

            areaItems:[],
            shelfItems:[],


            insert:{
                countMaster:{


                    countYype:'',
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


            //获取货区
            var wareCode = IOT.getLocalStore("backWare");
            IOT.getServerData(URI.BASE.AREA.LIST,{wareCode:wareCode},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;

                    $.each(list,function(i,v){
                        $vue.$data.areaItems.push({text:v.areaName,value:v.areaCode})
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
                IOT.getServerData(URI.BILL.BILL_CHECK.ADD.SAVE,{countMaster:insert.countMaster,list:insert.details},(ret) => {
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
                var itemTypeCode = $vue.$data.info.itemTypeCode;
                if(itemTypeCode != ''){
                    IOT.getServerData(URI.BASE.ITEM.LIST2,{itemTypeCode:itemTypeCode},(ret) => {
                        if (ret.code === 200) {
                            var  list = ret.data.list;

                            $.each(list,function(i,v){
                                $vue.$data.itemItems.push({text:v.itemName,value:v.itemCode})

                            });

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });

                }



            },
            changeItem:function(){
                //获取物料信息
                var itemName = $("#select_item").find("option:selected").text();
                $vue.$data.info.itemName = itemName;
            },
            changeShelf:function(){
                //获取物料信息
                var shelfName = $("#select_shelf").find("option:selected").text();
                $vue.$data.info.shelfName = shelfName;
            },

            changeArea:function(){

                var areaName = $("#select_area").find("option:selected").text();
                $vue.$data.info.areaName = areaName;


                $vue.$data.shelfItems = [];
                var areaCode = $vue.$data.info.areaCode;
                if(areaCode != ''){
                    IOT.getServerData(URI.BASE.SHELF.LIST,{areaCode:areaCode},(ret) => {
                        if (ret.code === 200) {
                            var  list = ret.rows;

                            $.each(list,function(i,v){
                                $vue.$data.shelfItems.push({text:v.shelfName,value:v.shelfCode})

                            });

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });


                }



            },



            newDetail:function(){
                var wareCode = IOT.getLocalStore("backWare")
                if(wareCode == "" || wareCode ==null){
                    layer.alert('请选择仓库');
                    return false;
                };
                var itemMasterId = IOT.getLocalStore("itemMasterId")
                if(itemMasterId == "" || itemMasterId ==null){
                    layer.alert('请选择货主');
                    return false;
                };
                $("#myModal2").modal('show');


            },

            createTable(){
                var  that = this;
                var $box = $('.create-bill-check-hook');
                let tableHookName = '.billDetail-check-table-hook';

                $box.find(tableHookName).bootstrapTable('destroy');//将原来的销毁

                var $tableHook = $box.find(tableHookName).bootstrapTable({
                    columns:
                        [

                            {
                                field:
                                    'areaName',
                                title:
                                    '货区'
                            },
                            {
                                field:
                                    'shelfName',
                                title:
                                    '货架'
                            },
                            {
                                field:
                                    'itemName',
                                title:
                                    '物料'
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
                var itemName = $vue.$data.info.itemName;

                var areaName = $vue.$data.info.areaName;
                var areaCode = $vue.$data.info.areaCode;

                var shelfName = $vue.$data.info.shelfName
                var shelfCode =$vue.$data.info.shelfCode;








                $vue.$data.insert.details.push({itemCode:itemCode, areaName:areaName,areaCode:areaCode,shelfName:shelfName ,shelfCode:shelfCode,itemName:itemName})

                 $vue.$data.info.itemCode ='';

                 $vue.$data.info.itemName ='';



                $vue.$data.info.areaName ='';
                $vue.$data.info.areaCode ='';

                $vue.$data.info.shelfName ='';
                $vue.$data.info.shelfCode ='';



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



