package com.deer.wms.report.service;

import com.deer.wms.report.model.ScanRecord;
import com.deer.wms.report.model.ScanRecordCriteria;

import com.deer.wms.project.seed.core.service.Service;
import java.util.List;


/**
 * Created by 郭靖勋 on 2018/10/17.
 */
public interface ScanRecordService extends Service<ScanRecord, Integer> {


    List<ScanRecord> findList(ScanRecordCriteria  criteria) ;

}
