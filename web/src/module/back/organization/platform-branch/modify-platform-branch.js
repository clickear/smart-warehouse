import $ from 'jQuery';
(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.PLATFORM_BRANCH.MODIFY.PAGE));
    let $vue = new Vue({
        el: '.modify-platform-branch-hook',
        data: {
            info: {
                storageName: '',
                address: '',
                address1: '',
                phone: '',
                linkmanName: '',
                companyId: '1',
                storageType:'1',
                baseStationId:'',//基站ID
                lng: '',
                lat: '',
                province:'',
                city:'',
            },
            list:[]
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            baseStationId:function() {
                console.log(this.info.baseStationId);
                console.log($vue.$data.info.baseStationId);
            }
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.PLATFORM_BRANCH.DETAIL.DATA, {storageId: storeParams.storageId}, (ret) => {
                if (ret.code === 200) {
                    this.list = $.extend({}, this.list, ret.data);
                    this.info = $.extend({}, this.info, ret.data);
                    $vue.$data.info.address1 =$vue.$data.info.address;//原始地址
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                $('.form-hook').validate({
                    debug: true,
                    rules: {
                        storageName: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                        address: {
                            required: true,
                            minlength: 2,
                            maxlength: 120
                        },
                        phone: {
                            required: true,
                            phoneCN: true,
                            minlength: 11,
                            maxlength: 11
                        },
                        linkmanName: {
                            required: true,
                            minlength: 2,
                            maxlength: 30
                        },
                        baseStationId: {
                            required: true,
                            minlength: 1,
                            maxlength: 109
                        }
                    },
                    submitHandler: function (form) {
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        IOT.getServerData(URI.ORGANIZATION.PLATFORM_BRANCH.MODIFY.SAVE, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                M.Table.refresh.all();
                                M.Page.emitPrePage();
                                IOT.tips('保存成功！', 'success');
                            } else {
                                IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                            }
                        });
                        return false;
                    }
                })
                ;
            });
        }
    });
    
    var map = new BMap.Map('search-map');
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"address"
            ,"location" : map
        });
    $('#address').keyup(function(){
        $vue.$data.info.address = "";
    });
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        $("#address_list").innerHTML = str;
    });
    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        $vue.$data.info.address1 = myValue;
        $vue.$data.info.address = myValue;
        $("#address_list").innerHTML =""
    });
})();