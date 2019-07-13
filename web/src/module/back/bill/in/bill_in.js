import $ from 'jQuery';
var wareCode = IOT.getLocalStore("baseWare");
(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            wareCode:wareCode,
            workStartTime:'',
            workEndTime:'',
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
            itemItems:[],
            itemBatchs:[],
            list:[],
            account:{},
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/billIn/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            items:[{"text":"","value":""}],
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


            newBillIn:function(){
              //  M.Page.emit(URI.BILL.BILL_IN.ADD.PAGE);
                var wareCode = IOT.getLocalStore("backWare");
                if(wareCode == "" || wareCode ==null){
                    layer.alert('请选择仓库');
                    return false;
                };
                var itemMasterId = IOT.getLocalStore("itemMasterId");
                if(itemMasterId == "" || itemMasterId ==null){
                    layer.alert('请选择货主');
                    return false;
                };
                $("#addModal").modal('show');
            },

            //新增时下一步
            nextCreate:function(){
                $("#bill-master").css("display","none");
                $("#bill-details").css("display","");
                $("#myModalLabeMaster").css("display","none");
                $("#myModalLabeDetails").css("display","");
                $("#nextCreate").css("display","none");
                $("#preCreate").css("display","");
                $("#commitCreate").css("display","");
            },

            //新增是上一步
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


            //确认选择物料
            commitItem:function(){
                var that= this;
                var batch = $vue.$data.info.batch;
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
                                            $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:batch,batchId:'',itemName:v.itemName, quantity:1,value:''})
                                        }else {
                                            $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:[],batch:batch,batchId:'',itemName:v.itemName, quantity:1})
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
                                    batchList = ret.rows;
                                    if(batchList.length>0){
                                        for(var i = 0;i<batchList.length;i++){
                                            batchList[i].value= batchList[i].batchId +':'+  batchList[i].batch
                                        }
                                        $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:batch,batchId:'',itemName:v.itemName, quantity:1,value:''})

                                    }else {
                                        $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:[],batch:batch,batchId:'',itemName:v.itemName, quantity:1})

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



            //改变详情中批次
            changeBatch:function(index){
                var detail = $vue.$data.insert.details[index];
                var id = '#'+ detail.itemCode;
                var value = $(id).find("option:selected").val();
                var batchId = '';
                var batch = '';
                if(value != null && value != ""){
                    var batchId = value.split(":")[0];
                    var batch = value.split(":")[1];
                }else {
                    var batchId = null;
                    var batch =$vue.$data.info.batch;
                }
                detail.batchId = batchId;
                detail.batch = batch;
                $vue.$data.insert.details[index] =detail;
            },


            //删除某一条入库详情
            deleteDetail:function(index){
                this.insert.details.splice(index,1);
            },


            //保存
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
                            $("#addModal").modal('hide');
                            M.Table.refresh.all();
                            $vue.$data.insert ={
                                billMaster:{
                                    wareCode:IOT.getLocalStore("backWare"),
                                        itemMasterId:IOT.getLocalStore("itemMasterId"),
                                        contractNo:'',
                                        memo:'',
                                        type:'1',
                                        state:'1',
                                        chaunyunid:'',
                                },
                                details:[],
                            }
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

            },



        },
        created: function () {
            var that = this
            this.$nextTick(() => {
                var now = new Date();
                var time = now.getFullYear() + "-" +((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                $vue.$data.info.batch = time;
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
                let tableHookName2 = '.ScanResults2-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
//                     var   billNo=document.getElementById('billNo').value;  //入库单号
//                     var   contractNo=document.getElementById('contractNo').value;  //合同单号
//                     var   state=document.getElementById('state').value;    //状态 1-初始化；2-已经验收；3-已经上架  null-全部
//                     var   workStartTime=document.getElementById('workStartTime').value;   //开始时间
//                     var   workEndTime=document.getElementById('workEndTime').value;    //结束时间
//                    $(tableHookName).bootstrapTable('onCustomSearch');
                    $('#tableHook').bootstrapTable('destroy');
                    var $form = $accountBox.find('.form-search-hook');
                    $tableHook  = $accountBox.find(tableHookName).bootstrapTable({
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
                                             var   billNo=document.getElementById('billNo').value;  //入库单号
                                             var   contractNo=document.getElementById('contractNo').value;  //合同单号
                                             var   state=document.getElementById('state').value;    //状态 1-初始化；2-已经验收；3-已经上架  null-全部
                                             var   workStartTime=document.getElementById('workStartTime').value;   //开始时间
                                             var   workEndTime=document.getElementById('workEndTime').value;    //结束时间
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({type:1,billNo:billNo,contractNo:contractNo,state:state,workStartTime:workStartTime,workEndTime:workEndTime}, params, formParams);
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
                            field: 'wareName', title: '仓库', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'itemMasterName', title: '货主', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'chaunyunid', title: 'objectid', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'contractNo', title: '合同号', align: 'center', fixedLeft: true,
                        },

                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */
                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>待入库</button>";}
                                else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已入库</button>";}
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
                                   /* M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;*/
                                    M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));

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
                         var billNo = row.billNo;
						if(billNo==null || billNo==''){
							return false;
						}
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
                                    field: 'unitName', title: '单位', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'batch', title: '批次', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'quantity', title: '预约数量', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'acceptQuantity', title: '验收数量', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'completeQuantity', title: '上架数量', align: 'center', fixedLeft: true,
                                },
                            ]
                        })
                    },
                });
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
                        var queryParams = $.extend({type:1,wareCode:wareCode,itemMasterId:itemMasterId}, params, formParams);
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
                            field: 'wareName', title: '仓库', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'itemMasterName', title: '货主', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'chaunyunid', title: '氚云objectid', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'contractNo', title: '合同号', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */
                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>待入库</button>";}
                                else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已入库</button>";}
                                else if (value === 3 ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>已上架</button>";}
                                else if (value === 6 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>已完成</button>";}
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
                                   /* M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;*/
                                    M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));

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
                         var billNo = row.billNo;
						if(billNo==null || billNo==''){
							return false;
						}
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
                                    field: 'unitName', title: '单位', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'batch', title: '批次', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'quantity', title: '预约数量', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'acceptQuantity', title: '验收数量', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'completeQuantity', title: '上架数量', align: 'center', fixedLeft: true,
                                },
                            ]
                        })
                    },
                });


                //选择物料列表
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
                        var queryParams = $.extend( params, formParams);
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









