package com.deer.wms.report.service.impl;

import com.deer.wms.base.system.model.AreaInfo;
import com.deer.wms.base.system.model.WareInfo;
import com.deer.wms.base.system.service.AreaInfoService;
import com.deer.wms.base.system.service.WareInfoService;
import com.deer.wms.report.dao.AreaItemMapper;
import com.deer.wms.report.model.AreaItem;
import com.deer.wms.report.model.AreaItemCriteria;
import com.deer.wms.report.model.AreaItemDto;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.service.AreaItemService;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.report.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by 郭靖勋 on 2018/07/10.
 */
@Service
@Transactional
public class AreaItemServiceImpl extends AbstractService<AreaItem, Integer> implements AreaItemService {

    @Autowired
    private AreaItemMapper areaItemMapper;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private WareInfoService wareInfoService;
    @Autowired
    private AreaInfoService areaInfoService;

    @Override
    public List<AreaItemDto> findList(AreaItemCriteria criteria) {
        return areaItemMapper.findList(criteria);
    }

    @Override
    public void accept(AreaItem areaItem,Integer type) {
        AreaInfo areaInfo =areaInfoService.findBy("areaCode",areaItem.getAreaCode());

        //判断表里是否存在此货区和此物料的信息
        AreaItemCriteria criteria = new AreaItemCriteria();
        criteria.setAreaCode(areaItem.getAreaCode());
        criteria.setItemCode(areaItem.getItemCode());
        List<AreaItemDto> areaItemDtos =  findList(criteria);
        Inventory inventory =inventoryService.findBy("itemCode",areaItem.getItemCode());
        if(areaItemDtos.size()!= 0){
            AreaItemDto areaItemDto = areaItemDtos.get(0);
            areaItem.setId(areaItemDto.getId());
            Integer quantity =null;
            Integer quantity2 = null;
            if(type ==1){
                  quantity = areaItem.getQuantity()+areaItemDto.getQuantity();
                  quantity2 = inventory.getQuantity()+areaItem.getQuantity();

            }else  if(type ==2){
                  quantity = areaItem.getQuantity()-areaItemDto.getQuantity();
                  quantity2 = inventory.getQuantity()-areaItem.getQuantity();
            }
            areaItem.setQuantity(quantity);
            inventory.setQuantity(quantity2);
            update(areaItem);
        }else {
            inventory = new Inventory();
            inventory.setQuantity(areaItem.getQuantity());

            inventory.setWareCode(areaInfo.getWareCode());
            inventory.setType(1);
            inventoryService.save(inventory);
            save(areaItem);
        }


    }
}
