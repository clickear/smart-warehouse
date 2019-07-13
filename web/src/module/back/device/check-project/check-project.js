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
            list:[],
            account:{},
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/device/project/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            items:[{"text":"","value":""}],
            insert:{
                checkProject:{

                    checkProjectName:'',
                    memo:'',
                    deviceId:''
                },
                checkContents:[],

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

            newProject:function(){
                $("#addModal").modal('show');
            },

            //新增时下一步
            nextCreate:function(){
              
                var deviceId=$vue.$data.insert.checkProject.deviceId;
                if(deviceId ==''||deviceId==null){
                    layer.alert('请选择设备！');
                    return false;
                };

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

            addContents:function(){
                this.insert.checkContents.push({checkContentName:'',step:'',standard: ''})
            },

            cancelAdd:function(){
                this.preCreate;
                $vue.$data.insert={
                    checkProject:{
                        checkProjectName:'',
                        memo:'',
                        deviceId:''
                    },
                    checkContents:[],

                };
                $("#addModal").modal('hide');

            },



            //删除某一条入库详情
            deleteCheckContent:function(index){
                this.insert.checkContents.splice(index,1);
            },
            //保存
            save: function(){
                var insert = $vue.$data.insert;
                var checkContents = insert.checkContents;
                if(checkContents == null || checkContents.length ==0){
                    layer.alert('请添加检查内容');
                    return false;
                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.DEVICE.PROJECT.ADD.SAVE,{checkProject:insert.checkProject,checkContents:insert.checkContents},(ret) => {
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



        },
        created: function () {
            var that = this
            this.$nextTick(() => {

            });

            //获取设备信息信息
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
                    url:URI.DEVICE.PROJECT.LIST,
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
                            field: 'checkProjectName', title: '检查项目', align: 'center',width:240
                        },

                        {
                            field: 'deviceName', title: '设备名称', align: 'center', fixedLeft: true,
                        },

                        {
                            field: 'memo', title: '备注', align: 'center', fixedLeft: true,
                        },

                        {

                            halign: "left",field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {

                                    M.Page.emit(URI.DEVICE.PROJECT.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.DEVICE.PROJECT.DETAIL.PAGE, JSON.stringify(rowData));

                                    return false;
                                },
                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此检查项目？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var checkProjectId = rowData.checkProjectId;
                                        IOT.getServerData(URI.DEVICE.PROJECT.DELETE,{checkProjectId:checkProjectId},(ret) => {
                                            IOT.hideOverlay();
                                            if (ret.code === 200) {
                                                IOT.tips('保存成功！', 'success', 1000 , function () {
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

                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                operate.push(' <button style="" class="btn btn-blue detail-account">查看</button>');
                                operate.push(' <button class="btn btn-red delete">删除</button>');

                                return  operate.join(' ');

                            }
                        }
                    ],
                    //注册加载子表的事件。注意下这里的三个参数！
                    onExpandRow: function (index, row, $detail) {
                    
                        var checkProjectId = row.checkProjectId;
                        if(checkProjectId==null || checkProjectId==''){
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
                            url: URI.DEVICE.CONTENT.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 20,
                            // fixedColumns: true,
                            customButton: '',


                            customQueryParams: function (params) {

                                return   {"checkProjectId": checkProjectId };
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
                                    field: 'checkContentName', title: '检查内容', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'step', title: '步骤', align: 'center', fixedLeft: true,tips:true
                                },
                                {
                                    field: 'standard', title: '合格标准', align: 'center', fixedLeft: true,tips:true
                                },



                            ]
                        })
                    },



                });




            });
        }
    });
})();









