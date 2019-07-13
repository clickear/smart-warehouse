package com.deer.wms.system.manage.service;

import com.deer.wms.system.manage.model.InventoryReport;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.InventoryReportCriteria;
import com.deer.wms.system.manage.model.InventoryReportDto;

import java.util.List;

/**
 * Created by  on 2018/08/27.
 */
public interface InventoryReportService extends Service<InventoryReport, Integer> {

    InventoryReport findQianTian(InventoryReportCriteria criteria );
    InventoryReport findShangShangYue(InventoryReportCriteria criteria );

    List<InventoryReportDto> findList(InventoryReportCriteria criteria);

}
