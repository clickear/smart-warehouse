import $ from 'jQuery';
import URI from 'URI'
require('../less/common.less');
require('../less/index.less');
require('../less/login.less');
$(function () {
    var $register = $('.register-body-hook');
    var $login = $('.login-body-hook');
    var $identification = $('.identification-body-hook');
    // 验证码
    var option = {
        mode: 0, // captcha
        captchaDom: '.form-verify-img',
        url: 'login/captcha'
    };
    $('.login-form-hook').IOTCaptcha(option);
    // 找回密码
    $('.pwd-forget-hook').off('click').on('click', function () {
        var url = URI.LOGIN.RETRIEVE_PASSWORD.PAGE;
        IOT.loadTemplate(url, function (html) {
            IOT.displayDefaultDialog('找回密码', html, 460, 200);
        });
    });
    // 注册新用户
    $('.register-new-hook').off('click').on('click', function () {
        IOT.redirect2URL(URI.REGISTER.PAGE);
    });

    var $form = $('.login-form-hook');
    $form.validate({
        debug: true,
        rules: {
            username: {
                required: true,
                minlength: 1,
                maxlength: 30
            },
            password: {
                required: true,
                maxlength: 20
            },
            captcha: {
                required: true,
                maxlength: 10
            }
        },
        messages: {
            username: {
                required: '请输入用户名'
            },
            password: {
                required:'请输入密码',
            },
            captcha: {
                required: '请输入验证码！'
            }
        },
        submitHandler: function (form) {
            IOT.showOverlay('登录中，请稍等...');
            IOT.getServerData(
                '/login',
                $form.serialize(),
                function (ret) {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('登录成功！', 'success', 1000, function () {
              
                            IOT.redirect2URL(ret.url);
                        });
                    } else {
                        console.log(JSON.stringify(ret));
                        IOT.tips(ret.msg || '登录失败！', 'error', 1000, function () {
                            if (ret.code === 401) {
                                $('#login_scode').trigger('click');
                            }
                        });
                    }
                },
                function () {
                    IOT.hideOverlay();
                    IOT.tips('系统忙请稍后再试！', 'error');
                }
            );
            return false;
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 13) {
            // $('.btn-login').trigger('click');
            // $form.submit();
        }
    });
    var Q = window.Q = Q || {};
    var Page = Q.Page = function () {
    };
    Page.emit = function (url) {
        IOT.loadTemplate(url, function (html) {
            $login.hide();
            $register.hide();
            $identification.show();
            var $page = $(html).hide();
            $identification.html($page);
            $page.show();
        });
    }
    Page.goBack = function () {
        $identification.hide();
        $register.show();
    }
    /**
     * 预览图片
     * @param content
     */
    Q.previewImg = function (src) {
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


    /**
     * 上传图片
     * @param $box
     * @param ids '#license,#cardFront,#cardContrary'
     * @param hint {license:'营业执照',cardFront:'身份证正面',cardContrary:'身份证反面'}
     * @param successFunction
     * @param errorFunction
     */
    Q.uploadImg = function ($box, ids, hint, successFunction, errorFunction) {
        $box.find(ids).off('change').on('change', function () {
            let files = this.files;
            if (files.length <= 0) {
                return false;
            }
            let file = files[0];
            let filedName = this.getAttribute('name');
            let hintText = hint[filedName];

            if (file.type.indexOf('image') != -1) { // 校验是否为图片
                if ((file.size / 1024) > 2048) {
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
});

// 动态JS刷新
if (module.hot) {
    module.hot.accept();
}
