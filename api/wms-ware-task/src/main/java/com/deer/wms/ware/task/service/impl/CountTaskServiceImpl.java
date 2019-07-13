package com.deer.wms.ware.task.service.impl;

import com.deer.wms.ware.task.dao.CountTaskMapper;
import com.deer.wms.ware.task.model.CountTask;
import com.deer.wms.ware.task.model.CountTaskCriteria;
import com.deer.wms.ware.task.model.CountTaskDto;
import com.deer.wms.ware.task.service.CountTaskService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/22.
 */
@Service
@Transactional
public class CountTaskServiceImpl extends AbstractService<CountTask, Integer> implements CountTaskService {

    @Autowired
    private CountTaskMapper countTaskMapper;

    @Override
    public List<CountTaskDto> findList(CountTaskCriteria criteria) {
        return countTaskMapper.findList(criteria);
    }
}
