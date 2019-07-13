require('../../../../less/back/bill/bill_allot.less');
import $ from 'jQuery';
var wareCode = IOT.getLocalStore("baseWare");
(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            info:{
                toWareCode:'',
                itemTypeCode:'',
                keyWords:'',
                detailRowData:'',
                detailRowIndex:'',
            },
            typeItems:[],
            wareItems:[],
            wareCode:wareCode,
            workStartTime:'',
            workEndTime:'',
            insert:{
                billMaster:{
                    wareCode:IOT.getLocalStore("backWare"),
                    itemMasterId:IOT.getLocalStore("itemMasterId"),
                    contractNo:'',
                    memo:'',
                    type:'3',
                    state:'1',



                },
                details:[],
                itemBatchs:[]

            },
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/billAllot/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            items:[{"text":"aaa","value":"bbb"}],

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
            selectBillMaster:function(){

                let tableHookName2 = '.ScanResults2-table-hook';
            },

            save: function(){


                var insert = $vue.$data.insert;
                var billDetails = insert.details;
                if(billDetails == null || billDetails.length ==0){
                    layer.alert('请添加调拨详情');
                    return false;
                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.ADD.SAVE,{billMaster:insert.billMaster,billDetails:insert.details},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            $("#myModal2").modal('hide');
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

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
                                $vue.$data.insert.details.push({ itemCode:v.itemCode,batch:'',batchId:'',itemName:v.itemName, nowQuantity:v.quantity,quantity:1,wareCode:wareCode,toWareCode:toWareCode})
                            }
                        }else {
                            $vue.$data.insert.details.push({ itemCode:v.itemCode,batch:'',batchId:'',itemName:v.itemName, nowQuantity:v.quantity,quantity:1,wareCode:wareCode,toWareCode:toWareCode})
                        }


                    });
                    that.createTable();

                }
                $("#myModal3").modal('hide');
            },


            newBillAllot:function(){
                this.preCreate();

               // M.Page.emit(URI.BILL.BILL_ALLOT.ADD.PAGE);
                $("#myModal2").modal('show');
            },

            nextCreate:function(){
                if($vue.$data.info.toWareCode =='' ||$vue.$data.info.toWareCode ==''){
                    layer.alert('请选择目标仓库');
                    return false;
                }


                $("#bill-master").css("display","none");
                $("#bill-details").css("display","");
                $("#myModalLabeMaster").css("display","none");
                $("#myModalLabeDetails").css("display","");

                $("#nextCreate").css("display","none");

                $("#preCreate").css("display","");

                $("#commitCreate").css("display","");



            },
            preCreate:function(){
                $("#bill-master").css("display","");
                $("#bill-details").css("display","none");
                $("#myModalLabeMaster").css("display","");
                $("#myModalLabeDetails").css("display","none");

                $("#nextCreate").css("display","");

                $("#preCreate").css("display","none");

                $("#commitCreate").css("display","none");



            },

            addDetail:function(){
                $("#myModal3").modal('show');
            },

            updateDetail:function(){
                $("#myModal4").modal('hide');
                var details = $vue.$data.insert.details;
                var index = $vue.$data.info.index;
                var detailRowData = $vue.$data.info.detailRowData;
                $vue.$data.insert.details[index] = detailRowData;
                this.createTable();
            },


            createTable(){
                var  that = this;
                var $box = $('.create-bill-allot-hook');
                let tableHookName = '.BillDetail-create-table-hook';
                $box.find(tableHookName).bootstrapTable('destroy');//将原来的销毁

                var $tableHook = $box.find(tableHookName).bootstrapTable({
                    columns:
                        [

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
                                    'nowQuantity',
                                title:
                                    '现有数量'
                            },
                          /*  {
                                field:
                                    'wareName',
                                title:
                                    '原始仓库'
                            },
                            {
                                field:
                                    'toWareName',
                                title:
                                    '目标仓库'
                            },*/
                            {
                                field:
                                    'quantity',
                                title:
                                    '数量',

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

                                    },
                                    'click .update': function (e, value, rowData, index) {
                                        $vue.$data.info.detailRowData = rowData;
                                        $vue.$data.info.detailRowIndex = index;
                                        $("#myModal4").modal('show');

                                    }
                                },
                                formatter: function (value, row, index) {
                                    let operate = [];
                                    operate.push(' <button class="btn  btn-default update">修改</button>');
                                    operate.push(' <button class="btn btn-red delete">删除</button>');

                                    return  operate.join(' ');
                                }
                            }


                        ],
                    data: $vue.$data.insert.details,
                });
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

            //获取仓库信息
            var wareCode = IOT.getLocalStore("backWare");
            IOT.getServerData(URI.BASE.WAREHOUSE.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;

                    $.each(list,function(i,v){
                        if(v.wareCode !=wareCode){
                            $vue.$data.wareItems.push({text:v.wareName,value:v.wareCode})
                        }

                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });






        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.ScanResults-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                $accountBox.find('input[name=workStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=workEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: true,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.ScanResults-table-hook';

                // 查询
                $accountBox.find('.search-hook').on('click', function () {
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
                    url:URI.BILL.BILL_IN.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    detailView: true,

                    onClickRow: function (row) {
                        //  console.log("click:" + row.playerName)
                        var billNoVch = row.billNoVch;
                        console.log("click:" +billNoVch)
                    },
                    customQueryParams: function (params) {
                         
                        var wareCode = IOT.getLocalStore("backWare");
                        var itemMasterId = IOT.getLocalStore("itemMasterId");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({type:3,wareCode:wareCode,itemMasterId:itemMasterId}, params, formParams);
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
                            checkbox: true
                        },
                        {
                            field: 'billNo', title: '单据号', align: 'center',width:240
                        },

                        {
                            field: 'contractNo', title: '合同号', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */


                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>初始化</button>";}
                                else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已审核</button>";}
                                else if (value === 3 ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>已上架</button>";}
                                else if (value === 4 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>已完成</button>";}

                            }
                        },

                        {
                            field: 'addUserName', title: '制单人', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'addTime', title: '制单时间', align: 'center', fixedLeft: true,

                        },
                        {

                            halign: "left",field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {

                                    M.Page.emit(URI.BILL.BILL_ALLOT.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_ALLOT.DETAIL.PAGE, JSON.stringify(rowData));

                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                            }
                        }
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                         var billNo = row.billNo;

                        $detail.html("<table></table>");
                        let tableHookName2 = $detail.find("table");
                        tableHookName2.bootstrapTable({
                            scrollbar: 'patchAllocation-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url: URI.BILL.BILL_DETAIL.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',

                            onClickRow: function (row) {
                                //  console.log("click:" + row.playerName)
                                var billNo = row.billNo;
                                console.log("click:" + billNoVch)
                            },
                            customQueryParams: function (params) {

                                return   {"billNo": billNo };
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
                                    field: 'itemName', title: '物料名', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'itemClass', title: '规格', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'batch', title: '批次', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'quantity', title: '数量', align: 'center', fixedLeft: true,

                                },

                                {
                                    field: 'wareName', title: '原始仓库', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'toWareName', title: '目标仓库', align: 'center', fixedLeft: true,
                                },


                            ]
                        })
                    },

                });




                var $accountBox2 = $('.item-hook');

                let tableHookName2 = '.itemInfo-table-hook';

                // 查询
                $accountBox2.find('.search-hook').on('click', function () {
                    $(tableHookName2).bootstrapTable('onCustomSearch');
                });

                var $form = $accountBox2.find('.form-search-hook');

                var $tableHook2 = $accountBox2.find(tableHookName2).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.REPORT.INVENTORY.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    clickToSelect:true,

                    onClickRow: function (row) {
                        //  console.log("click:" + row.playerName)
                        var billNoVch = row.billNoVch;
                        console.log("click:" +billNoVch)
                    },
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
                            checkbox: true,

                        },
                        {
                            field: 'itemName', title: '物料', align: 'center',width:240
                        },
                        {
                            field: 'itemClass', title: '规格', align: 'center', fixedLeft: true
                        },

                        {
                            field: 'quantity', title: '现有数量', align: 'center', fixedLeft: true,
                        },

                    ],


                });

            });
        }
    });
})();









