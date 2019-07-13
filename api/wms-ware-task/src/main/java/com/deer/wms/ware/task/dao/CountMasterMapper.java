package com.deer.wms.ware.task.dao;


import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.ware.task.model.CountMaster;
import com.deer.wms.ware.task.model.CountMasterCriteria;
import com.deer.wms.ware.task.model.CountMasterDto;

import java.util.List;

public interface CountMasterMapper extends Mapper<CountMaster> {
    List<CountMasterDto> findList(CountMasterCriteria criteria);
}