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
            deviceItems:[],
            userItems:[],
            resultItems:[],
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
                deviceCheckMaster:{


                    memo:'',
                    type:'1',
                    team:'',
                    dutyUserId:'',
                },
                deviceCheckDetails:[],


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
               /* var wareCode = IOT.getLocalStore("backWare");
                if(wareCode == "" || wareCode ==null){
                    layer.alert('请选择仓库');
                    return false;
                };
                var itemMasterId = IOT.getLocalStore("itemMasterId");
                if(itemMasterId == "" || itemMasterId ==null){
                    layer.alert('请选择货主');
                    return false;
                };*/

                $("#addModal").modal('show');
                this.insert={
                    deviceCheckMaster:{


                        memo:'',
                            type:'1',
                            team:'',
                            dutyUserId:'',
                    },
                    deviceCheckDetails:[],


                }
            },

            cancelNew:function(){
                this.preCreate;
                $("#addModal").modal('hide');
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
                var details= $vue.$data.insert.deviceCheckDetails;
                if(getSelectRows.length>0){
                    $.each(getSelectRows,function(i,v){
                        if(details.length>0){
                            var flag = 0
                            $.each(details,function(i2,v2){
                                if(v.deviceCode == v2.deviceCode){
                                    flag =1
                                }
                            });
                            if(flag ==0){
                                $vue.$data.insert.deviceCheckDetails.push({ deviceCode:v.deviceCode,deviceName:v.deviceName,deviceSingleId:v.deviceSingleId})
                            }
                        }else {
                            $vue.$data.insert.deviceCheckDetails.push({ deviceCode:v.deviceCode,deviceName:v.deviceName,deviceSingleId:v.deviceSingleId})
                        }
                    });
                }
                $("#myModal3").modal('hide');
            },






            //删除某一条入库详情
            deleteDetail:function(index){
                this.insert.deviceCheckDetails.splice(index,1);
            },


            //保存
            save: function(){
                var insert = $vue.$data.insert;
                var deviceCheckDetails = insert.deviceCheckDetails;
                if(deviceCheckDetails == null || deviceCheckDetails.length ==0){
                    layer.alert('请添加检查设备');
                    return false;
                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.DEVICE.CHECK_MASTER.ADD.SAVE,{deviceCheckMaster:insert.deviceCheckMaster,deviceCheckDetails:insert.deviceCheckDetails},(ret) => {
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
                                },
                                details:[],
                            }
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });

            },




            getResult:function(deviceCheckDetailId){
                $vue.$data.resultItems=[];
                IOT.getServerData(URI.DEVICE.RESULT.LIST,{deviceCheckDetailId:deviceCheckDetailId},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        $("#checkModal").modal('show');
                        $vue.$data.resultItems = ret.rows;
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            changeResult:function(index){
                
                var id= "#"+index +'000';
                var result =$(id);
                result = result .find("option:selected").val();

                var resultItems = $vue.$data.resultItems ;
                resultItems[index].result = result;
                $vue.$data.resultItems  =resultItems;

            },


            result:function(){
                var checkResults = $vue.$data.resultItems;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.DEVICE.RESULT.RESULT,{checkResults},(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();
                            $("#checkModal").modal('hide');
                        });
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }




        },
        created: function () {
            var that = this
            this.$nextTick(() => {
                var now = new Date();
                var time = now.getFullYear() + "-" +((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
                $vue.$data.info.batch = time;
            });
            //
            IOT.getServerData(URI.DEVICE.INFO.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.deviceItems.push({text:v.deviceName,value:v.deviceId})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });


            //获取用户信息
            IOT.getServerData(URI.ORGANIZATION.ACCOUNT.LIST,{},(ret) => {
                if (ret.code === 200) {
                  
                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.userItems.push({text:v.userName,value:v.userId})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });


        },
        mounted: function () {
            this.$nextTick(() => {
                var that = this;
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
                    url:URI.DEVICE.CHECK_MASTER.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    detailView: true,

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
                            checkbox: true
                        },

                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1-初始化 2-审核 3-作业中 4-完成 */


                                if (value === 0 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>未检查</button>";}
                                else if (value === 1 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已检查</button>";}


                            }
                        },
                        {
                            field: 'type', title: '类型', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if (value === 1 ){return "周检";}
                                else if (value === 2 ){return "月检";}


                            }
                        },
                        {
                            field: 'dutyUserName', title: '责任人', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'recordUserName', title: '记录人', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'taskTime', title: '记录时间', align: 'center', fixedLeft: true,

                        },
                        {
                            field: 'memo', title: '检查汇总', align: 'center', fixedLeft: true,

                        },
                        /*{

                            halign: "left",field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                   /!* M.Page.emit(URI.BILL.BILL_IN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.BILL.BILL_IN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;*!/
                                    M.Page.emit(URI.DEVICE.CHECK_MASTER.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.DEVICE.CHECK_MASTER.DETAIL.PAGE, JSON.stringify(rowData));

                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">查看</button>`;
                            }
                        }*/
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                         var deviceCheckMasterId = row.deviceCheckMasterId;
						if(deviceCheckMasterId==null || deviceCheckMasterId==''){
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
                            url: URI.DEVICE.CHECK_DETAIL.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',
                            customQueryParams: function (params) {
                                var queryParams = $.extend( params, {deviceCheckMasterId:deviceCheckMasterId});
                                return queryParams;
                            },
                            onLoadSuccess: function (data) {
                                console.log(data);
                            },
                            columns: [
                                {
                                    field: 'deviceName', title: '设备名称', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'deviceCode', title: '单品编码', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'state', title: '状态', align: 'center', fixedLeft: true,
                                    formatter: function (value, row, index) {
                                        if (value === 0 ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>未检查</button>";}
                                        else if (value === 1 ){return "<button style='background-color: #66b94a;border-style: none' class='btn btn-blue detail-account'>已检查</button>";}
                                    }
                                },
                                {
                                    field: 'taskUserName', title: '记录人', align: 'center', fixedLeft: true,tips:true
                                },

                                {
                                    field: 'memo', title: '备注', align: 'center', fixedLeft: true,
                                },
                                {
                                    halign: "left",field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                                    events: {
                                        'click .detail-account': function (e, value,rowData, index) {
                                             that.getResult(rowData.deviceCheckDetailId);
                                        }
                                    },
                                    formatter: function (value, row, index) {
                                        return `<button style="" class="btn btn-blue detail-account">录入结果</button>`;
                                    }
                                }
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
                    url:URI.DEVICE.SINGLE.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 10,
                    // fixedColumns: true,
                    customButton: '',
                    clickToSelect:true,

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
                            field: 'deviceName', title: '设备名称', align: 'center',width:240
                        },
                        {
                            field: 'deviceCode', title: '单品编码', align: 'center', fixedLeft: true
                        },



                    ],



                });

            });
        }
    });
})();









