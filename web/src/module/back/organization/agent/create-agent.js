import $ from 'jQuery';

(function () {
    const EL = '.create-agent-hook';
    const CONTRAST = {
        license: 'businessLicenseFile', // 营业执照
        cardFront: 'artificialPersonIdCardPositiveFile', // 身份证正面
        cardContrary: 'artificialPersonIdCardOppositeFile' // 身份证反面
    };
    let $vue = new Vue({
        el: EL,
        data: {
            license: DEFAULT_IMG.license,
            cardFront: DEFAULT_IMG.cardFront,
            cardContrary: DEFAULT_IMG.cardContrary,
            info: {
                companyName: '',
                artificialPersonName: '',
                artificialPersonIdCard: '',
                creditCode: '',
                registeredAddress: '',
                establishDate: '',
                linkmanAddress: '',
                companyType: COMPANY_TYPE.AGENT,
                linkmanPhone: '',
                lng: '',
                lat: ''
            }
        },
        methods: {
            goBack: function () {
                // console.log(this.info);
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
                $('#establishDateDateTime').datetimepicker({
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
                        IOT.doFileUpload2(URI.ORGANIZATION.AGENT.CREATE.SAVE, params, function (result) {
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
})();


