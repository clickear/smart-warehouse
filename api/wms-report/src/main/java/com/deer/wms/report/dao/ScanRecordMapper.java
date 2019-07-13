package com.deer.wms.report.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.report.model.ScanRecord;
import com.deer.wms.report.model.ScanRecordCriteria;

import java.util.List;

public interface ScanRecordMapper extends Mapper<ScanRecord> {

    List<ScanRecord> findList(ScanRecordCriteria criteria);
}