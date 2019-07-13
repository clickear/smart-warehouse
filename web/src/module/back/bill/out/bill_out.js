import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
        	info:{
                
                itemTypeCode:'',
                keyWords:'',
                
            },
            typeItems:[],
            workStartTime:'',
            workEndTime:'',
            insert:{
                billMaster:{
                    wareCode:IOT.getLocalStore("backWare"),
                    itemMasterId:IOT.getLocalStore("itemMasterId"),
                    contractNo:'',
                    memo:'',
                    type:'2',
                    state:'1',
                    chaunyunid:'',
                    mold:'',
                },
                details:[],
            },
        	
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/billOut/page', params: {}},
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



            newBillOut:function(){
               // M.Page.emit(URI.BILL.BILL_OUT.ADD.PAGE);
               $("#addModal").modal('show');
            },
            
            addDetail:function(){
            	$("#itemModal").modal('show');
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
            
            
            //确认选择物料
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
                        if(details.length>0){     //已经添加过至少一行
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
										batchList.unshift({batchId:null,batch:"所有批次",quantity:v.quantity});
										[0].concat(batchList);
                                        for(var i = 0;i<batchList.length;i++){
                                            batchList[i].value= batchList[i].batchId +':'+  batchList[i].quantity
                                        }
                                        $vue.$data.insert.details.push({itemCode:v.itemCode,batchList:batchList,batch:'',batchId:'',itemName:v.itemName, itemClass:v.itemClass,nowQuantity:batchList[0].quantity,quantity:1,needReturn:2,value:batchList[0].value})
                                    } else {
                                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                    }
                                });
                            }
                        //还没有添加过任何行    
                        }else {
                            var itemCode = v.itemCode;
                            var itemMasterId = IOT.getLocalStore("itemMasterId");
                            var wareCode = IOT.getLocalStore("backWare");
                            var batchList = [];
                            IOT.getServerData(URI.REPORT.INVENTORY.BATCH.LIST,{itemCode:itemCode,itemMasterId:itemMasterId,wareCode:wareCode},(ret) => {

                                if (ret.code === 200) {
                                    var batchList = ret.rows;
                                    batchList.unshift({batchId:null,batch:"所有批次",quantity:v.quantity});
									[0].concat(batchList);
                                    for(var i = 0;i<batchList.length;i++){
                                        batchList[i].value= batchList[i].batchId +':'+  batchList[i].quantity
                                    }
                                    $vue.$data.insert.details.push({ itemCode:v.itemCode,batchList:batchList,batch:'',batchId:'',itemName:v.itemName, itemClass:v.itemClass,nowQuantity:batchList[0].quantity,quantity:1,needReturn:2,value:batchList[0].value})

                                } else {
                                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                }
                            });

                        }


                    });


                }
                $("#itemModal").modal('hide');
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
                    layer.alert('请添加出库详情');
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
                                        type:'2',
                                        state:'1',
                                        chaunyunid:'',
                                        mold:'',
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
        created:function(){
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
            	{
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
                    // var   billNo=document.getElementById('billNo').value;  //入库单号
                    // var   contractNo=document.getElementById('contractNo').value;  //合同单号
                    // var   state=document.getElementById('state').value;    //状态 1-初始化；2-已经验收；3-已经上架  null-全部
                    // var   workStartTime=document.getElementById('workStartTime').value;   //开始时间
                    // var   workEndTime=document.getElementById('workEndTime').value;    //结束时间
                    // var formParams = $form.serializeJson();
                    $('#tableHook').bootstrapTable('destroy');
                    var $form = $accountBox.find('.form-search-hook');
                    var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                        scrollbar: 'patchAllocation-table-body',
                        striped: true, // 设置为 true 会有隔行变色效果
                        pagination: true, // true 显示分页
                        paginationDetail: false, // 分页详情
                        sidePagination: 'server', // 服务器端
                        method: 'post',
                        url:URI.BILL.BILL_OUT.LIST,
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
                            var queryParams = $.extend({type:2,billNo:billNo,contractNo:contractNo,state:state,workStartTime:workStartTime,workEndTime:workEndTime}, params, formParams);
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
                            {
                                field: 'contractNo', title: '合同号', align: 'center', fixedLeft: true,
                            },
                            {
                                field: 'state', title: '状态', align: 'center', fixedLeft: true,
                                formatter: function (value, row, index) {
                                    /* 1-初始化 2-审核 3-作业中 4-完成 */
                                    if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>初始化</button>";}
                                    else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已审核</button>";}
                                    else if (value === 3 ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>分拣中</button>";}
                                    else if (value === 4 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>已分拣</button>";}
                                    else if (value ===5 ){return "<button style='background-color: #7B68EE;border-style: none' class='btn btn-blue detail-account'>已复核</button>";}
                                    else if (value ===6 ){return "<button style='background-color: #7B68EE;border-style: none' class='btn btn-blue detail-account'>已完成</button>";}

                                }
                            },
                            {
                                field: 'chaunyunid', title: 'objectid', align: 'center', fixedLeft: true
                            },
                            {
                                field: 'mold', title: '租赁类型', align: 'center', fixedLeft: true
                            },
                            {
                                field: 'addUserName', title: '制单人', align: 'center', fixedLeft: true,
                            },
                            {
                                field: 'addTime', title: '制单时间', align: 'center', fixedLeft: true,

                            },
                            {
                                field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                                events: {
                                    'click .detail-account': function (e, value,rowData, index) {
                                        M.Page.emit(URI.BILL.BILL_OUT.DETAIL.PAGE);
                                        IOT.setSessionStore(URI.BILL.BILL_OUT.DETAIL.PAGE, JSON.stringify(rowData));
                                        return false;
                                    }
                                },
                                formatter: function (value, row, index) {
                                    return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                                }
                            }
                        ],
                        //注册加载子表的事件。注意下这里的三个参数！
                        /* onExpandRow: function (index, row, $detail) {
                             $detail.html("<div style='width: 100%;height: 270px;border-style: solid'></div>");
                         },*/
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
                                        field: 'quantity', title: '预约出库数', align: 'center', fixedLeft: true,
                                    },
                                    {
                                        field: 'acceptQuantity', title: '实际出库数', align: 'center', fixedLeft: true,
                                    },

                                    {
                                        field: 'unitName', title: '单位', align: 'center', fixedLeft: true,
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
                    url:URI.BILL.BILL_OUT.LIST,
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
                        var queryParams = $.extend({type:2,wareCode:wareCode}, params, formParams);
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
                        {
                            field: 'contractNo', title: '合同号', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'chaunyunid', title: '氚云objectid', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'mold', title: '租赁类型', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */
                                if (value === 1 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>待出库</button>";}
                                else if (value === 2 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已出库</button>";}
                                else if (value === 3 ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>分拣中</button>";}
                                else if (value === 4 ){return "<button style='background-color: #3FB8FF;border-style: none' class='btn btn-blue detail-account'>已分拣</button>";}
                                else if (value ===5 ){return "<button style='background-color: #7B68EE;border-style: none' class='btn btn-blue detail-account'>已复核</button>";}
                                else if (value ===6 ){return "<button style='background-color: #7B68EE;border-style: none' class='btn btn-blue detail-account'>已完成</button>";}
                            }
                        },
                        {
                            field: 'addUserName', title: '制单人', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'addTime', title: '制单时间', align: 'center', fixedLeft: true,

                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.BILL.BILL_OUT.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_OUT.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                            }
                        }
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                   /* onExpandRow: function (index, row, $detail) {
                        $detail.html("<div style='width: 100%;height: 270px;border-style: solid'></div>");
                    },*/
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
                                    field: 'quantity', title: '预约出库数', align: 'center', fixedLeft: true,
                                },
                                {
                                    field: 'acceptQuantity', title: '实际出库数', align: 'center', fixedLeft: true,
                                },
                                
                                {
                                    field: 'unitName', title: '单位', align: 'center', fixedLeft: true,
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
                            ]
                        })
                    },
                });
                }
				
				//新增出库-->添加出库详情
				{
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
				}
            });
        }
    });
})();









