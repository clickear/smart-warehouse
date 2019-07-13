import $ from 'jQuery';

(function () {

    let masterData = JSON.parse(IOT.getSessionStore(URI.BILL.BILL_DAMAGE.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.client-detail-hook',
        data: {
            /*   billnovch:'',
               plannovch:'',
               wareNameVch:'',
               memovch:'',
               operatervch:'',
               operatedt:'',
               billtypeint:'',
   */

            masterData:{},


        },
        created:function (){
            if(masterData.stateint   =='0'){  //初始化状态可以删除、审核
                $('#export').after('<button class="primary_btn"  @click.stop="deleteBill()">删除</button><button class="primary_btn"  @click.stop="checkBill()">审核</button>')
            }
            if(masterData.stateint   =='1'){  //审核状态，可以完成
                $('#export').after('<button class="primary_btn"  @click.stop="okBill()">完成</button>')
            }
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

            exportBill:function(){

                var billnovch = $vue.$data.masterData.billnovch;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_IN.EXPORT,{billnovch:billnovch},(ret) => {
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
            deleteBill:function(){

                var billnovch = $vue.$data.masterData.billnovch;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DAMAGE.DELETE,{billnovch:billnovch},(ret) => {
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
            checkBill:function(){

                var billnovch = $vue.$data.masterData.billnovch;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DAMAGE.CHECK,{billnovch:billnovch},(ret) => {
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

            okBill:function(){

                var billnovch = $vue.$data.masterData.billnovch;
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.BILL.BILL_DAMAGE.OK,{billnovch:billnovch},(ret) => {
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



        },
        mounted: function () {
            /*  $vue.$data.billnovch = masterData.billnovch;
              $vue.$data.plannovch = masterData.plannovch;
              $vue.$data.wareNameVch = masterData.wareNameVch;
              $vue.$data.memovch = masterData.memovch;
              $vue.$data.operatervch = masterData.operatervch;
              $vue.$data.operatedt = masterData.operatedt;
              $vue.$data.billtypeint = masterData.billtypeint;*/

            this.masterData = $.extend({}, this.masterData, masterData);



            this.$nextTick(() => {
                var $accountBox = $('.client-detail-hook');


                let tableHookName = '.BillDetail-table-hook';


                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
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

                        var queryParams ={billnovch:$vue.$data.masterData.billnovch};
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
                            field: 'areacodevch', title: '货区编码', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'areanamevch', title: '货区名', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'itemcodevch', title: '物料编码', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'itemnamevch', title: '物料名', align: 'center', fixedLeft: true,
                        },

                        {
                            field: 'quantityfl', title: '数量', align: 'center', fixedLeft: true,
                        },


                    ]
                });

            });
        }
    });
})();









