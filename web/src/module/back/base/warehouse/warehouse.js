import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {

            rowData:{
                wareName:'',
                wareCode:'',
                companyName:'',
            },
            info:{
                wareName:'',
                memo:'',


            },
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/warehouse/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },

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

            updateWare:function(){
                var item = $vue.$data.rowData;
                $("#updateModal").modal('hide');
                $vue.$data.rowData = [];
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BASE.WAREHOUSE.UPDATE,item,(ret) => {

                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            layer.closeAll();
                           // M.Table.refresh.all();
                            location.reload(true);

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            insertWare:function(){
                var ware = $vue.$data.info;
                var wareName   =   ware.wareName.replace(/^\s+|\s+$/g,'');
                if(wareName == null || wareName == ""){
                    layer.alert('请输入仓库名称！');
                    return false;
                };
                $("#newModal").modal('hide');
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BASE.WAREHOUSE.WAREHOUSE_ADD.SAVE,ware,(ret) => {

                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            layer.closeAll();
                            location.reload(true);
                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                $vue.$data.info ={
                    wareName:'',
                    memo:'',

                };
            }



        },
        mounted: function () {
            M.Page.changeWareAndMaster();

            this.$nextTick(() => {
                var $accountBox = $('.ware-hook');

                let tableHookName = '.ware-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'return-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.BASE.WAREHOUSE.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    showColumns:true,
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
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
                            field: 'wareCode', title: '仓库编码', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'wareName', title: '仓库名字', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'companyName', title: '公司', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'memo', title: '备注', align: 'center', fixedLeft: true, tips:true
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:300,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = $.extend({},   rowData);

                                    $("#updateModal").modal('show');
                                },
                                'click .print': function (e, value, rowData, index) {

                                    $vue.$data.rowData = rowData;
                                    $("#wareBar").barcode(rowData.wareCode, "code128",{
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
                                    $("#wareCode").text(rowData.wareCode);
                                    $("#companyName").text(rowData.companyName);

                                    for(var i=0;i<1000000;i++){
                                        if(i==999999){
                                            $("#warePrintArea").printArea();
                                        }
                                    }


                                },
                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否删除此仓库，一旦删除，此仓库所有信息，不可找回，请谨慎操作!', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var wareCode = rowData.wareCode;
                                        IOT.getServerData(URI.BASE.WAREHOUSE.DELETE,{wareCode:wareCode},(ret) => {
                                            IOT.hideOverlay();
                                            if (ret.code === 200) {
                                                IOT.tips('保存成功！', 'success', 1000 , function () {
                                                    layer.closeAll();
                                                    location.reload(true);
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
                /*if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();