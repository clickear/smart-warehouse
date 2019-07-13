package com.deer.wms.report.service;

import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.model.InventoryCriteria;
import com.deer.wms.report.model.InventoryDto;

import java.util.List;


/**
 * Created by 郭靖勋 on 2018/06/28.
 */
public interface InventoryService extends Service<Inventory, Integer> {

    List<InventoryDto> findList(InventoryCriteria criteria);

    List<InventoryDto> findBatchList(InventoryCriteria criteria);


    void accept(String itemCode);
}
