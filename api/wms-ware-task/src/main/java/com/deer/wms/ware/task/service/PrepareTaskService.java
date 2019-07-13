package com.deer.wms.ware.task.service;

import com.deer.wms.ware.task.model.PrepareTask;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.ware.task.model.PrepareTaskCriteria;
import com.deer.wms.ware.task.model.PrepareTaskDto;

import java.util.List;

/**
 * Created by guo on 2018/08/14.
 */
public interface PrepareTaskService extends Service<PrepareTask, Integer> {

    List<PrepareTaskDto> findList(PrepareTaskCriteria criteria);

    List<PrepareTask> findBatchs(PrepareTaskCriteria criteria);

}
