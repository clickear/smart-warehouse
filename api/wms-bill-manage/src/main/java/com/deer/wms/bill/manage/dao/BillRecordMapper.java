package com.deer.wms.bill.manage.dao;

import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillRecord;
import com.deer.wms.bill.manage.model.BillRecordCriteria;
import com.deer.wms.bill.manage.model.BillRecordDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface BillRecordMapper extends Mapper<BillRecord> {

    List<BillRecordDto> findList(BillRecordCriteria criteria);
}