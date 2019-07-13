import $ from 'jQuery';
import URI from 'URI';
$(function () {
    // 确定重新保存密码
    var $form = $('.reinstall-password-form');
    var mobile = IOT.getSessionStore(URI.LOGIN.RETRIEVE_PASSWORD.REINSTALL.PAGE);
    $form.validate({
        debug: true,
        rules: {
            password: {
                required: true,
                minlength: 8,
                checkPwd: true,
                maxlength: 20
            },
            affirm_password: {
                equalTo:'#newPassword'
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
            }
        },
        submitHandler: function (form) {
            IOT.showOverlay('正在处理，请稍等...');
            let params = $form.serializeJson()
            console.log(params);
            params.mobile = mobile;
            IOT.getServerData(URI.LOGIN.RETRIEVE_PASSWORD.REINSTALL.SAVE, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('保存成功！', 'success', 1000, function () {
                        BootstrapDialog.closeAll();
                    });
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
