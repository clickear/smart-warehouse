package com.deer.wms.bill.manage.service.impl;

import com.deer.wms.bill.manage.dao.BillDetailMapper;
import com.deer.wms.bill.manage.model.BillDetail;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillDetailDto;
import com.deer.wms.bill.manage.model.BillMaster;
import com.deer.wms.bill.manage.service.BillDetailService;

import com.deer.wms.bill.manage.service.BillMasterService;
import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.report.model.*;
import com.deer.wms.report.service.AreaItemService;
import com.deer.wms.report.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/07/05.
 */
@Service
@Transactional
public class BillDetailServiceImpl extends AbstractService<BillDetail, String> implements BillDetailService {

    @Autowired
    private BillDetailMapper billDetailMapper;

    @Autowired
    private BillMasterService billMasterService;

    @Autowired
    private InventoryService inventoryService;

    @Override
    public List<BillDetailDto> findList(BillDetailCriteria criteria) {
        return billDetailMapper.findList(criteria);
    }

    @Override
    public void deleteByC(BillDetailCriteria criteria) {
        billDetailMapper.deleteByC(criteria);
    }

    @Override
    public List<BillDetailDto> findYesterday(BillDetailCriteria criteria) {
        return billDetailMapper.findYesterday(criteria);
    }


    @Override
    public List<BillDetailDto> findShangYue(BillDetailCriteria criteria) {
        return billDetailMapper.findShangYue(criteria);
    }

    @Override
    public void updateState(String detailNo) {
        billDetailMapper.updateState(detailNo);
    }


}
