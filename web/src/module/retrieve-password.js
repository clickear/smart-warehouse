import $ from 'jQuery';
import URI from 'URI';
$(function () {
    var $sendCode = $('.send-code-hook');
    var $sendEmail=$('.send-email-hook');
        // 发送验证码方法
        var _fnSendCode = function (obj) {
            obj.off('click').on('click', function () {
                var mobilePhone = $('input[name=mobile]').val();
                var param = {
                    mobile: mobilePhone
                };
                var regex = /^1[3|4|5|7|8]\d{9}$/;
                if (regex.test(mobilePhone)) {
                    IOT.getServerData(URI.LOGIN.RETRIEVE_PASSWORD.SEND, param, function (ret) {
                        if (ret && ret.code === 200) {
                            IOT.tips('验证码已经发送！', 'success', 1000, function () {
                                $sendCode.off('click');
                                $sendCode.removeClass('send-code');
                                $sendCode.addClass('disable-click');
                                _setTime(obj);
                            });
                        } else {
                            IOT.tips(ret.message || '请求超时', 'error', 1000, null);
                        }
                    });
                } else {
                    IOT.tips('手机号码输入有误！', 'error', 1000, null);
                }

            });
        };
        _fnSendCode($sendCode);
    var _fnSendEmail = function (obj) {
        obj.off('click').on('click', function () {
            var emailBack = $('input[name=email]').val();
            var param = {
                email: emailBack
            };
            var regex=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (regex.test(emailBack)) {
                IOT.getServerData(URI.LOGIN.RETRIEVE_PASSWORD.EMAIL, param, function (ret) {
                    if (ret && ret.code === 200) {
                        IOT.tips('验证码已经发送！', 'success', 1000, function () {
                            $sendCode.off('click');
                            $sendCode.removeClass('send-code');
                            $sendCode.addClass('disable-click');
                            _setTime(obj);
                        });
                    } else {
                        IOT.tips(ret.message || '请求超时', 'error', 1000, null);
                    }
                });
            } else {
                IOT.tips('邮箱输入有误！', 'error', 1000, null);
            }

        });
    };
    _fnSendEmail($sendEmail);
        // 等待60秒
        var countdown = 60;

        function _setTime (obj) {
            if (countdown === 0) {
                obj.removeClass("disable-click");
                obj.addClass("send-code");
                obj.html("发送验证码");
                countdown = 60;
                _fnSendCode(obj);
                _fnSendEmail(obj);
                return;
            } else {
                obj.removeClass("send-code");
                obj.addClass("disable-click");
                obj.html("重新发送(" + countdown + ")");
                countdown--;
            }
            setTimeout(function () {
                    _setTime(obj)
                }
                , 1000)
        }

    // 重新设置密码页面
    var _fnSetPwd = function (url, dialogTitle, dialogWidth, dialogHeight) {
        if (url && url.length) {
            IOT.loadTemplate(url, function (html) {
                IOT.displayDefaultDialog(dialogTitle, html, dialogWidth, dialogHeight);
            });
        } else {
            console.error('module-menu is null or empty.');
        }
    };
    // 确定提交 验证手机号码和验证码是否匹配
    var $form1 = $('.retrieve-password-phone-form');
    $form1.validate({
        debug: true,
        rules: {
            mobile: {
                phoneCN: true,
                required: true,
            },
            email: { // 邮箱
                email: true,
                required: true,
                minlength: 1,
                maxlength: 50
            },
            smsCode: {
                required: true,
            }
        },
        messages: {
        },
        submitHandler: function (form) {
            IOT.showOverlay('验证中，请稍等...');
            let params = $form1.serializeJson();
            params.type = '2';
            IOT.getServerData(URI.LOGIN.RETRIEVE_PASSWORD.CHECK, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    if (ret.data) {
                        IOT.tips('验证成功！', 'success', 1000, function () {
                            IOT.setSessionStore(URI.LOGIN.RETRIEVE_PASSWORD.REINSTALL.PAGE, params.mobile);
                            BootstrapDialog.closeAll();
                            _fnSetPwd(URI.LOGIN.RETRIEVE_PASSWORD.REINSTALL.PAGE, '设置新密码', 460, 200);
                        });
                    } else {
                        IOT.tips('验证未通过', 'error', 1000, null);
                    }
                } else {
                    IOT.tips(ret.message || '操作失败，请重试！', 'error', 1000, null);
                }
            });
            return false;
        }
    });
    //确定提交 验证电子邮箱和验证码是否匹配
    var $form2 = $('.retrieve-password-email-form');
    $form2.validate({
        debug: true,
        rules: {
            email: { // 邮箱
                email: true,
                required: true,
                minlength: 1,
                maxlength: 50
            },
            emailCode: {
                required: true,
            }
        },
        messages: {
        },
        submitHandler: function (form) {
            IOT.showOverlay('验证中，请稍等...');
            let params = $form2.serializeJson();
            params.mobile = params.email;
            params.type = '2';
            IOT.getServerData(URI.LOGIN.RETRIEVE_PASSWORD.CODE, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    if (ret.data) {
                        IOT.tips('验证成功！', 'success', 1000, function () {
                            IOT.setSessionStore(URI.LOGIN.RETRIEVE_PASSWORD.REINSTALL.PAGE, params.mobile);
                            BootstrapDialog.closeAll();
                            _fnSetPwd(URI.LOGIN.RETRIEVE_PASSWORD.REINSTALL.PAGE, '设置新密码', 460, 200);
                        });
                    } else {
                        IOT.tips('验证未通过', 'error', 1000, null);
                    }
                } else {
                    IOT.tips(ret.message || '操作失败，请重试！', 'error', 1000, null);
                }
            });
            return false;
        }
    });
    $('.btn-cancel').off('click').on('click', function () {
        BootstrapDialog.closeAll();
    });
});
