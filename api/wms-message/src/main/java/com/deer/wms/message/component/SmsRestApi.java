package com.deer.wms.message.component;

import com.alibaba.fastjson.JSON;
import com.deer.wms.project.seed.component.CustomConfigure;
import com.deer.wms.project.seed.component.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Map;

/**
 * 访问短信网关或第三方平台 Rest Api 接口类
 *
 * Created by Floki on 2017/10/16.
 */
@Component
public class SmsRestApi extends RestClient {
    /** 下发模板短信接口地址 */
    public static String SEND_TMP_SMS = "/tempsmsSend?sicode={0}&tempid={1}&mobiles={2}";

    @Autowired
    private CustomConfigure configure;
    private static Logger logger = LoggerFactory.getLogger(SmsRestApi.class);

    /**
     * 发送模板短信
     *
     * @param mobile 短信接收号码
     * @param contents 短信内容模板里面的参数
     * @return 返回发送短信的结果
     */
    public SmsSendResult sendTemplateSms(String mobile, Map<String, String> contents) {
        //发送短信的 Rest Api 接口地址
        String url = getSendTemplateSmsApiUrl(mobile, contents);
        logger.info("send sms rest api url : {}", url);

        //发送短信的 Rest Api 接口请求的Header参数
        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> formEntity = new HttpEntity<>("", requestHeaders);

        String result;
        try {
            ResponseEntity<String> responseResult = restTemplate.exchange(url, HttpMethod.POST, formEntity, String.class);
            result = null == responseResult ? "" : responseResult.getBody();
        } catch (Exception e) {
            logger.error("send sms error : {}", e.getMessage());
            result = "";
        }

        logger.info("send sms result : {}", result);
        return JSON.parseObject(result, SmsSendResult.class);
    }

    /**
     * 获取发送模板短信的 Rest Api 接口地址
     *
     * @param mobile 短信接收号码
     * @param contents 模板内容参数
     * @return
     */
    private String getSendTemplateSmsApiUrl(String mobile, Map<String, String> contents) {
        String url = getSendTemplateSmsApiUrl(mobile);
        String params = getSendTemplateContentParams(contents);
        return url + "&" + params;
    }

    /**
     * 获取发送模板短信的 Rest Api 接口地址
     *
     * @param mobile 短信接收号码
     * @return
     */
    private String getSendTemplateSmsApiUrl(String mobile) {
        String domain = configure.getSmsApiDomain();
        String siCode = configure.getSmsApiSiCode();
        String templateId = configure.getSmsValidateCodeTemplate();
        return domain + MessageFormat.format(SEND_TMP_SMS, siCode, templateId, mobile);
    }

    /**
     * 解析模板内容中的参数
     *
     * @param contents 模板内容参数
     * @return
     */
    private String getSendTemplateContentParams(Map<String, String> contents) {
        StringBuilder params = new StringBuilder();
        if (null != contents && !contents.isEmpty()) {
            for (Map.Entry<String, String> entry : contents.entrySet()) {
                params.append(params.length() == 0 ? "" : "&");
                params.append(entry.getKey()).append("=").append(entry.getValue());
            }
        }
        return params.toString();
    }
}
