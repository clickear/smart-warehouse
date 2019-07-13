package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.ItemTypeMapper;
import com.deer.wms.base.system.model.ItemType;
import com.deer.wms.base.system.model.ItemTypeCriteria;
import com.deer.wms.base.system.service.ItemTypeService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/06/28.
 */
@Service
@Transactional
public class ItemTypeServiceImpl extends AbstractService<ItemType, Integer> implements ItemTypeService {

    @Autowired
    private ItemTypeMapper itemTypeMapper;


    @Override
    public void deleteByCodeAndCom(ItemTypeCriteria criteria) {
        itemTypeMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<ItemType> findList(ItemTypeCriteria criteria) {
        return itemTypeMapper.findList(criteria);
    }
}
