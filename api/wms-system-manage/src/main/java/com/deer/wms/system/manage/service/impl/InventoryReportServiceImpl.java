package com.deer.wms.system.manage.service.impl;

import com.deer.wms.system.manage.dao.InventoryReportMapper;
import com.deer.wms.system.manage.model.InventoryReport;
import com.deer.wms.system.manage.model.InventoryReportCriteria;
import com.deer.wms.system.manage.model.InventoryReportDto;
import com.deer.wms.system.manage.service.InventoryReportService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/08/27.
 */
@Service
@Transactional
public class InventoryReportServiceImpl extends AbstractService<InventoryReport, Integer> implements InventoryReportService {

    @Autowired
    private InventoryReportMapper inventoryReportMapper;

    @Override
    public InventoryReport findQianTian(InventoryReportCriteria criteria) {
        return inventoryReportMapper.findQianTian(criteria);
    }

    @Override
    public InventoryReport findShangShangYue(InventoryReportCriteria criteria) {
        return inventoryReportMapper.findShangShangYue(criteria);
    }

    @Override
    public List<InventoryReportDto> findList(InventoryReportCriteria criteria) {
        return inventoryReportMapper.findList(criteria);
    }
}
