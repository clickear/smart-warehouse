import $ from 'jQuery';
import URI from 'URI'
require('../less/common.less');
require('../less/index.less');
require('../less/login.less');
$(function () {
    let el = '.register-page-hook';
    const CONTRAST = {
        license: 'businessLicenseFile', // 营业执照
        cardFront: 'artificialPersonIdCardPositiveFile', // 身份证正面
        cardContrary: 'artificialPersonIdCardOppositeFile' // 身份证反面
    };

    /**
     * 上传图片
     * @param $box
     * @param ids '#license,#cardFront,#cardContrary'
     * @param hint {license:'营业执照',cardFront:'身份证正面',cardContrary:'身份证反面'}
     * @param successFunction
     * @param errorFunction
     */
    let _uploadImg = function ($box, ids, hint, successFunction, errorFunction) {
        $box.find(ids).off('change').on('change', function () {
            let files = this.files;
            if (files.length <= 0) {
                return false;
            }
            let file = files[0];
            let filedName = this.getAttribute('name');
            let hintText = hint[filedName];
            if (file.type.indexOf('image') != -1) { // 校验是否为图片
                if ((file.size / 1024) > 10240) {
                    $(this).val('');
                    errorFunction(filedName);
                    IOT.tips(`图片太大,请从新上传${hintText}`, 'error');
                } else {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        successFunction(filedName, e.target.result, file);
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                errorFunction(filedName);
                $(this).val('');
                IOT.tips(`只能上传图片,请从新上传${hintText}`, 'error');
                return false;
            }
        });
    };
    /**
     * 预览图片
     * @param content
     */
    let _previewImg = function (src) {
        var content = '<div class="layui-layer-wrap" style="display: block; text-align: center;"><img src="' + src + '"></div>';
        layer.open({
            type: 1,
            title: false,
            closeBtn: 1,
            area: ['95%', '95%'],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: content
        });
    };
    // 发送验证码方法
    var _fnSendCode = function (obj) {
        obj.off('click').on('click', function () {
            var mobile = $('input[name=mobile]').val();
            var param = {
                mobile: mobile
            };
            var regex = /^1[3|4|5|7|8]\d{9}$/;
            if (regex.test(mobile)) {
                obj.off('click');
                obj.removeClass('send-code');
                obj.addClass('disable-click');
                _setTime(obj);
                IOT.getServerData(URI.REGISTER.SEND, param, function (ret) {
                    if (ret && ret.code === 200) {
                        IOT.tips('验证码已经发送！请注意查收', 'success', 1000, function () {

                        });
                    }
                });
            } else {
                IOT.tips('手机号码输入有误！', 'error', 1000, null);
            }

        });
    };
    // 等待60秒
    var countdown = 60;
    function _setTime (obj) {
        if (countdown === 0) {
            obj.removeClass('disable-click');
            obj.addClass('send-code');
            obj.html('发送验证码');
            countdown = 60;
            _fnSendCode(obj);
            return;
        } else {
            obj.removeClass('send-code');
            obj.addClass('disable-click');
            obj.html('重新发送(' + countdown + ')');
            countdown--;
        }
        setTimeout(function () {
            _setTime(obj);
        }, 1000);
    }
    let $vue = new Vue({
        el: el,
        data: {
            license: DEFAULT_IMG.license,
            cardFront: DEFAULT_IMG.cardFront,
            cardContrary: DEFAULT_IMG.cardContrary,
            isShow:true,
            showtype:true,
            info: {
                mobile:'',
                smsCode:'',
                password:'',
                confirm_password:'',
                userName:'',
                gender:0,
                email:'',
                companyName: '',
                companyType: 1,
                artificialPersonName: '',
                artificialPersonIdCard: '',
                creditCode: '',
                registeredAddress: '',
                establishDate: '',
                linkmanAddress: '',
                linkmanPhone: '',
                lng: '',
                lat: '',
                supplyAbility:''
            }
        },
        created: function () {

        },
        methods: {
            // 上一页
            prePage: function () {
            },
            // 发送验证码
            sendCode: function (event) {
                _fnSendCode(event);
            },
            goToLogin: function () {
                IOT.redirect2URL('/login');
            },
            previewImg: function (event) {
                _previewImg(event.target.src);
            },
            uploadImg: function (event, sign) {
                $(`#${sign}`).click();
            },
        },
        mounted: function () {
            let thiz = this;
            this.$nextTick(() => {
                var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])|(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,30}');
                console.log(regex.test('aa.aa1aa'));
                let $defaultHook = $(el);
                let $obj =$defaultHook.find('.send-code-hook');
                _fnSendCode($obj);
                let hint = {license: '营业执照', cardFront: '身份证正面', cardContrary: '身份证反面'};
                _uploadImg($defaultHook, '#license1,#cardFront1,#cardContrary1', hint, function (filedName, src, file) {
                    thiz[filedName] = src;
                    thiz.info[CONTRAST[filedName]] = file;
                }, function (filedName) {
                    thiz[filedName] = DEFAULT_IMG[filedName];
                    delete thiz.info[CONTRAST[filedName]];
                });
                $defaultHook.find('input[name=establishDate]').datetimepicker({
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
                //提交表单
                $defaultHook.find('.identification-form-hook').validate({
                    debug: false,
                    rules: {
                        companyName: { // 企业名称
                            required: true
                        },
                      /*  artificialPersonName:{ // 法人名称
                            required:true
                        },
                        artificialPersonIdCard: { // 身份证
                            required: true,
                        },
                        creditCode: { // 信用代码
                            required: true,
                        },*/
                        confirm_password: { // 确认密码
                            required: true,
                        },
                        establishDate: { // 成立时间
                            required: true,
                        },
                        linkmanAddress: { // 联系地址
                            required: true,
                        },
                        linkmanPhone: { // 联系电话
                            required: true,
                        },
                     /*   registeredAddress: { // 注册地址
                            required: true,
                        }*/
                    },
                    messages: {},
                    submitHandler: function (form) {
                        var data = $vue.$data.info;
                        IOT.showOverlay('注册中，请稍等...');
                        IOT.getServerData(URI.REGISTER.SAVE, data, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('注册成功！跳转登录', 'success', 3000, function () {
                                    IOT.redirect2URL('/login');
                                });
                            } else {
                                IOT.tips(ret.message || '操作失败，请重试！', 'error', 1000, null);
                            }
                        }, function (result) {
                            IOT.tips(result.msg || '操作失败，请重试！', 'error');
                        });
                        return false;
                    }
                });
                $defaultHook.find('.register-form-hook').validate({
                    debug: false,
                    rules: {
                        mobile: { // 手机号码
                            required: true,
                            phoneCN: true
                        },
                        smsCode: { // 验证码
                            required: true
                        },
                        email: { // 邮箱
                            email: true,
                            required: true,
                            minlength: 1,
                            maxlength: 50
                        },
                        password: { // 密码
                            required: true,
                            minlength: 8,
                            checkPwd: true,
                            maxlength: 20

                        },
                        confirm_password: { // 确认密码
                            equalTo: '#password'
                        },
                        artificialPersonName: { // 姓名
                            required: false,
                            maxlength: 20
                        }
                    },
                    messages: {
                        password: {
                            required: '请输入密码',
                            minlength: '密码不能小于8位',
                            checkPwd: '(支持数字+字母+特殊符号)至少2种',
                            maxlength: '密码不能超过20位'
                        },
                        confirm_password: {
                            equalTo: '两次密码输入不一致'
                        },

                    },
                    submitHandler: function (form) {
                        console.log(thiz.info);
                        thiz.isShow = false ;
                    }
                });
            });
        }
    });
});
