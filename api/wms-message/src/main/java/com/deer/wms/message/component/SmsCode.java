package com.deer.wms.message.component;

import com.deer.wms.project.seed.core.result.Code;

/**
 * Created by Floki on 2017/10/16.
 */
public enum SmsCode implements Code {
    SEND_SUCCESS(10701, "短信下发成功")

    , SEND_ERROR(10702, "短信下发处理失败")

    , SENSITIVE_WORDS(10703, "发送内容有敏感词")

    , ISSUED_BLACKLIST(10704, "下发号码包含黑名单")

    , RECEIVE_BLACKLIST(10705, "接收号码包含黑名单")

    , RECEIVE_ILLEGAL_NUMBER(10706, "接收号码中包含非法号码")

    , SI_AUTH_FAIL(10708, "SI鉴权失败")

    , BALANCE_NOT_ADEQU(10709, "余额不足")

    , PARAMS_EXCEPTION(10712, "下发短信参数异常")

    ;

    private int code;
    private String message;

    SmsCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * 是否包含指定名称的枚举项
     *
     * @param code
     * @return
     */
    public static SmsCode contains(String code) {
        // 所有的枚举值
        SmsCode[] season = values();

        // 遍历查找
        for (SmsCode s : season) {
            if (s.getCode() == Integer.valueOf(code)) {
                return s;
            }
        }
        return null;
    }
}
