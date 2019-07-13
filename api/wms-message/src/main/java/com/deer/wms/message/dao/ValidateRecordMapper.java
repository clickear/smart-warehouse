package com.deer.wms.message.dao;

import com.deer.wms.message.model.Sms;
import com.deer.wms.message.model.ValidateRecord;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface ValidateRecordMapper extends Mapper<ValidateRecord> {

       List<ValidateRecord> findBySms(Sms sms);
}