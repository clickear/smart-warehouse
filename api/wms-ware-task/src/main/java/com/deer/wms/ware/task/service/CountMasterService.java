package com.deer.wms.ware.task.service;

import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.ware.task.model.CountMaster;
import com.deer.wms.ware.task.model.CountMasterCriteria;
import com.deer.wms.ware.task.model.CountMasterDto;

import java.util.List;

/**
 * Created by guo on 2018/08/20.
 */
public interface CountMasterService extends Service<CountMaster, Integer> {
    List<CountMasterDto> findList(CountMasterCriteria criteria);


}
