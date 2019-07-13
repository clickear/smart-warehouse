package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.ItemMasterMapper;
import com.deer.wms.base.system.model.ItemMaster;
import com.deer.wms.base.system.model.ItemMasterCriteria;
import com.deer.wms.base.system.model.ItemMasterDto;
import com.deer.wms.base.system.service.ItemMasterService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/03.
 */
@Service
@Transactional
public class ItemMasterServiceImpl extends AbstractService<ItemMaster, Integer> implements ItemMasterService {

    @Autowired
    private ItemMasterMapper itemMasterMapper;

    @Override
    public List<ItemMasterDto> findList(ItemMasterCriteria criteria) {
        return itemMasterMapper.findList(criteria);
    }
}
