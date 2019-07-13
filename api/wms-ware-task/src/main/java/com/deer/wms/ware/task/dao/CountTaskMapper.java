package com.deer.wms.ware.task.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.ware.task.model.CountTask;
import com.deer.wms.ware.task.model.CountTaskCriteria;
import com.deer.wms.ware.task.model.CountTaskDto;

import java.util.List;

public interface CountTaskMapper extends Mapper<CountTask> {

    List<CountTaskDto> findList(CountTaskCriteria criteria);
}