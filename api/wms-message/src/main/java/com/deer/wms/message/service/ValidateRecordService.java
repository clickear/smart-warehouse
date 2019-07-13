package com.deer.wms.message.service;

import com.deer.wms.message.model.ValidateRecord;
import com.deer.wms.project.seed.core.service.Service;

/**
 * Created by WUXB on 2017/10/16.
 */
public interface ValidateRecordService extends Service<ValidateRecord, Long> {

    /**
     * 发送手机验证码
     *
     * @param type 业务类型：1=用户注册；2=找回密码；
     * @param mobile 接收的手机号码
     */
    void sendMobileValidateCode(String type, String mobile);

    /**
     * 验证手机短信验证码
     *
     * @param type 业务类型：1=用户注册；2=找回密码；
     * @param mobile 接收短信验证的手机号码
     * @param code 手机短信验证码
     * @return true=验证通过；false=验证未通过(验证码不对、验证码失效等)
     */
    boolean validateSmsCode(String type, String mobile, String code);
    
    /**
     * 将验证码保存到数据库中
     * 
     * @param type 业务类型：1=用户注册；2=找回密码；
     * @param mobile 接收短信验证的手机号码
     * @param code 手机短信验证码
     */
    public void saveValidateRecord(String type, String mobile, String code);
}
