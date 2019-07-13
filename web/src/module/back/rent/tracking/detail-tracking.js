/**
 * Created by Administrator on 2017/10/13.
 */
/**
 * Created by Administrator on 2017/10/13.
 */
import $ from 'jQuery';

(function () {
    let transportBill = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.DETAIL.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.tracking-detail-hook',
        data: {
            tracking: {
                transportBillNo: '',         //订单号
                billTypeStr: '',     //运单类型
                totalStock:'',   //托盘数量
                createTimeStr:'',   //运单日期
                supplierCompanyName: '',  //供货客户
                supplierStorageName: '', //供货网点
                consigneeCompanyName: '', //收货单位
                consigneeStorageName:'' //收货网点
            }
        },
        created: function () {
            IOT.getServerData(URI.RENT.TRACKING.DETAIL.DATA, {id: transportBill.transportBillId}, (ret) => {
                if (ret.code === 200) {
                    let data = ret.data;
                    this.tracking = $.extend({}, this.tracking, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {


            bindOrder:function () {
                M.Page.emit(URI.RENT.TRACKING.DETAIL.BIND.PAGE);
                IOT.setSessionStore(URI.RENT.TRACKING.DETAIL.BIND.PAGE, JSON.stringify({
                    id:$vue.$data.tracking.transportBillNo
                }));
            },
            offOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认解除绑定？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.TRACKING.DETAIL.OFF_BIND, {transportBillNo: transportBill.transportBillId}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.emitPrePage();

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }, function(){
                    //取消
                });
            },
            editOrder:function(){
                let params = $vue.$data.tracking;
                params.action=ACTION.MODIFY;
                IOT.setSessionStore(URI.RENT.TRACKING.CREATE.PAGE, JSON.stringify(params));
                M.Page.emit(URI.RENT.TRACKING.CREATE.PAGE);
            },
            recoverOrder:function () {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认恢复订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.TRACKING.DETAIL.RECOVER_ORDER, {id: transportBill.transportBillId}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.emitPrePage();

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }, function(){
                    //取消
                });
            },
            cancleOrder:function () {
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认废弃订单？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.TRACKING.DETAIL.CANCLE_ORDER, {id: transportBill.transportBillId}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.emitPrePage();

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }, function(){
                    //取消
                });
            },
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            exportOrder:function () {
                var staticServer = $('#staticServer').val();
                IOT.showOverlay('正在导出，请稍等...');
                IOT.getServerData(URI.RENT.TRACKING.DETAIL.EXPORT,{transportBillId: transportBill.transportBillId}, (ret) => {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        window.location.href = ret.data.substr(1);
                        IOT.tips('导出完成！', 'success');
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
                return false;
            },
            printOrder:function(){
                window.print();
                /*  $(".inner-wrapper").printArea();*/
            },

        },
        mounted: function () {
            this.$nextTick(() => {
            });
        }
    });
})();




















