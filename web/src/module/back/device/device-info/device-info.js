import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {

            info:{
               
              deviceName:'',
              memo:''
            },
            wareItems:[],
            rowData:{},
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/device/info/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
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
            // 新增
            newDevice: function () {

            },

            updateDevice:function(){
             
                var item = $vue.$data.rowData;
                $("#updateModal").modal('hide');
                $vue.$data.rowData = [];
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BASE.AREA.UPDATE,item,(ret) => {

                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            layer.closeAll();
                            M.Table.refresh.all();


                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            insertDevice:function(){
                var wareCode = IOT.getLocalStore("backWare");
                $vue.$data.info.wareCode = wareCode;
                var item = $vue.$data.info;
                $("#newModal").modal('hide');
                $vue.$data.info ={
                    wareCode:'',
                    areaName:'',
                    memo:''
                };
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.DEVICE.INFO.ADD.SAVE,item,(ret) => {

                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            layer.closeAll();
                            M.Table.refresh.all();


                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }


        },
        created: function () {



        },

        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.device-info-hook');
            
                let tableHookName = '.device-info-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');
                // 省份-城市-区域
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'return-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.DEVICE.INFO.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',

                    customQueryParams: function (params) {
                        var wareCode = IOT.getLocalStore("backWare");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({wareCode:wareCode}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function () {
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },

                        {
                            field: 'deviceName', title: '设备名称', align: 'center', fixedLeft: true, tips:true
                        },


                        {
                            field: 'memo', title: '备注', align: 'center', fixedLeft: true,
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:300,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },
                                'click .print': function (e, value, rowData, index) {
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#areaBar").barcode(rowData.areaCode, "code128",{
                                        // output:'css',       //渲染方式 css/bmp/svg/canvas
                                        //bgColor: '#ff0000', //条码背景颜色
                                        color: '#000000',   //条码颜色
                                        barWidth: 2,        //单条条码宽度
                                        barHeight: 80,     //单体条码高度
                                        // moduleSize: 5,   //条码大小
                                        // posX: 10,        //条码坐标X
                                        // posY: 5,         //条码坐标Y
                                        //  addQuietZone: false  //是否添加空白区（内边距）
                                    });
                                    $("#wareName").text(rowData.wareName);
                                    $("#areaName").text(rowData.areaName);
                                    $("#areaCode").text(rowData.areaCode);
                                    $("#areaPrintArea").printArea();

                                },
                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此设备？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var areaCode = rowData.areaCode;
                                        IOT.getServerData(URI.DEVICE.INFO.DELETE,{deviceId:rowData.deviceId},(ret) => {
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
                                operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                operate.push(' <button class="btn btn-red delete">删除</button>');
                                operate.push(' <button class="btn btn-blue print">打印条码</button>');
                                return  operate.join(' ');
                            }
                        }
                    ]
                });
                //权限——查看
                /*if (!M.Authority.checkAuthority('area-delete')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();