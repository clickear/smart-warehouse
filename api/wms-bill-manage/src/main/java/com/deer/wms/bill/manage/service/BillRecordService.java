package com.deer.wms.bill.manage.service;

import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillRecord;
import com.deer.wms.bill.manage.model.BillRecordCriteria;
import com.deer.wms.bill.manage.model.BillRecordDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by guo on 2018/08/13.
 */
public interface BillRecordService extends Service<BillRecord, Integer> {

    List<BillRecordDto> findList(BillRecordCriteria criteria);

}
