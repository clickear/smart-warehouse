package com.deer.wms.ware.task.service;

import com.deer.wms.ware.task.model.CountTask;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.ware.task.model.CountTaskCriteria;
import com.deer.wms.ware.task.model.CountTaskDto;

import java.util.List;

/**
 * Created by guo on 2018/08/22.
 */
public interface CountTaskService extends Service<CountTask, Integer> {


    List<CountTaskDto> findList(CountTaskCriteria criteria);

}
