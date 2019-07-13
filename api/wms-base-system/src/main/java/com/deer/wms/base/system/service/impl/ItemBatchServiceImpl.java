package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.ItemBatchMapper;
import com.deer.wms.base.system.model.ItemBatch;
import com.deer.wms.base.system.model.ItemBatchCriteria;
import com.deer.wms.base.system.model.ItemBatchDto;
import com.deer.wms.base.system.service.ItemBatchService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/06.
 */
@Service
@Transactional
public class ItemBatchServiceImpl extends AbstractService<ItemBatch, Integer> implements ItemBatchService {

    @Autowired
    private ItemBatchMapper itemBatchMapper;

    @Override
    public List<ItemBatchDto> findList(ItemBatchCriteria criteria) {
        return itemBatchMapper.findList(criteria);
    }
}
