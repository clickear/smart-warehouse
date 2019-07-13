package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.ItemInfoMapper;
import com.deer.wms.base.system.model.ItemInfo;
import com.deer.wms.base.system.model.ItemInfoCriteria;
import com.deer.wms.base.system.model.ItemInfoDto;
import com.deer.wms.base.system.service.ItemInfoService;
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
public class ItemInfoServiceImpl extends AbstractService<ItemInfo, Integer> implements ItemInfoService {

    @Autowired
    private ItemInfoMapper itemInfoMapper;

    @Override
    public void deleteByCodeAndCom(ItemInfoCriteria criteria) {
        itemInfoMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<ItemInfoDto> findList(ItemInfoCriteria criteria) {
        return itemInfoMapper.findList(criteria);
    }
}
