package com.deer.wms.ware.task.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.ware.task.model.PrepareTask;
import com.deer.wms.ware.task.model.PrepareTaskCriteria;
import com.deer.wms.ware.task.model.PrepareTaskDto;

import java.util.List;

public interface PrepareTaskMapper extends Mapper<PrepareTask> {

    List<PrepareTaskDto> findList(PrepareTaskCriteria criteria);


    List<PrepareTask> findBatchs(PrepareTaskCriteria criteria);
}