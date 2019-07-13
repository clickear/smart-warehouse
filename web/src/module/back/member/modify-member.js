import $ from 'jQuery';
import URI from 'URI';

$(function () {

    var EL = '.member-info-page-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            baseUrl: STATIC_SERVER,
            iconUrlFile: '',
            info: {
                userId:1,
                userName:'',
                gender:1,
                mobile:'00000000000',
                email:'',
                iconUrl:'',
                companyId:'',
                companyType:'',
                companyName:'',
                linkmanAddress:'',
                linkmanPhone:'',
                roleId:'',
                roleName:''
            }
        },
        methods: {
            goBack: function () {
                location.reload();
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
                // 获取用户信息
                IOT.getServerData(URI.MEMBER.MODIFY.DATA, {}, function (ret) {
                    if (ret && ret.code === 200) {
                        $vue.$data.info = $.extend({}, $vue.$data.info, ret.data);
                        $vue.$data.info.gender = (ret.data.gender === 1 ? '♀' : '♂');
                        ret.data.iconUrl = (ret.data.iconUrl ? ret.data.iconUrl : DEFAULT_IMG.portrait);
                        $vue.$data.iconUrlFile =$vue.$data.baseUrl+ ret.data.iconUrl;
                    }
                });
                let hint = {iconUrlFile: '头像'};
                M.uploadImg($createClient, '#iconUrlFile', hint, function (filedName, src, file) {
                    thiz[filedName] = src;
                    thiz.info['iconUrlFile'] = file;
                }, function (filedName) {
                    // thiz[filedName] = DEFAULT_IMG[filedName];
                    delete thiz.info['iconUrlFile'];
                });
                $createClient.find('.member-hook').validate({
                    debug: true,
                    rules: {
                        email: {
                            email: true,
                            required: true,
                            minlength: 1,
                            maxlength: 50
                        },
                        linkmanPhone: {
                            phoneCN: false,
                            required: false,
                            maxlength: 15
                        },
                        linkmanAddress: {
                            required: false,
                            maxlength: 50
                        }
                    },
                    submitHandler: function (form) {
                        let params = $(form).serializeJson();
                        var data = $.extend({}, $vue.$data.info, params);
                        console.log(data);
                        // return false;
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.doFileUpload2(URI.MEMBER.MODIFY.SAVE, data, function (result) {
                            IOT.hideOverlay();
                            if (result && result.code === 200) {
                                IOT.tips('保存成功！', 'success', 1000, function () {
                                    location.reload();
                                });
                            } else {
                                IOT.tips(result.message || '操作失败，请重试！', 'error');
                            }
                        }, function (result) {
                            IOT.hideOverlay();
                            IOT.tips(result.message || '操作失败，请重试！', 'error');
                            console.error(result);
                        });
                        return false;
                    }
                });
            });
        }
    });
});
