package com.deer.wms.ware.task.service.impl;

import com.deer.wms.ware.task.dao.PrepareTaskMapper;
import com.deer.wms.ware.task.model.PrepareTask;
import com.deer.wms.ware.task.model.PrepareTaskCriteria;
import com.deer.wms.ware.task.model.PrepareTaskDto;
import com.deer.wms.ware.task.service.PrepareTaskService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/08/14.
 */
@Service
@Transactional
public class PrepareTaskServiceImpl extends AbstractService<PrepareTask, Integer> implements PrepareTaskService {

    @Autowired
    private PrepareTaskMapper prepareTaskMapper;

    @Override
    public List<PrepareTaskDto> findList(PrepareTaskCriteria criteria) {
        return prepareTaskMapper.findList(criteria);
    }

    @Override
    public List<PrepareTask> findBatchs(PrepareTaskCriteria criteria) {
        return prepareTaskMapper.findBatchs(criteria);
    }
}
