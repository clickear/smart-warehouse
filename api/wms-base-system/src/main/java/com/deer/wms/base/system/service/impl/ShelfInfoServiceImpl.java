package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.ShelfInfoMapper;
import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.ShelfInfoService;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.util.RandomNo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/06/20.
 */
@Service
@Transactional
public class ShelfInfoServiceImpl extends AbstractService<ShelfInfo, Integer> implements ShelfInfoService {

    @Autowired
    private ShelfInfoMapper shelfInfoMapper;

    @Override
    public void deleteByCodeAndCom(ShelfInfoCriteria criteria) {
        shelfInfoMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<ShelfInfoDto> findList(ShelfInfoCriteria criteria) {

        return shelfInfoMapper.findList(criteria);
    }
    @Override
    public void save(ShelfInfo shelfInfo){
        String shelfCode=RandomNo.createTimeString();
        shelfInfo.setShelfCode(shelfCode);
        shelfInfoMapper.insert(shelfInfo);
    }

}
