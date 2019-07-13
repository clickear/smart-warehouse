

import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            typeItems:[],


            rowData:{},

            info:{
                payFlowCode:'',
                payFlowName:'',
                payer:'',
                shouldPayMoney:'',
                factPayMoney:'',
                payRestMoney:'',
                memo:'',
                fTypeCode:'',
            },
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/financeOut/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '/back/financeOut/page', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '/back/financeOut/page', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '/back/financeOut/page', params: {}}
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


            updateOut:function(){
                var type = $vue.$data.rowData;
                $("#updateModal").modal('hide');
                $vue.$data.rowData = [];

                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.FINANCE.OUT.UPDATE,type,(ret) => {
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

            insertOut:function(){
                var type = $vue.$data.info;
            
                $("#newModal").modal('hide');   //让模态框关闭
                $vue.$data.info = {};
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.FINANCE.OUT.OUT_ADD.SAVE,type,(ret) => {
               
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
            created: function () {                              //页面加载完执行
            //获取财务类型信息
            IOT.getServerData(URI.FINANCE.TYPE.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;
                    $.each(list,function(i,v){
                        $vue.$data.typeItems.push({text:v.fTypeName,value:v.fTypeCode})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }

            });

            //获取单位信息
            IOT.getServerData(URI.BASE.UNIT.LIST,{},(ret) => {
                if (ret.code === 200) {

                    $.each(ret.data,function(i,val){
                        $vue.$data.items.push({text:val.unitName,value:val.unitCode})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.finance-out-main-hook');
                let tableHookName = '.finance-out-table-hook';
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
                    url: URI.FINANCE.OUT.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },

                    columns: [

                        {
                            field: 'payFlowCode', title: '合同号', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'payFlowName', title: '项目名称', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'fTypeName', title: '财务类别', align: 'center', fixedLeft: true, tips:true
                        },

                        {
                            field: 'payer', title: '收款方', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'shouldPayMoney', title: '应付金额', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'factPayMoney', title: '实付金额', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'payRestMoney', title: '剩余金额', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'memo', title: '备注', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'addDatetime', title: '创建时间', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,
                            events: {
                                'click .update': function (e, value, rowData, index) {
                                    $vue.$data.rowData = $.extend({},   rowData);
                                    $("#updateModal").modal('show');
                                },
                                'click .delete': function (e, value, rowData, index) {

                                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除此行？', {
                                        btn: ['确定','取消']
                                    }, function(){
                                        IOT.showOverlay('保存中，请稍等...');
                                        var payFlowCode = rowData.payFlowCode;
                                        IOT.getServerData(URI.FINANCE.OUT.DELETE,{payFlowCode:payFlowCode},(ret) => {
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

                                }
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
                //权限——查看
                /*if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();