import $ from 'jQuery';
require('../../../../less/back/rent/rent_detail.less');
(function () {

    let orderData = JSON.parse(IOT.getSessionStore(URI.RUN.NETWORK.RELEASE.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.detail-network-hook',
        data: {
            network: {
                'infoIndex': '',//作业ID
                'customerName': '',//对象客户
                'customerAddress': '', //客户地址
                'customerPhone': '', //客户联系电话
                'address': '', //作业目的地
                'infoType': '', //作业类型名称
                'palletTypemNum': '',//木质托盘数量
                'palletTypesNum': '',//塑料托盘数量
                'palletTypeyNum': '',//压模托盘数量
                'palletTypeqNum': '',//其他托盘数量
                'placeOrderUser': '',//操作员
                'createTime': '' //作业时间
            }
        },
        created: function () {
            IOT.getServerData(URI.RUN.NETWORK.RELEASE.DATA, {id: orderData.id}, (ret) => {
                if (ret.code === 200) {
                    this.network = $.extend({}, this.network, ret.data);
                    $vue.$data.network.confirmStatus=$vue.$data.network.confirmStatus=='1'? '入库':'出库';
                    $vue.$data.network.createTime=$vue.$data.network.createTime=='null'? '':new Date($vue.$data.network.createTime).Format('yyyy-MM-dd h:m:s');//下单时间

                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            changeOrder:function(){
                // M.Page.emit(URI.RENT.RENTAL.DETAIL.CHANGEORDER.PAGE);
            },
            contractManagement:function(){
                // M.Page.emit(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.PAGE);
            }
        },
        mounted: function () {

        }
    });
})();




















