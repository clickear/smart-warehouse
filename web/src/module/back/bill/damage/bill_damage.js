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
                    type:'4',   //报损
                    state:'1',



                },
                details:[],


            },
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/billDamage/page', params: {}},
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

            addDetail:function(){
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
                                        for(var i = 0;i<batchList.length;i++){
                                            batchList[i].value= batchList[i].batchId +':'+  batchList[i].quantity
                                        }

                                        $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:'',batchId:'',itemName:v.itemName, nowQuantity:batchList[0].quantity,quantity:1,value:batchList[0].value})
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
                                        for(var i = 0;i<batchList.length;i++){
                                            batchList[i].value= batchList[i].batchId +':'+  batchList[i].quantity
                                        }
                                        $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:'',batchId:'',itemName:v.itemName, nowQuantity:batchList[0].quantity,quantity:1,value:batchList[0].value})

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
            
            deleteDetail:function(index){
                this.insert.details.splice(index,1);
            },




            newBillAllot:function(){
                this.preCreate();

                // M.Page.emit(URI.BILL.BILL_ALLOT.ADD.PAGE);
                $("#addModal").modal('show');
            },

            nextCreate:function(){


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
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({type:4,wareCode:wareCode}, params, formParams);
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
                            field: 'billNo', title: '单据号', align: 'center',
                        },
                        {
                            field: 'wareName', title: '仓库', align: 'center', fixedLeft: true
                        },
                        // {
                        //     field: 'plannovch', title: '合同号', align: 'center', fixedLeft: true,
                        // },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1初始化；2已审核；3已完成 */
                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>初始化</button>";}
                                else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已审核</button>";}
                                else if (value === 4 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>已完成</button>";}

                            }
                        },
                        {
                            field: 'adder', title: '制单人', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'addTime', title: '操作时间', align: 'center', fixedLeft: true,

                        },
                        {
                            field: 'memo', title: '备注', align: 'center', fixedLeft: true,

                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.BILL.BILL_DAMAGE.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_DAMAGE.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                            }
                        }
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                        var billnovch = row.billnovch;

                        $detail.html("<table></table>");
                        let tableHookName2 = $detail.find("table");
                        tableHookName2.bootstrapTable({
                            scrollbar: 'patchAllocation-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url:URI.BILL.BILL_IN.DETAIL.DATA,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',


                            onClickRow: function (row) {

                            },
                            customQueryParams: function (params) {

                                var queryParams ={billnovch:billnovch};
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
                                    field: 'areaName', title: '货区', align: 'center', fixedLeft: true
                                },
                                {
                                    field: 'shelfName', title: '货架', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'cellName', title: '货位', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'itemCode', title: '物料编码', align: 'center', fixedLeft: true
                                },
                                {
                                    field: 'itemName', title: '物料名', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'itemClass', title: '规格型号', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'quantity', title: '数量', align: 'center', fixedLeft: true,
                                },


                            ]
                        })
                    },

                });

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









