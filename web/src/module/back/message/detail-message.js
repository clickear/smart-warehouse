/**
 * Created by Administrator on 2017/10/12.
 */
require('../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
import URI from 'URI';
(function () {
    let messageData = JSON.parse(IOT.getSessionStore(URI.MESSAGEBACKLOG.DETAIL.PAGE));
    var timer; // 定时器
    var index = 0; //记录播放到第几个point
    var points = [];
    var car;   //汽车图标
    let $vue = null;
    $vue = new Vue({
        el: '.detail-message-hook',
        data: {
            po: [116.337428, 39.90923],
            show:{
                present: true, // 当前位置
                history: false // 历史轨迹
            },
            map: '',
            marker: '',
            account: {
                'businessNo':'',
                'businessType':'',
                'backState':'',
                'noticeRuleValue':'',
                'terminalPosition':'',
                'deliveryStatus':'',
                'bLng': "120.219342",
                'bLat': "31.56098",
                'location':'广东省广州市白云区广州火车站附近'
            }
        },
        created: function () {
            if(messageData.businessType == '收货确认'){
                $('#confirm_btn').append('<button class="primary_btn sure-order fr" @click.stop="sureOrder()">确认收货</button>');
            }
            if(messageData.terminalPosition != 'null'){
                $('#addree_btn').prepend('<div style="width: 95%;height: 100px;border: solid 1px;margin: 0 auto"></div>');
            }
            IOT.getServerData(URI.MESSAGEBACKLOG.DETAIL.DATA, {businessNo: messageData.businessNo}, (ret) => {
                console.log(ret.data);
                if (ret.code === 200) {
                    if(ret.data.backState == 'unread'){
                        ret.data.backState= '未读';
                    }else if(ret.data.backState == 'read') {
                        ret.data.backState = '已读';
                    }
                    if(ret.data.businessType == 'order'){
                        ret.data.businessType= '订单消息';
                    }else if(ret.data.businessType == 'warning') {
                        ret.data.businessType = '告警消息';
                    }
                    this.account = $.extend({}, this.account, ret.data);
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
            checkMenu:function(){

            },
            contractManagement:function(){
                // M.Page.emit(URI.SUPPLY.ORDER.DETAIL.CONTRACTMANAGEMENT.PAGE);
            },
            sureOrder:function(){
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认收货？', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    IOT.hideOverlay();
                    IOT.getServerData(URI.HOMEPAGE.BACKLOG.CONFIRM, {orderNo: messageData.businessNo}, (ret) => {
                        if (ret.code === 200) {
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
                return false;
            },
        },
        mounted: function () {
            this.$nextTick(() => {
                let position = this.po;
                let point = new BMap.Point(position[0], position[1]);
                // 初始化地图
                let marker, lineArr = [];
                let map = new BMap.Map("commonMap");
                map.centerAndZoom(point, 14);
                map.enableScrollWheelZoom();
                // 逆地址解析方法
               var geoc = new BMap.Geocoder(); // 创建逆地址解析器
           /*     IOT.getServerData(URI.ASSET.account.DETAIL.DATA, {deviceId: $('#deviceId').val()},  (ret) => {
                    if (ret.code === 200) {
                        let data = ret.data;
                        this.account = $.extend({}, this.account, ret.data);*/
                        let pt = new BMap.Point(this.account.bLng, this.account.bLat);
                        marker = new BMap.Marker(pt);
                        map.addOverlay(marker);
                        map.panTo(pt);
                       /* geoc.getLocation(pt, function(rs){
                            let addComp = rs.addressComponents;
                            let address = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
                            $vue.$data.account.location = address;
                        });*/
              /*      }
                })
*/
            });
        }
    });
    $('.custom-menu').click(function(){
         $('.custom-menu').removeClass('active');
         $(this).addClass('active');
         $('.common-map').hide();
        $('.common-map').eq($(this).index()).show();
    })
})();




















