package com.deer.wms.message.service.impl;

import com.deer.wms.message.component.SmsCode;
import com.deer.wms.message.component.SmsRestApi;
import com.deer.wms.message.component.SmsSendResult;
import com.deer.wms.message.dao.ValidateRecordMapper;
import com.deer.wms.message.model.Sms;
import com.deer.wms.message.model.ValidateRecord;
import com.deer.wms.message.service.ValidateRecordService;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.exception.ServiceException;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Condition;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by WUXB on 2017/10/16.
 */
@Service
@Transactional
public class ValidateRecordServiceImpl extends AbstractService<ValidateRecord, Long> implements ValidateRecordService {

    @Autowired
    private ValidateRecordMapper validateRecordMapper;

    @Autowired
    private SmsRestApi smsRestApi;

    @Override
    public void sendMobileValidateCode(String type, String mobile) {
        String code = RandomUtil.generateString(5);

        Map<String, String> contents = new HashMap<>(1);
        contents.put("name", "您的验证码是：" + code + "，");
        SmsSendResult result = smsRestApi.sendTemplateSms(mobile, contents);
        SmsCode resultSmsCode = SmsCode.contains(result.getResult());
        if (null != resultSmsCode && !resultSmsCode.equals(SmsCode.SEND_SUCCESS)) {
            throw new ServiceException(resultSmsCode);
        }

        saveValidateRecord(type, mobile, code);
    }
    
    @Override
    public void saveValidateRecord(String type, String mobile, String code)
    {
    	 ValidateRecord record = new ValidateRecord();
         record.setBusinessType(type);
         record.setReceiveType("1");
         record.setReceiveObject(mobile);
         record.setValidateCode(code);
         record.setGenerateTime(new Date());
         record.setInvalidTime(DateUtils.addMinute(record.getGenerateTime(), 5));
         save(record);
    }

    @Override
    public boolean validateSmsCode(String type, String mobile, String code) {
       /* Condition condition = new Condition(ValidateRecord.class);
        Condition.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("businessType", type);
        criteria.andEqualTo("receiveObject", mobile);
        criteria.andIsNull("validateTime");
        condition.setOrderByClause(" generate_time DESC ");*/
        Sms  sms  = new Sms();


        sms.setMobile(mobile);
        sms.setType(type);
        List<ValidateRecord> list = validateRecordMapper.findBySms(sms);
     //   List<ValidateRecord> list = findByCondition(condition);
        if (null == list || list.isEmpty()) {
            return false;
        }

        ValidateRecord record = list.get(0);
        boolean isok = DateUtils.belongCalendar(new Date(), record.getGenerateTime(), record.getInvalidTime());
        if (record.getValidateCode().equalsIgnoreCase(code) && isok) {
            record.setValidateTime(new Date());
            record.setModifyTime(new Date());
            update(record);
            return true;
        }

        return false;
    }
}
