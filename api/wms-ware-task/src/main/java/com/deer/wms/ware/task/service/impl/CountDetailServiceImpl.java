package com.deer.wms.ware.task.service.impl;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.ware.task.dao.CountDetailMapper;
import com.deer.wms.ware.task.model.CountDetail;
import com.deer.wms.ware.task.model.CountDetailCriteria;
import com.deer.wms.ware.task.model.CountDetailDto;
import com.deer.wms.ware.task.service.CountDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/20.
 */
@Service
@Transactional
public class CountDetailServiceImpl extends AbstractService<CountDetail, Integer> implements CountDetailService {

    @Autowired
    private CountDetailMapper countDetailMapper;

    @Override
    public List<CountDetailDto> findList(CountDetailCriteria criteria) {
        return countDetailMapper.findList(criteria);
    }
}
