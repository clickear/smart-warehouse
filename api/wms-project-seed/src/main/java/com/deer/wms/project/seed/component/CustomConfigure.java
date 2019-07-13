package com.deer.wms.project.seed.component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 自定义配置类
 *
 * Created by Floki on 2017/10/17.
 */
@Component
public class CustomConfigure {


    /**
     * 短信网关 Api 域名
     */
    @Value("${sms.api.domain}")
    private String smsApiDomain;

    /**
     * 调用短信 Rest Api 接口的 SiCode ，由短信网关分配
     */
    @Value("${sms.api.sicode}")
    private String smsApiSiCode;

    /**
     * 发送短信验证码消息的模板id
     */
    @Value("${sms.api.validate.code.template}")
    private String smsValidateCodeTemplate;

    /**
     * OneNet 平台 Api 接口域名
     */
    @Value("${onenet.api.domain}")
    private String oneNetApiDomain;

    /**
     * OneNet 平台应用产品私有协议密钥
     */
    @Value("${onenet.api.secret}")
    private String oneNetApiSecret;

    /**
     * OneNet 平台分配的用户id
     */
    @Value("${onenet.api.user.id}")
    private String oneNetApiUserId;

    /**
     * OneNet 平台上的应用产品id
     */
    @Value("${onenet.api.product.id}")
    private String oneNetApiProductId;

    /**
     * 获取设备数据的最大条数
     */
    @Value("${onenet.api.max.limit}")
    private Integer oneNetApiMaxLimit = 100;

    /**
     * Lbs Api 接口域名
     */
    @Value("${lbs.api.domain}")
    private String lbsApiDomain;

    /**
     * LBS Api Key
     */
    @Value("${lbs.api.key}")
    private String lbsApiKey;



    public String getSmsApiDomain() {
        return smsApiDomain;
    }

    public void setSmsApiDomain(String smsApiDomain) {
        this.smsApiDomain = smsApiDomain;
    }

    public String getSmsApiSiCode() {
        return smsApiSiCode;
    }

    public void setSmsApiSiCode(String smsApiSiCode) {
        this.smsApiSiCode = smsApiSiCode;
    }

    public String getSmsValidateCodeTemplate() {
        return smsValidateCodeTemplate;
    }

    public void setSmsValidateCodeTemplate(String smsValidateCodeTemplate) {
        this.smsValidateCodeTemplate = smsValidateCodeTemplate;
    }

    public String getOneNetApiDomain() {
        return oneNetApiDomain;
    }

    public void setOneNetApiDomain(String oneNetApiDomain) {
        this.oneNetApiDomain = oneNetApiDomain;
    }

    public String getOneNetApiSecret() {
        return oneNetApiSecret;
    }

    public void setOneNetApiSecret(String oneNetApiSecret) {
        this.oneNetApiSecret = oneNetApiSecret;
    }

    public String getOneNetApiUserId() {
        return oneNetApiUserId;
    }

    public void setOneNetApiUserId(String oneNetApiUserId) {
        this.oneNetApiUserId = oneNetApiUserId;
    }

    public String getOneNetApiProductId() {
        return oneNetApiProductId;
    }

    public void setOneNetApiProductId(String oneNetApiProductId) {
        this.oneNetApiProductId = oneNetApiProductId;
    }

    public Integer getOneNetApiMaxLimit() {
        return oneNetApiMaxLimit;
    }

    public void setOneNetApiMaxLimit(Integer oneNetApiMaxLimit) {
        this.oneNetApiMaxLimit = oneNetApiMaxLimit;
    }

    public String getLbsApiDomain() {
        return lbsApiDomain;
    }

    public void setLbsApiDomain(String lbsApiDomain) {
        this.lbsApiDomain = lbsApiDomain;
    }

    public String getLbsApiKey() {
        return lbsApiKey;
    }

    public void setLbsApiKey(String lbsApiKey) {
        this.lbsApiKey = lbsApiKey;
    }
}
