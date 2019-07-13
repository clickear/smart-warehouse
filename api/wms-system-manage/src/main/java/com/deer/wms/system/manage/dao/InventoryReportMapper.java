package com.deer.wms.system.manage.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.system.manage.model.InventoryReport;
import com.deer.wms.system.manage.model.InventoryReportCriteria;
import com.deer.wms.system.manage.model.InventoryReportDto;

import java.util.List;

public interface InventoryReportMapper extends Mapper<InventoryReport> {

    InventoryReport findQianTian(InventoryReportCriteria  criteria);

    List<InventoryReportDto> findList(InventoryReportCriteria criteria);

    InventoryReport findShangShangYue(InventoryReportCriteria criteria);
}