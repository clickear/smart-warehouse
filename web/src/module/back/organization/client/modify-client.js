import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.CLIENT.MODIFY.PAGE));
    const CONTRAST = {
        license: 'businessLicenseFile', // 营业执照
        cardFront: 'artificialPersonIdCardPositiveFile', // 身份证正面
        cardContrary: 'artificialPersonIdCardOppositeFile' // 身份证反面
    };
    const EL = '.modify-client-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            baseUrl: STATIC_SERVER,
            license: DEFAULT_IMG.license,
            cardFront: DEFAULT_IMG.cardFront,
            cardContrary: DEFAULT_IMG.cardContrary,
            info: {
                companyId: '',
                companyName: '',
                creditCode: '',
                registeredAddress: '',
                linkmanAddress: '',
                linkmanAddress1: '',
                linkmanPhone: '',
                lng: '',
                lat: '',
                artificialPersonName: '',
                artificialPersonIdCard: '',
                establishDate: '',
                linkmanUserPhone: '',
                supplyCapability: '',
                businessLicenseImgUrl: '',
                idCardPositiveImgUrl: '',
                idCardOppositeImgUrl: ''
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            previewImg: function (event) {
                M.previewImg(event.target.src);
            },
            uploadImg: function (event, sign) {
                $(`#${sign}`).click();
            }
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.CLIENT.MODIFY.DATA, storeParams, (ret) => {
                if (ret.code === 200) {
                    let data = ret.data;
                    if (data.businessLicenseImgUrl !== '') {
                        //this.license = STATIC_SERVER + data.businessLicenseImgUrl;
                        this.license = data.businessLicenseImgUrl.substr(1);
                    }
                    if (data.idCardPositiveImgUrl !== '') {
                        //this.cardFront = STATIC_SERVER + data.idCardPositiveImgUrl;
                        this.cardFront = data.idCardPositiveImgUrl.substr(1);
                    }
                    if (data.idCardOppositeImgUrl !== '') {
                        //this.cardContrary = STATIC_SERVER + data.idCardOppositeImgUrl;
                        this.cardContrary = data.idCardOppositeImgUrl.substr(1);
                    }
                    this.info = $.extend({}, this.info, data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {

            let thiz = this;
            this.$nextTick(() => {
                let $createClient = $(EL);
                let hint = {license: '营业执照', cardFront: '身份证正面', cardContrary: '身份证反面'};
                M.uploadImg($createClient, '#license,#cardFront,#cardContrary', hint, function (filedName, src, file) {
                    thiz[filedName] = src;
                    thiz.info[CONTRAST[filedName]] = file;
                }, function (filedName) {
                    thiz[filedName] = DEFAULT_IMG[filedName];
                    delete thiz.info[CONTRAST[filedName]];
                });
                $createClient.find('input[name=establishDate]').datetimepicker({
                    // value: initDate,
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },

                    onChangeDateTime: function (dateText, inst) {
                        $vue.$data.info.establishDate = new Date(dateText).Format('yyyy-MM-dd');
                    },
                    timepicker: false // 关闭时间选项
                });

                $createClient.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        companyName: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                        artificialPersonName: {
                            required: true,
                            minlength: 2,
                            maxlength: 20
                        },
                        artificialPersonIdCard: {
                            required: true,
                            minlength: 18,
                            maxlength: 18
                        },
                        creditCode: {
                            required: true,
                            maxlength: 50
                        },
                        registeredAddress: {
                            maxlength: 120
                        },
                        establishDate: {
                            required: true,
                            date: true
                        },
                        linkmanAddress: {
                            maxlength: 120
                        },
                        linkmanPhone: {
                            required: true,
                            phoneCN: true
                        },
                        lng: {
                            required: true,
                            number: true,
                            minlength: 3,
                            maxlength: 12
                        },
                        lat: {
                            required: true,
                            number: true,
                            minlength: 2,
                            maxlength: 12
                        }
                    },
                    submitHandler: function (form) {
                        let params = $vue.$data.info;
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.doFileUpload2(URI.ORGANIZATION.CLIENT.MODIFY.SAVE, params, function (result) {
                            IOT.hideOverlay();
                            if (result && result.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                M.Table.refresh.all();
                                M.Page.emitPrePage();
                            } else {
                                IOT.tips(result.message || '操作失败，请重试！', 'error');
                            }
                        }, function (result) {
                            IOT.tips(result.message || '操作失败，请重试！', 'error');
                            IOT.hideOverlay();
                        });
                        return false;
                    }
                });
            });
        }
    });
    //联系地址
    var map2 = new BMap.Map('linkmanAddress-map');
    map2.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
    //输入地址事件处理 start
    var ac2 = new BMap.Autocomplete(    //建立一个自动完成的对象
        {"input" :"linkmanAddress"
            ,"location" : map2
        });
    $('#linkmanAddress').keyup(function(){
        $vue.$data.info.linkmanAddress = "";
    });
    ac2.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
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
        $("#linkmanAddress_list").innerHTML = str;
    });
    var myValue;
    ac2.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        console.log(e);
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        $vue.$data.info.linkmanAddress = myValue;
        $vue.$data.info.linkmanAddress1 = myValue;
        $("#linkmanAddress_list").innerHTML ="";
        setPlace();
    });
    //获取经纬度
    function setPlace(){
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun(){
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            //console.log(pp.lng+","+pp.lat);
            $vue.$data.info.lng = pp.lng;
            $vue.$data.info.lat = pp.lat;
        }
        var local = new BMap.LocalSearch(map2, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
    }
})();




