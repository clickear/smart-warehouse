package com.deer.wms.report.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.model.InventoryCriteria;
import com.deer.wms.report.model.InventoryDto;


import java.util.List;

public interface InventoryMapper extends Mapper<Inventory> {

    List<InventoryDto> findList(InventoryCriteria criteria);

    List<InventoryDto> findBatchList(InventoryCriteria criteria);

}