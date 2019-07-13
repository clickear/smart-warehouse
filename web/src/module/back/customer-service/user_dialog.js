/**
 * Created by Administrator on 2017/11/8.
 */
require('../../../less/back/dialog.less');
import $ from 'jQuery';
(function () {
    var list;
    let $vue = new Vue({
        el: '.customer-main-hook',
        data: {
            account:{
                msg:''
            },
            items:[],
            list:[]
        },
        methods: {
            sendMsg:function(){
                var  sendMsg =$vue.$data.account.msg.replace(/(^\s*)|(\s*$)/g, "");
                let params ={
                    consultContent:sendMsg
                }
                IOT.getServerData(URI.CUSTOMER.SEND,params, function (ret) {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        IOT.tips('发送成功，客服收到信息将第一时间向您回复！', 'success');
                        var msgArr =[
                            '<li>',
                            '<p class="msg_right">'+sendMsg +'</p>',
                            '</li>'
                        ].join('');
                        $('.dialog_list').append(msgArr);
                        $('.dialog_list').scrollTop($('.dialog_list')[0].scrollHeight);
                        $vue.$data.account.msg='';
                    } else {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    }
                });

              }
        },
        created:function(){

            IOT.getServerData(URI.CUSTOMER.MSGLIST,{},(ret) => {
                if (ret.code === 200) {
                       list = ret.data.list;
                        $.each(list,function(i,v){
                            $vue.$data.items.push({replyContent:v.replyContent,consultContent:v.consultContent});
                        });
                       this.$nextTick(() => {
                           $('.dialog_list').scrollTop($('.dialog_list')[0].scrollHeight);
                       });

                } else {
                      IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
        }
     })

})();


