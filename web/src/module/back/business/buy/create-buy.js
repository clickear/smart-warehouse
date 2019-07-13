require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let infoData = JSON.parse(IOT.getSessionStore(URI.RENT.RETURN.CLIENT_NEXT_RETURN.PAGE));
    let flag =1;
    let $vue = null;
    $vue = new Vue({
        el: '.create-buy-hook',
        data: {
            info:{

                itemCode:'',
                itemTypeName:'',
                quantity:'',
                unit:'',
                itemTypeCode:'',

                itemName:'',
                price:'',
                supplierItems:'',
                supplierContacts:'',
                orderTotal:'',


            },
            typeItems:[],
            items:[],
            itemItems:[],

            supplierItems:[],
            list:[],
            account:{},
            insert:{
                master:{
                    supplierName:'',
                    supplierContacts:'',
                    memo:'',
                    supplierPhone:'',
                    supplierSite:'',
                },

                details:[],




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
            //获取供应商信息
            IOT.getServerData(URI.AGENCY.SUPPLIER.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.supplierItems.push({text:v.supplierName,value:v.supplierCode,index:i,supplierContacts:v.supplierContacts,supplierPhone:v.supplierPhone,supplierSite:v.supplierSite})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

            //获取产品种类信息
            IOT.getServerData(URI.BASE.TYPE.LIST,{},(ret) => {     //路径希望错了  报了404 not found   应该点进去看
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
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BUSINESS.BUY.ADD.SAVE,{BUY:insert.billMaster,billDetails:insert.details},(ret) => {
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

                var text = $("#select_type").find("option:selected").text();
                $vue.$data.info.itemTypeName= text;
                //获取物料信息

                $vue.$data.itemItems = [];    //清空上一次选择的物料类型的数据
                var selectVal = $vue.$data.info.itemTypeCode;    //获得当前选择的物料类别
                IOT.getServerData(URI.BASE.ITEM.LIST2,{itemTypeCode:selectVal},(ret) => {    //通过itemTypeCode去后台请求物料
                    if (ret.code === 200) {    //判断请求是否成功   ret = 请求回来的数据
                                     //打个断点，在F12 里面看一看ret里面有什么  ret.data.list    ret.rows
                        var  asfasdf = ret.data.list;    //将请求回来的物料列表赋值给var  asfasdf

                        $.each(asfasdf,function(i,v){     //遍历asfasdf
                            $vue.$data.itemItems.push({text:v.itemName,value:v.itemCode})     //把asfasdf里面的每一项 给itemItems
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
                },
            changeSupplier:function(){

                var supplierName = $("#select_supplier").find("option:selected").text();
                var index = $vue.$data.info.index;
                var supplierCode =$vue.$data.supplierItems[index].value;
                var supplierContacts =$vue.$data.supplierItems[index].supplierContacts;
                var supplierPhone =$vue.$data.supplierItems[index].supplierPhone;
                var supplierSite =$vue.$data.supplierItems[index].supplierSite;


                $vue.$data.insert.master.supplierName = supplierName;
                $vue.$data.insert.master.supplierCode = supplierCode;
                $vue.$data.insert.master.supplierContacts = supplierContacts;
                $vue.$data.insert.master.supplierPhone = supplierPhone;
                $vue.$data.insert.master.supplierSite = supplierSite;




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
                var $box = $('.create-buy-hook');
                let tableHookName = '.BuyDetail-create-table-hook';
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
                                    '产品编码'
                            },
                            {
                                field:
                                    'itemTypeName',
                                title:
                                    '产品类别'
                            },
                            {
                                field:
                                    'itemName',
                                title:
                                    '产品名称'
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
                                    'price',
                                title:
                                    '单价',
                                editable: {
                                    type: 'text',
                                    title: '单价',
                                    emptytext: 0,       //空值的默认文本
                                    mode: "inline",      //编辑框的模式：支持popup和inline两种模式，默认是popup
                                    validate: function (v) {
                                        if (!v) return '单价不能为空！';
                                        if (v==0) return '单价不能为0！';
                                        if (v> 100000000) return '数字输入太长！';
                                        var ival = parseInt(v);
                                        if(isNaN(ival)){
                                            return '单价必须为数字！';
                                        }



                                    }
                                }
                            },
                            {
                                field:
                                    'orderTotal',
                                title:
                                    '总额',
                                editable: {
                                    type: 'text',
                                    title: '总额',
                                    emptytext: 0,       //空值的默认文本
                                    mode: "inline",      //编辑框的模式：支持popup和inline两种模式，默认是popup
                                    validate: function (v) {
                                        if (!v) return '总额不能为空！';
                                        if (v==0) return '总额不能为0！';
                                        if (v> 100000000) return '数字输入太长！';
                                        var ival = parseInt(v);
                                        if(isNaN(ival)){
                                            return '总额必须为数字！';
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
                var unit = $vue.$data.info.unit;
                var itemName = $vue.$data.info.itemName;
                var itemTypeCode = $vue.$data.info.itemTypeCode;
                var itemTypeName = $vue.$data.info.itemTypeName;
                var price = $vue.$data.info.price;
                var orderTotal = $vue.$data.info.orderTotal;
                var no = $vue.$data.insert.details.length +1;



                $vue.$data.insert.details.push({no:no,itemCode:itemCode,itemName:itemName,quantity:quantity,unit:unit,itemTypeName:itemTypeName,price:price,orderTotal:orderTotal})

                $vue.$data.info.itemCode = '';
                $vue.$data.info.itemTypeCode ='',
                    $vue.$data.info.quantity = '',
                    $vue.$data.info.itemName ='',
                    $vue.$data.info.unit = '',
                    $vue.$data.info.orderTotal = '',
                    $vue.$data.info.price = '',


                $('#myModal2').modal('hide')

                this.createTable();


            },








        },

    });






})();



