import $ from 'jQuery';

(function () {

    let masterData = JSON.parse(IOT.getSessionStore(URI.DEVICE.PROJECT.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail',
        data: {



            masterData:masterData,
            rowData:{},

            batch:{},
            info:{
                checkProjectId:masterData.checkProjectId,
                checkContentName:'',
                step:'',
                standard:''
            }



        },
        created:function (){





        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prevStep: function () {
                M.Page.emitPrePage();
                M.Table.refresh.all();
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },




            deleteBill:function(){

                var billNo = $vue.$data.masterData.billNo;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DETAIL.LIST,{billNo:billNo},(ret) => {
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


            updateCheckContent:function(){
                $("#updateModal").modal('hide');
                var content = $vue.$data.rowData;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.DEVICE.CONTENT.UPDATE,content,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },

            save:function(){
                $("#addContentModal").modal('hide');
                var content = $vue.$data.info;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.DEVICE.CONTENT.ADD.SAVE,content,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },


            newContent:function(){
                $("#addContentModal").modal('show');
            },







        },
        mounted: function () {

            this.$nextTick(() => {
                var $accountBox = $('.client-detail-hook');


                let tableHookName = '.check-content-table-hook';


                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.DEVICE.CONTENT.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',


                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {

                        var queryParams ={checkProjectId:$vue.$data.masterData.checkProjectId};
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
                            field: 'checkContentName', title: '检查内容', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'step', title: '步骤', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'standard', title: '合格标准', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:320,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = {};
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },

                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此行？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var checkContentId = rowData.checkContentId;
                                        IOT.getServerData(URI.DEVICE.CONTENT.DELETE,{checkContentId:checkContentId},(ret) => {
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


                            },
                            formatter: function (value, row, index) {
                                let operate = [];

                                    operate.push(' <button style="" class="btn btn-blue update">修改</button>');
                                    operate.push(' <button class="btn btn-red delete">删除</button>');



                                return  operate.join(' ');
                            }
                        }


                    ]
                });

            });
        }
    });
})();









