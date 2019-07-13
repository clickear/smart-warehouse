package com.deer.wms.report.service.impl;

import com.deer.wms.report.dao.ScanRecordMapper;
import com.deer.wms.report.model.ScanRecord;
import com.deer.wms.report.model.ScanRecordCriteria;
import com.deer.wms.report.service.ScanRecordService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


/**
 * Created by 郭靖勋 on 2018/10/17.
 */
@Service
@Transactional
public class ScanRecordServiceImpl extends AbstractService<ScanRecord, Integer> implements ScanRecordService {

    @Autowired
    private ScanRecordMapper scanRecordMapper;


    @Override
    public List<ScanRecord> findList(ScanRecordCriteria  criteria) {
        return scanRecordMapper.findList(criteria);
    }
}
