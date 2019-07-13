package com.deer.wms.ware.task.service.impl;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.ware.task.dao.CountMasterMapper;
import com.deer.wms.ware.task.model.CountMaster;
import com.deer.wms.ware.task.model.CountMasterCriteria;
import com.deer.wms.ware.task.model.CountMasterDto;
import com.deer.wms.ware.task.service.CountMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/20.
 */
@Service
@Transactional
public class CountMasterServiceImpl extends AbstractService<CountMaster, Integer> implements CountMasterService {

    @Autowired
    private CountMasterMapper countMasterMapper;

    @Override
    public List<CountMasterDto> findList(CountMasterCriteria criteria) {
        return countMasterMapper.findList(criteria);
    }

}
