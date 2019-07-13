package com.deer.wms.report.service.impl;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.report.dao.InventoryMapper;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.model.InventoryCriteria;
import com.deer.wms.report.model.InventoryDto;
import com.deer.wms.report.service.InventoryService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 郭靖勋 on 2018/06/28.
 */
@Service
@Transactional
public class InventoryServiceImpl extends AbstractService<Inventory, Integer> implements InventoryService {

    @Autowired
    private InventoryMapper inventoryMapper;

    @Override
    public List<InventoryDto> findList(InventoryCriteria criteria) {
        return inventoryMapper.findList(criteria);
    }

    @Override
    public List<InventoryDto> findBatchList(InventoryCriteria criteria) {
        return inventoryMapper.findBatchList(criteria);
    }



    @Override
    public void accept(String itemCode) {
        Inventory inventory = findBy("itemCode",itemCode);
        if(inventory ==null){

        }
    }
}
