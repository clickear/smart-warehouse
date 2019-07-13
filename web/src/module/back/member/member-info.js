import $ from 'jQuery';
import URI from 'URI';
$(function () {
    var $box = $('.member-info-page-hook');
    var $content = $('.member-page-hook');
    $box.find('.modify-member-hook').off('click').on('click', function () {
        IOT.loadTemplate(URI.MEMBER.MODIFY.PAGE, function (html) {
            var $html = $(html);
            $content.empty();
            $content.html($html);
        },null);
    });
    $box.find('.modifiy-pwd-hook').off('click').on('click', function () {
        $box.find('.member-hook').hide();
        $box.find('.update-pwd-form-hook').show();
    });
    $box.find('.return-hook').off('click').on('click', function () {
        $box.find('.update-pwd-form-hook').hide();
        $box.find('.member-hook').show();
    });
    var $form = $box.find('.member-hook');
    // 提交修改个人信息表单
    $form.validate({
        debug: true,
        rules: {
            email: {
                email: true,
                required: true,
                minlength: 1,
                maxlength: 50
            },
            linkmanPhone: {
                phoneCN: true,
                required: false,
                maxlength: 15
            },
            linkmanAddress: {
                required: false,
                maxlength: 50
            }
        },
        messages: {
            email: {
                required: '请输入邮箱！'
            }
        },
        submitHandler: function (form) {
            IOT.showOverlay('保存中，请稍等...');
            let params = $form.serialize();
            IOT.getServerData(URI.MEMBER.SAVE, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('保存成功！', 'success', 1000, function () {
                        location.reload();
                    });
                    // $box.find('.modifiy-member-hook').trigger('click');
                } else {
                    IOT.tips(ret.message || '操作失败，请重试！', 'error', 1000, null);
                }
            });
            return false;
        }
    });
    var $formPwd = $box.find('.update-pwd-form-hook');
    // 提交修改密码表单
    $formPwd.validate({
        debug: true,
        rules: {
            oldPassword: {
                required: true,
                maxlength: 20
            },
            password: {
                required: true,
                minlength:8,
                checkPwd: true,
                maxlength: 20
            },
            confirmPassword: {
                required: true,
                equalTo: '#newpwd'
            }
        },
        messages: {
            password: {
                required: '请输入密码',
                minlength: '密码不能小于8位',
                checkPwd: '(支持数字+字母+特殊符号)至少2种',
                maxlength: '密码不能超过20位'
            },
            confirmPassword: {
                equalTo: '两次密码输入不一致'
            }
        },
        submitHandler: function (form) {
            IOT.showOverlay('保存中，请稍等...');
            let params = $formPwd.serialize();
            IOT.getServerData(URI.MEMBER.UPDATE_PWD, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('保存成功！', 'success', 1000, function () {
                        location.reload();
                    });
                    // $box.find('.modifiy-member-hook').trigger('click');
                } else {
                    IOT.tips(ret.message || '操作失败，请重试！', 'error', 1000, null);
                }
            });
            return false;
        }
    });
});
