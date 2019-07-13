/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.CUSTOMER.DETAIL.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.detail-settlement-hook',
        data: {
            account: {
                'consultId':'', //咨询编号
                'consultUserName':'', //咨询人姓名
                'consultUserMobile':'', //咨询人电话
                'companyName':'', //咨询人公司名称
                'consultTime':'', //咨询时间
                'consultContent':'', //咨询内容
                'replyContent':'' //回复内容
            }

        },
        created: function () {
            if (orderData.reply != true){
                $('.order_operation_btn').append('<button class="primary_btn" @click.stop="reply()">回复</button>');
            }
            IOT.getServerData(URI.CUSTOMER.DETAIL.DATA, {consultId: orderData.consultId}, (ret) => {
                if (ret.code === 200) {
                    this.account = $.extend({}, this.account, ret.data);
                    if($vue.$data.account.consultTime == null){
                        $vue.$data.account.consultTime="";
                    }else{
                        $vue.$data.account.consultTime=new Date($vue.$data.account.consultTime).Format('yyyy-MM-dd hh:mm:ss');
                    }
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
            reply:function(){
                $vue.$data.account.replyContent = $("textarea").val();
                console.log($vue.$data.account);
                let params = $vue.$data.account;
                if (params.replyContent != '' && params.replyContent != null  ){
                    params.reply = true;
                } else {
                    params.reply = false;
                }
                IOT.getServerData(URI.CUSTOMER.DETAIL.SAVE,params,function (ret){
                    if (ret && ret.code === 200) {
                        IOT.tips('回复成功！', 'success');
                    } else {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    }
                });
                //M.Page.emitPrePage();
            }
        },
        mounted: function () {

        }
    });
})();




















