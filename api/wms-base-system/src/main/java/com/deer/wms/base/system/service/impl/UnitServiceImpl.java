package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.UnitMapper;
import com.deer.wms.base.system.model.Unit;
import com.deer.wms.base.system.model.UnitCriteria;
import com.deer.wms.base.system.service.UnitService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/06/29.
 */
@Service
@Transactional
public class UnitServiceImpl extends AbstractService<Unit, Integer> implements UnitService {

    @Autowired
    private UnitMapper unitMapper;

    @Override
    public void deleteByCodeAndCom(UnitCriteria criteria) {
        unitMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<Unit> findList(UnitCriteria criteria) {
        return  unitMapper.findList(criteria);
    }
}
