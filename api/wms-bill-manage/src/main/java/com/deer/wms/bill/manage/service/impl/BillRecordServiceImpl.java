package com.deer.wms.bill.manage.service.impl;

import com.deer.wms.bill.manage.dao.BillRecordMapper;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillRecord;
import com.deer.wms.bill.manage.model.BillRecordCriteria;
import com.deer.wms.bill.manage.model.BillRecordDto;
import com.deer.wms.bill.manage.service.BillRecordService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/13.
 */
@Service
@Transactional
public class BillRecordServiceImpl extends AbstractService<BillRecord, Integer> implements BillRecordService {

    @Autowired
    private BillRecordMapper billRecordMapper;

    @Override
    public List<BillRecordDto> findList(BillRecordCriteria criteria) {
        return billRecordMapper.findList(criteria);
    }
}
