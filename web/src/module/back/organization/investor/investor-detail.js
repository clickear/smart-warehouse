import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.INVESTOR.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.investor-detail-hook',
        data: {
            baseUrl: STATIC_SERVER,
            license: DEFAULT_IMG.license,
            cardFront: DEFAULT_IMG.cardFront,
            cardContrary: DEFAULT_IMG.cardContrary,
            info: {
                'companyId': '',
                'companyName': '',
                'companyType': '',
                'creditCode': '',
                'registeredAddress': '',
                'linkmanAddress': '',
                'linkmanPhone': '',
                'lng': '',
                'lat': '',
                'artificialPersonName': '',
                'artificialPersonIdCard': '',
                'establishDate': '',
                'linkmanUserPhone': '',
                'supplyCapability': '',
                'businessLicenseImgUrl': '',
                'idCardPositiveImgUrl': '',
                'idCardOppositeImgUrl': ''
            }
        },
        created: function () {
            IOT.getServerData(URI.ORGANIZATION.INVESTOR.DETAIL.DATA, storeParams, (ret) => {
                if (ret.code === 200) {
                    let data = ret.data;
                    if (data.businessLicenseImgUrl !== '') {
                        this.license = STATIC_SERVER + data.businessLicenseImgUrl;
                    }
                    if (data.idCardPositiveImgUrl !== '') {
                        this.cardFront = STATIC_SERVER + data.idCardPositiveImgUrl;
                    }
                    if (data.idCardOppositeImgUrl !== '') {
                        this.cardContrary = STATIC_SERVER + data.idCardOppositeImgUrl;
                    }
                    this.info = $.extend({}, this.info, data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });

        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            previewImg: function (event) {
                M.previewImg(event.target.src);
            }
        },
        mounted: function () {
            this.$nextTick(() => {

            });
        }
    });
})();





















